using CLN.model.APIModels;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class ScheduledVirtualAppointmentsService : IScheduledVirtualAppointmentsService
    {
        //09:33:35.1971113

        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
        private readonly IOptions<AppSettings> _settings;
        private readonly ISenderMailProcessService _senderMailProcessService;
        private readonly IVirtualAppointmentsService _virtualAppointmentsService;
        private ScheduledVirtualAppointmentsNotify _sheduledVirtualAppointmentsNotify;

        public ScheduledVirtualAppointmentsService(CLNContext context, ICommonService commonService, IOptions<AppSettings> settings, ISenderMailProcessService senderMailProcessService, IVirtualAppointmentsService virtualAppointmentsService)
        {
            this._context = context;
            this._commonService = commonService;
            this._settings = settings;
            this._senderMailProcessService = senderMailProcessService;
            this._virtualAppointmentsService = virtualAppointmentsService;
            this._sheduledVirtualAppointmentsNotify = new ScheduledVirtualAppointmentsNotify();
        }

        // 1 lista  2 objeto

        public async Task<IResponse> CreateScheduledVirtualAppointments(ScheduledVirtualAppointments x, int idUser)
        {
            var response = new Response<StoreProcedureLiteResponse>(null, null);
            response.Succeeded = false;

            //Validaciones
            if (x.AppointmentDate < DateTime.Now.Date)
            {
                response.Message = "La fecha de la cita no puede ser menor a la fecha actual";
                return response;
            }
            else if (!await ValidarNitAsync(x.NumberId, "Host"))
            {
                response.Message = "El Nit de la empresa anfitriona: " + x.NumberId + " No existe";
                return response;
            }
            else if (!await ValidarNitAsync(x.GuestIdNumber, "Guest"))
            {
                response.Message = "El Nit de la empresa invitada: " + x.GuestIdNumber + " No existe";
                return response;
            }
            else if (x.NumberId == x.GuestIdNumber)
            {
                response.Message = "El Nit de la empresa anfitriona, no puede ser igual al Nit de la empresa invitada";
                return response;
            }

            var hostSchedule = await GetAvailableHoursCompany(x.NumberId);
            var guestSchedule = await GetAvailableHoursCompany(x.GuestIdNumber);

            var createSheduleDefault = false;
            if (hostSchedule.Count == 0)
            {
                createSheduleDefault = await ValidarNitAsync(x.NumberId, "CreateShedule", idUser);
                if (!createSheduleDefault)
                {
                    response.Message = "No se pudo crear el horario por defecto del anfitrion";
                    return response;
                }
                else
                    hostSchedule = await GetAvailableHoursCompany(x.NumberId);
            }
            if (guestSchedule.Count == 0)
            {
                createSheduleDefault = await ValidarNitAsync(x.GuestIdNumber, "CreateShedule", idUser);
                if (!createSheduleDefault)
                {
                    response.Message = "No se pudo crear el horario por defecto del invitado";
                    return response;
                }
                else
                    guestSchedule = await GetAvailableHoursCompany(x.GuestIdNumber);
            }

            var hostScheduleEspecific = await GetAvailableHoursCompanyEspecific(x.NumberId, x.AppointmentDate.Date);
            var guestScheduleEspecific = await GetAvailableHoursCompanyEspecific(x.GuestIdNumber, x.AppointmentDate.Date);


            var validAppoiment = new Dictionary<bool, string>();
            var appoimentDay = Helpers.Helpers.DayOfWeek(x.AppointmentDate.Date);

            if (hostScheduleEspecific.Count > 0)
                hostSchedule = SetEspecificDate(hostSchedule, hostScheduleEspecific[0]);
            if (guestScheduleEspecific.Count > 0)
                guestSchedule = SetEspecificDate(guestSchedule, guestScheduleEspecific[0]);


            validAppoiment = ValidateShedule(x, hostSchedule.Where(s => s.WeekDay == appoimentDay).FirstOrDefault(), guestSchedule.Where(s => s.WeekDay == appoimentDay).FirstOrDefault());
            if (!validAppoiment.Keys.FirstOrDefault())
            {
                response.Message = validAppoiment.Values.FirstOrDefault();
                return response;
            }

            var appoinmentBeforeHost = await GetScheduledVirtualAppointmentsCompanyEspecific(x.NumberId, x.AppointmentDate, x.StartHour, x.EndHour);
            if (appoinmentBeforeHost.Count > 0)
            {
                response.Message = "Anfitrión no disponible, posee una cita programada en el mismo horario";
                return response;
            }

            var appoinmentBeforeGuest = await GetScheduledVirtualAppointmentsCompanyEspecific(x.GuestIdNumber, x.AppointmentDate, x.StartHour, x.EndHour);
            if (appoinmentBeforeGuest.Count > 0)
            {
                response.Message = "Invitado no disponible, posee una cita programada en el mismo horario";
                return response;
            }

            //Fin validaciones

            x.WeekDay = Helpers.Helpers.DayOfWeek(x.AppointmentDate.Date);
            var idEstateProgrammed = 5;
            SqlParameter[] parameterList = new SqlParameter[]
            {
                  new SqlParameter("@id", x.Id),
                  new SqlParameter("@numberId",x.NumberId),
                  new SqlParameter("@guestIdNumber",x.GuestIdNumber),
                  new SqlParameter("@weekDay",x.WeekDay),
                  new SqlParameter("@appointmentReason",x.AppointmentReason),
                  new SqlParameter("@appointmentDate",x.AppointmentDate),
                  new SqlParameter("@startHour",x.StartHour),
                  new SqlParameter("@endHour",x.EndHour),
                  new SqlParameter("@app",x.App),
                  new SqlParameter("@link",x.Link),
                  new SqlParameter("@idState",idEstateProgrammed),
                  new SqlParameter("@idUser",idUser)
            };
            var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateScheduledVirtualAppointments", parameterList, 2);
            var strState = ReturnStrState(idEstateProgrammed);

            if (update.Result == "OK")
            {
                SetSheduledVirtualAppointmentsNotify(appoimentDay, x,strState);
                var sender = await this._senderMailProcessService.SenderAppointnmentsVirtualNotify(this._sheduledVirtualAppointmentsNotify);
                if (!sender)
                {
                    update.Result = "Failed";
                    response = new Response<StoreProcedureLiteResponse>(update, null);
                    response.Succeeded = false;
                    response.Message = "Fallo el envio del email";
                    return response;
                }
            }
            else
            {
                update.Result = "Failed";
                response = new Response<StoreProcedureLiteResponse>(update, null);
                response.Succeeded = false;
                response.Message = "Fallo el crud en db";
                return response;

            }

            return new Response<StoreProcedureLiteResponse>(update, null);
        }

        public async Task<IResponse> UpdateScheduledVirtualAppointments(ScheduledVirtualAppointments x, int idUser)
        {
            var response = new Response<StoreProcedureLiteResponse>(null, null);

            //Validaciones
            if (x.AppointmentDate < DateTime.Now.Date)
            {
                response.Message = "La fecha de la cita no puede ser menor a la fecha actual";
                return response;
            }
            else if (!await ValidarNitAsync(x.NumberId, "Host"))
            {
                response.Message = "El Nit de la empresa anfitriona: " + x.NumberId + " No existe";
                return response;
            }
            else if (!await ValidarNitAsync(x.GuestIdNumber, "Guest"))
            {
                response.Message = "El Nit de la empresa invitada: " + x.GuestIdNumber + " No existe";
                return response;
            }
            else if (x.NumberId == x.GuestIdNumber)
            {
                response.Message = "El Nit de la empresa anfitriona, no puede ser igual al Nit de la empresa invitada";
                return response;
            }

            var hostSchedule = await GetAvailableHoursCompany(x.NumberId);
            var guestSchedule = await GetAvailableHoursCompany(x.GuestIdNumber);

            if (hostSchedule.Count == 0)
            {
                response.Message = "El horario del anfitrion no encontrado";
                return response;
            }
            else if (guestSchedule.Count == 0)
            {
                response.Message = "El horario del invitado no encontrado";
                return response;
            }

            var hostScheduleEspecific = await GetAvailableHoursCompanyEspecific(x.NumberId, x.AppointmentDate.Date);
            var guestScheduleEspecific = await GetAvailableHoursCompanyEspecific(x.GuestIdNumber, x.AppointmentDate.Date);


            var validAppoiment = new Dictionary<bool, string>();
            var appoimentDay = Helpers.Helpers.DayOfWeek(x.AppointmentDate.Date);

            if (hostScheduleEspecific.Count > 0)
                hostSchedule = SetEspecificDate(hostSchedule, hostScheduleEspecific[0]);
            if (guestScheduleEspecific.Count > 0)
                guestSchedule = SetEspecificDate(guestSchedule, guestScheduleEspecific[0]);


            validAppoiment = ValidateShedule(x, hostSchedule.Where(s => s.WeekDay == appoimentDay).FirstOrDefault(), guestSchedule.Where(s => s.WeekDay == appoimentDay).FirstOrDefault());
            if (!validAppoiment.Keys.FirstOrDefault())
            {
                response.Message = validAppoiment.Values.FirstOrDefault();
                return response;
            }

            var appoinmentBeforeHost = await GetScheduledVirtualAppointmentsCompanyEspecific(x.NumberId, x.AppointmentDate, x.StartHour, x.EndHour);
            if (appoinmentBeforeHost.Count > 0)
            {
                var eyeHost = appoinmentBeforeHost.Where(y => y.StartHour == x.StartHour && y.EndHour == x.EndHour && y.Id != x.Id).FirstOrDefault();
                if (eyeHost != null)
                {
                    response.Message = "Anfitrión no disponible, posee una cita programada en el mismo horario";
                    return response;
                }
            }

            var appoinmentBeforeGuest = await GetScheduledVirtualAppointmentsCompanyEspecific(x.GuestIdNumber, x.AppointmentDate, x.StartHour, x.EndHour);
            if (appoinmentBeforeGuest.Count > 0)
            {
                var eyeGuest = appoinmentBeforeHost.Where(y => y.StartHour == x.StartHour && y.EndHour == x.EndHour && y.Id != x.Id).FirstOrDefault();
                if (eyeGuest != null)
                {
                    response.Message = "Invitado no disponible, posee una cita programada en el mismo horario";
                    return response;
                }
            }

            //Fin validaciones

            SqlParameter[] parameterList = new SqlParameter[]
            {
                  new SqlParameter("@id", x.Id),
                  new SqlParameter("@numberId",x.NumberId),
                  new SqlParameter("@guestIdNumber",x.GuestIdNumber),
                  new SqlParameter("@weekDay",appoimentDay),
                  new SqlParameter("@appointmentReason",x.AppointmentReason),
                  new SqlParameter("@appointmentDate",x.AppointmentDate),
                  new SqlParameter("@startHour",x.StartHour),
                  new SqlParameter("@endHour",x.EndHour),
                  new SqlParameter("@app",x.App),
                  new SqlParameter("@link",x.Link),
                  new SqlParameter("@idState",x.IdState),
                  new SqlParameter("@idUser",idUser),
            };
            var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateScheduledVirtualAppointments", parameterList, 2);
            var strState = ReturnStrState(x.IdState);

            if (update.Result == "OK")
            {
                SetSheduledVirtualAppointmentsNotify(appoimentDay, x, strState);
                var sender = await this._senderMailProcessService.SenderAppointnmentsVirtualNotify(this._sheduledVirtualAppointmentsNotify);
                if (!sender)
                {
                    update.Result = "Failed";
                    response = new Response<StoreProcedureLiteResponse>(update, null);
                    response.Succeeded = false;
                    response.Message = "Fallo el envio del email";
                    return response;
                }
            }
            else
            {
                update.Result = "Failed";
                response = new Response<StoreProcedureLiteResponse>(update, null);
                response.Succeeded = false;
                response.Message = "Fallo el crud en db";
                return response;

            }

            return new Response<StoreProcedureLiteResponse>(update, null);
        }

        public async Task<IResponse> UpdateSheduledVirtualAppointmentsManagement(ScheduledVirtualAppointments x, int idUser)
        {
            var response = new Response<StoreProcedureLiteResponse>(null, null);

            //Validaciones
            if (!await ValidarNitAsync(x.NumberId, "Host"))
            {
                response.Message = "El Nit de la empresa anfitriona: " + x.NumberId + " No existe";
                return response;
            }
            else if (!await ValidarNitAsync(x.GuestIdNumber, "Guest"))
            {
                response.Message = "El Nit de la empresa invitada: " + x.GuestIdNumber + " No existe";
                return response;
            }
            else if (x.NumberId == x.GuestIdNumber)
            {
                response.Message = "El Nit de la empresa anfitriona, no puede ser igual al Nit de la empresa invitada";
                return response;
            }

            //Fin validaciones
            var reason = x.IdState == 9 || x.IdState == 10 ? x.ReasonState : "No se usa en el sp";
            
            SqlParameter[] parameterList = new SqlParameter[]
            {
                  new SqlParameter("@id", x.Id),
                  new SqlParameter("@idState",x.IdState),
                  new SqlParameter("@idUser",idUser),
                  new SqlParameter("@type",x.Type),
                  new SqlParameter ("@reason", reason)
            };

            var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateScheduledVirtualAppointmentsManagement", parameterList, 2);
            var strState = ReturnStrState(x.IdState);
            if (update.Result == "OK")
            {
                SetSheduledVirtualAppointmentsNotify(string.Empty, x, strState);
                var sender = await this._senderMailProcessService.SenderAppointnmentsVirtualNotify(this._sheduledVirtualAppointmentsNotify);
                if (!sender)
                {
                    update.Result = "Failed";
                    response = new Response<StoreProcedureLiteResponse>(update, null);
                    response.Succeeded = false;
                    response.Message = "Fallo el envio del email";
                    return response;
                }
            }
            else
            {
                update.Result = "Failed";
                response = new Response<StoreProcedureLiteResponse>(update, null);
                response.Succeeded = false;
                response.Message = "Fallo el crud en db";
                return response;

            }

            return new Response<StoreProcedureLiteResponse>(update, null);
        }

        public async Task<IResponse> UpdateSheduledVirtualAppointmentsManagementTime(ScheduledVirtualAppointments x, int idUser)
        {
            var response = new Response<StoreProcedureLiteResponse>(null, null);

            //Validaciones
            if (x.AppointmentDate < DateTime.Now.Date)
            {
                response.Message = "La fecha de la cita no puede ser menor a la fecha actual";
                return response;
            }
            else if (!await ValidarNitAsync(x.NumberId, "Host"))
            {
                response.Message = "El Nit de la empresa anfitriona: " + x.NumberId + " No existe";
                return response;
            }
            else if (!await ValidarNitAsync(x.GuestIdNumber, "Guest"))
            {
                response.Message = "El Nit de la empresa invitada: " + x.GuestIdNumber + " No existe";
                return response;
            }
            else if (x.NumberId == x.GuestIdNumber)
            {
                response.Message = "El Nit de la empresa anfitriona, no puede ser igual al Nit de la empresa invitada";
                return response;
            }

            var hostSchedule = await GetAvailableHoursCompany(x.NumberId);
            var guestSchedule = await GetAvailableHoursCompany(x.GuestIdNumber);

            if (hostSchedule.Count == 0)
            {
                response.Message = "El horario del anfitrion no encontrado";
                return response;
            }
            else if (guestSchedule.Count == 0)
            {
                response.Message = "El horario del invitado no encontrado";
                return response;
            }

            var hostScheduleEspecific = await GetAvailableHoursCompanyEspecific(x.NumberId, x.AppointmentDate.Date);
            var guestScheduleEspecific = await GetAvailableHoursCompanyEspecific(x.GuestIdNumber, x.AppointmentDate.Date);


            var validAppoiment = new Dictionary<bool, string>();
            var appoimentDay = Helpers.Helpers.DayOfWeek(x.AppointmentDate.Date);

            if (hostScheduleEspecific.Count > 0)
                hostSchedule = SetEspecificDate(hostSchedule, hostScheduleEspecific[0]);
            if (guestScheduleEspecific.Count > 0)
                guestSchedule = SetEspecificDate(guestSchedule, guestScheduleEspecific[0]);


            validAppoiment = ValidateShedule(x, hostSchedule.Where(s => s.WeekDay == appoimentDay).FirstOrDefault(), guestSchedule.Where(s => s.WeekDay == appoimentDay).FirstOrDefault());
            if (!validAppoiment.Keys.FirstOrDefault())
            {
                response.Message = validAppoiment.Values.FirstOrDefault();
                return response;
            }

            var appoinmentBeforeHost = await GetScheduledVirtualAppointmentsCompanyEspecific(x.NumberId, x.AppointmentDate, x.StartHour, x.EndHour);
            if (appoinmentBeforeHost.Count > 0)
            {
                var eyeHost = appoinmentBeforeHost.Where(y => y.StartHour == x.StartHour && y.EndHour == x.EndHour && y.Id != x.Id).FirstOrDefault();
                if (eyeHost != null)
                {
                    response.Message = "Anfitrión no disponible, posee una cita programada en el mismo horario";
                    return response;
                }
            }

            var appoinmentBeforeGuest = await GetScheduledVirtualAppointmentsCompanyEspecific(x.GuestIdNumber, x.AppointmentDate, x.StartHour, x.EndHour);
            if (appoinmentBeforeGuest.Count > 0)
            {
                var eyeGuest = appoinmentBeforeHost.Where(y => y.StartHour == x.StartHour && y.EndHour == x.EndHour && y.Id != x.Id).FirstOrDefault();
                if (eyeGuest != null)
                {
                    response.Message = "Invitado no disponible, posee una cita programada en el mismo horario";
                    return response;
                }
            }

            //Fin validaciones
            SqlParameter[] parameterList = new SqlParameter[]
            {
                  new SqlParameter("@id", x.Id),
                  new SqlParameter("@weekDay",appoimentDay ),
                  new SqlParameter("@appointmentDate",x.AppointmentDate),
                  new SqlParameter("@startHour",x.StartHour),
                  new SqlParameter("@endHour",x.EndHour),
                  new SqlParameter("@idUser",idUser),
                  new SqlParameter("@type",x.Type)
            };

            var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateScheduledVirtualAppointmentsManagementTime", parameterList, 2);
            var strState = ReturnStrState(x.IdState);

            /* if (update.Result == "OK")
             {
                 SetSheduledVirtualAppointmentsNotify(appoimentDay, x, strState);
                 var sender = await this._senderMailProcessService.SenderAppointnmentsVirtualNotify(this._sheduledVirtualAppointmentsNotify);
                 if (!sender)
                     update.Result = "Failed";
             }*/

            if (update.Result == "OK")
            {
                SetSheduledVirtualAppointmentsNotify(appoimentDay, x, strState);
                var sender = await this._senderMailProcessService.SenderAppointnmentsVirtualNotify(this._sheduledVirtualAppointmentsNotify);
                if (!sender)
                {
                    update.Result = "Failed";
                    response = new Response<StoreProcedureLiteResponse>(update, null);
                    response.Succeeded = false;
                    response.Message = "Fallo el envio del email";
                    return response;
                }
            }
            else
            {
                update.Result = "Failed";
                response = new Response<StoreProcedureLiteResponse>(update, null);
                response.Succeeded = false;
                response.Message = "Fallo el crud en db";
                return response;

            }

            return new Response<StoreProcedureLiteResponse>(update, null);
        }

        public async Task<IResponse> UpdateScheduledVirtualAppointmentsDone()
        {
            DateTime dateStartProcess = DateTime.Now;
            DateTime dateEndProcess = new DateTime();
            var strResponse = string.Empty;
            var response = new Response<StoreProcedureLiteResponse>(null, null);

            var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateScheduledVirtualAppointmentsDone", null, 2);

            ProcessResult processResult = new();
            if (update.Result == "OK")
            {
                response = new Response<StoreProcedureLiteResponse>(update, null);
                response.Succeeded = true;
                response.Message = "Exito";

                processResult.ServiceUrl = "/api/SheduledVirtualAppointments/UpdateScheduledVirtualAppointmentsDone";
                processResult.Result = "Exitoso";
                dateEndProcess = DateTime.Now;

                await _commonService.SetProcessLog(1, "Actualizar citas de negocios a estado realizado", dateStartProcess, dateEndProcess, response.Succeeded, processResult, 1);
            }
            else
            {
                response = new Response<StoreProcedureLiteResponse>(update, null);
                response.Succeeded = false;
                response.Message = "Fallo el crud en db";

                processResult.ServiceUrl = "/api/SheduledVirtualAppointments/UpdateScheduledVirtualAppointmentsDone";
                processResult.Result = "Fallo";
                dateEndProcess = DateTime.Now;

                await _commonService.SetProcessLog(1, "Actualizar citas de negocios a estado realizado", dateStartProcess, dateEndProcess, response.Succeeded, processResult, 1);
            }

            return response;
        }

        public async Task<IResponse> GetScheduledVirtualAppointmentsCompany(string nit, string type)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
              new SqlParameter("@numberId", nit),
              new SqlParameter("@type", type.ToUpper()),
            };

            var model = (List<ScheduledVirtualAppointments>)await _commonService.ExcuteSqlStoredProcedure<ScheduledVirtualAppointments>("GetScheduledVirtualAppointmentsCompany", parameterList, 1);

            foreach (var item in model)
            {
                nit = type == "Host" ? model.Select(x => x.GuestIdNumber).FirstOrDefault() : model.Select(x => x.NumberId).FirstOrDefault();
                parameterList = new SqlParameter[]
                {
                  new SqlParameter("@numberId", nit),
                };

                var modelComplement = (CompanyProfileSimple)await _commonService.ExcuteSqlStoredProcedure<CompanyProfileSimple>("GetCompanyProfile", parameterList, 2);

                SetDataCompanyHostOrGuest(item, modelComplement, type);
            }

            return new Response<List<ScheduledVirtualAppointments>>(model, null);
        }

        public async Task<IResponse> GetScheduledVirtualAppointmentsCompanyEspecificId(int id)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
              new SqlParameter("@id", id)
            };

            var model = (ScheduledVirtualAppointments)await _commonService.ExcuteSqlStoredProcedure<ScheduledVirtualAppointments>("GetScheduledVirtualAppointmentsCompanyEspecificId", parameterList, 2);

         /* parameterList = new SqlParameter[]
            {
              new SqlParameter("@numberId", model.NumberId)
            };
            var modelHost = (CompanyProfileSimple)await _commonService.ExcuteSqlStoredProcedure<CompanyProfileSimple>("GetCompanyProfile", parameterList, 2);
           
            parameterList = new SqlParameter[]
            {
              new SqlParameter("@numberId", model.GuestIdNumber)
            };
            var modelGuest = (CompanyProfileSimple)await _commonService.ExcuteSqlStoredProcedure<CompanyProfileSimple>("GetCompanyProfile", parameterList, 2);

            model.EmailHost = modelHost.Email;
            model.CompanyNameHost = modelHost.CompanyName;
            model.PhoneNumberHost = modelHost.PhoneNumber;
            model.EmailGuest = modelGuest.Email;
            model.CompanyNameGuest = modelGuest.CompanyName;
            model.PhoneNumberGuest = modelGuest.PhoneNumber;*/

            return new Response<ScheduledVirtualAppointments>(model, null);
        }

        public async Task<IResponse> GetReasonVirtualAppointments()
        {
            var model = (List<DomainTypeDto>)await _commonService.ExcuteSqlStoredProcedure<DomainTypeDto>("GetReasonVirtualAppointments", null, 1);

            return new Response<List<DomainTypeDto>>(model, null);
        }

        public async Task<IResponse> GetReasonVirtualAppointmentsCancel()
        {
            var model = (List<DomainTypeDto>)await _commonService.ExcuteSqlStoredProcedure<DomainTypeDto>("GetReasonVirtualAppointmentsCancel", null, 1);

            return new Response<List<DomainTypeDto>>(model, null);
        }

        public async Task<IResponse> GetReasonVirtualAppointmentsRejection()
        {
            var model = (List<DomainTypeDto>)await _commonService.ExcuteSqlStoredProcedure<DomainTypeDto>("GetReasonVirtualAppointmentsRejection", null, 1);

            return new Response<List<DomainTypeDto>>(model, null);
        }

        public async Task<IResponse> GetApplicationVirtualAppointments()
        {
            var model = (List<DomainTypeDto>)await _commonService.ExcuteSqlStoredProcedure<DomainTypeDto>("GetApplicationVirtualAppointments", null, 1);

            return new Response<List<DomainTypeDto>>(model, null);
        }


        #region PRIVATE

        private void SetSheduledVirtualAppointmentsNotify(string appoimentDay, ScheduledVirtualAppointments x, string typeState)
        {
            this._sheduledVirtualAppointmentsNotify.WeekDay = appoimentDay;
            this._sheduledVirtualAppointmentsNotify.StartHour = x.StartHour;
            this._sheduledVirtualAppointmentsNotify.EndHour = x.EndHour;
            this._sheduledVirtualAppointmentsNotify.AppointmentDate = x.AppointmentDate;
            this._sheduledVirtualAppointmentsNotify.Reason = x.AppointmentReason;
            this._sheduledVirtualAppointmentsNotify.Link = x.Link;
            this._sheduledVirtualAppointmentsNotify.TypeState = typeState;
            this._sheduledVirtualAppointmentsNotify.Type = x.Type;
            this._sheduledVirtualAppointmentsNotify.ReasonState = x.ReasonState;
        }

        private string ReturnStrState(int idState)
        {
            var strState = string.Empty;

            switch(idState)
            {
                case (5):
                    strState = "Programado";
                    break;
                case (6):
                    strState = "Confirmado";
                    break;
                case (7):
                    strState = "Reprogramado por Anfitrion";
                    break;
                case (8):
                    strState = "Reprogramado por Invitado";
                    break;
                case (9):
                    strState = "Cancelado";
                    break;
                case (10):
                    strState = "Rechazado";
                    break;
                case (11):
                    strState = "Realizado";
                    break;
            }

            return strState;
        }

        private async Task<List<AvailableHoursCompany>> GetAvailableHoursCompany(string nit)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@numberId", nit)
            };

            return (List<AvailableHoursCompany>)await this._commonService.ExcuteSqlStoredProcedure<AvailableHoursCompany>("GetAvailableHoursCompany", parameterList, 1);
        }

        private async Task<List<AvailableHoursCompany>> GetAvailableHoursCompanyEspecific(string nit, DateTime especificDate)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
              new SqlParameter("@numberId", nit),
              new SqlParameter("@especificDate", especificDate),
            };

            return (List<AvailableHoursCompany>)await _commonService.ExcuteSqlStoredProcedure<AvailableHoursCompany>("GetAvailableHoursCompanyEspecific", parameterList, 1);
        }

        private async Task<List<ScheduledVirtualAppointments>> GetScheduledVirtualAppointmentsCompanyEspecific(string nit, DateTime appointmentDate, TimeSpan startHour, TimeSpan endHour)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
              new SqlParameter("@numberId", nit),
              new SqlParameter("@appointmentDate", appointmentDate),
              new SqlParameter("@startHour", startHour),
              new SqlParameter("@endHour", endHour),
            };

            var model = (List<ScheduledVirtualAppointments>)await _commonService.ExcuteSqlStoredProcedure<ScheduledVirtualAppointments>("GetScheduledVirtualAppointmentsCompanyEspecific", parameterList, 1);

            return model;
        }

        private async Task<bool> ValidarNitAsync(string nit, string tipo, int idUser = 0)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                 new SqlParameter("@numberId",nit)
            };

            var companyProfile = (List<CompanyProfileSimple>)await this._commonService.ExcuteSqlStoredProcedure<CompanyProfileSimple>("GetEspecificCompany", parameterList, 1);

            if (companyProfile.Count > 0)
            {
                if (tipo == "Host")
                {
                    this._sheduledVirtualAppointmentsNotify.Host = companyProfile.Select(x => x.CompanyName).FirstOrDefault();
                    this._sheduledVirtualAppointmentsNotify.EmailHost = companyProfile.Select(x => x.Email).FirstOrDefault();
                    this._sheduledVirtualAppointmentsNotify.NumberIdHost = companyProfile.Select(x => x.CompanyId).FirstOrDefault().ToString();
                    this._sheduledVirtualAppointmentsNotify.IndustriesHost = JsonConvert.DeserializeObject<List<IndustryDto>>(companyProfile.Select(x => x.IndustryMainSector).FirstOrDefault());

                }
                else if (tipo == "Guest")
                {
                    this._sheduledVirtualAppointmentsNotify.Guest = companyProfile.Select(x => x.CompanyName).FirstOrDefault();
                    this._sheduledVirtualAppointmentsNotify.EmailGuest = companyProfile.Select(x => x.Email).FirstOrDefault();
                    this._sheduledVirtualAppointmentsNotify.NumberIdGuest = companyProfile.Select(x => x.CompanyId).FirstOrDefault().ToString();
                    this._sheduledVirtualAppointmentsNotify.IndustriesGuest = JsonConvert.DeserializeObject<List<IndustryDto>>(companyProfile.Select(x => x.IndustryMainSector).FirstOrDefault());

                }
                else if (tipo == "CreateShedule")
                {
                    if (companyProfile.Count > 0)
                    {
                        var model = this._virtualAppointmentsService.SetAvailableHoursCompanyDto(companyProfile);
                        var itemsJson = JsonConvert.SerializeObject(model);

                        parameterList = new SqlParameter[]
                        {
                          new SqlParameter("@itemsJson", itemsJson),
                          new SqlParameter("@idUser",idUser)
                        };

                        var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateAvailableHoursCompany", parameterList, 2);
                        if (update.Result != "OK")
                            return false;
                    }

                }
                return true;
            }
            else
                return false;
        }

        private List<AvailableHoursCompany> SetEspecificDate(List<AvailableHoursCompany> bydefault, AvailableHoursCompany especific)
        {
            var day = bydefault.Where(x => x.WeekDay == especific.WeekDay).FirstOrDefault();
            if (day != null)
            {
                day.WeekDay = especific.WeekDay;
                day.S_05_06 = especific.S_05_06;
                day.V_05_06 = especific.V_05_06;
                day.S_06_07 = especific.S_06_07;
                day.V_06_07 = especific.V_06_07;
                day.S_07_08 = especific.S_07_08;
                day.V_07_08 = especific.V_07_08;
                day.S_08_09 = especific.S_08_09;
                day.V_08_09 = especific.V_08_09;
                day.S_09_10 = especific.S_09_10;
                day.V_09_10 = especific.V_09_10;
                day.S_10_11 = especific.S_10_11;
                day.V_10_11 = especific.V_10_11;
                day.S_11_12 = especific.S_11_12;
                day.V_11_12 = especific.V_11_12;
                day.S_12_13 = especific.S_12_13;
                day.V_12_13 = especific.V_12_13;
                day.S_13_14 = especific.S_13_14;
                day.V_13_14 = especific.V_13_14;
                day.S_14_15 = especific.S_14_15;
                day.V_14_15 = especific.V_14_15;
                day.S_15_16 = especific.S_15_16;
                day.V_15_16 = especific.V_15_16;
                day.S_16_17 = especific.S_16_17;
                day.V_16_17 = especific.V_16_17;
                day.S_17_18 = especific.S_17_18;
                day.V_17_18 = especific.V_17_18;
                day.S_18_19 = especific.S_18_19;
                day.V_18_19 = especific.V_18_19;
                day.S_19_20 = especific.S_19_20;
                day.V_19_20 = especific.V_19_20;
                var index = bydefault.FindIndex(x => x.WeekDay == especific.WeekDay);
                bydefault[index] = day;
            }


            return bydefault;
        }

        private Dictionary<bool, string> ValidateShedule(ScheduledVirtualAppointments x, AvailableHoursCompany host, AvailableHoursCompany guest)
        {
            var response = new Dictionary<bool, string>();

            DateTime date1 = new DateTime(x.AppointmentDate.Year, x.AppointmentDate.Month, x.AppointmentDate.Day, x.StartHour.Hours, x.StartHour.Minutes, 00);
            DateTime date2 = new DateTime(x.AppointmentDate.Year, x.AppointmentDate.Month, x.AppointmentDate.Day, x.EndHour.Hours, x.EndHour.Minutes, 00);
            var tm = (date2 - date1).TotalMinutes;
            if (tm > 60)
            {
                response.Add(false, "Las citas no pueden exceder 1 hora");
                return response;
            }

            var result = false;

            result = ValidateShedule(host, x.StartHour, x.EndHour);
            if (!result)
            {
                response.Add(false, "El anfitrion no posee disponibilidad en el horario indicado");
                return response;
            }

            result = ValidateShedule(guest, x.StartHour, x.EndHour);
            if (!result)
            {
                response.Add(false, "El invitado no posee disponibilidad en el horario indicado");
                return response;
            }


            response.Add(true, "Exito");
            return response;
        }

        private bool ValidateShedule(AvailableHoursCompany a, TimeSpan start, TimeSpan end)
        {
            var result = new bool();
            var result2 = new bool();
            TimeSpan m = TimeSpan.Parse("00:01");
            end = end.Subtract(m);

            if (start >= TimeSpan.Parse("05:00") && start <= TimeSpan.Parse("05:59"))
                result = a.S_05_06;
            else if (start >= TimeSpan.Parse("06:00") && start <= TimeSpan.Parse("06:59"))
                result = a.S_06_07;
            else if (start >= TimeSpan.Parse("07:00") && start <= TimeSpan.Parse("07:59"))
                result = a.S_07_08;
            else if (start >= TimeSpan.Parse("08:00") && start <= TimeSpan.Parse("08:59"))
                result = a.S_08_09;
            else if (start >= TimeSpan.Parse("09:00") && start <= TimeSpan.Parse("09:59"))
                result = a.S_09_10;
            else if (start >= TimeSpan.Parse("10:00") && start <= TimeSpan.Parse("10:59"))
                result = a.S_10_11;
            else if (start >= TimeSpan.Parse("11:00") && start <= TimeSpan.Parse("11:59"))
                result = a.S_11_12;
            else if (start >= TimeSpan.Parse("12:00") && start <= TimeSpan.Parse("12:59"))
                result = a.S_12_13;
            else if (start >= TimeSpan.Parse("13:00") && start <= TimeSpan.Parse("13:59"))
                result = a.S_13_14;
            else if (start >= TimeSpan.Parse("14:00") && start <= TimeSpan.Parse("14:59"))
                result = a.S_14_15;
            else if (start >= TimeSpan.Parse("15:00") && start <= TimeSpan.Parse("15:59"))
                result = a.S_15_16;
            else if (start >= TimeSpan.Parse("16:00") && start <= TimeSpan.Parse("16:59"))
                result = a.S_16_17;
            else if (start >= TimeSpan.Parse("17:00") && start <= TimeSpan.Parse("17:59"))
                result = a.S_17_18;
            else if (start >= TimeSpan.Parse("18:00") && start <= TimeSpan.Parse("18:59"))
                result = a.S_18_19;
            else if (start >= TimeSpan.Parse("19:00") && start <= TimeSpan.Parse("20:00"))
                result = a.S_19_20;
            else
                result = false;



            if (end >= TimeSpan.Parse("05:00") && end <= TimeSpan.Parse("05:59"))
                result2 = a.S_05_06;
            else if (end >= TimeSpan.Parse("06:00") && end <= TimeSpan.Parse("06:59"))
                result2 = a.S_06_07;
            else if (end >= TimeSpan.Parse("07:00") && end <= TimeSpan.Parse("07:59"))
                result2 = a.S_07_08;
            else if (end >= TimeSpan.Parse("08:00") && end <= TimeSpan.Parse("08:59"))
                result2 = a.S_08_09;
            else if (end >= TimeSpan.Parse("09:00") && end <= TimeSpan.Parse("09:59"))
                result2 = a.S_09_10;
            else if (end >= TimeSpan.Parse("10:00") && end <= TimeSpan.Parse("10:59"))
                result2 = a.S_10_11;
            else if (end >= TimeSpan.Parse("11:00") && end <= TimeSpan.Parse("11:59"))
                result2 = a.S_11_12;
            else if (end >= TimeSpan.Parse("12:00") && end <= TimeSpan.Parse("12:59"))
                result2 = a.S_12_13;
            else if (end >= TimeSpan.Parse("13:00") && end <= TimeSpan.Parse("13:59"))
                result2 = a.S_13_14;
            else if (end >= TimeSpan.Parse("14:00") && end <= TimeSpan.Parse("14:59"))
                result2 = a.S_14_15;
            else if (end >= TimeSpan.Parse("15:00") && end <= TimeSpan.Parse("15:59"))
                result2 = a.S_15_16;
            else if (end >= TimeSpan.Parse("16:00") && end <= TimeSpan.Parse("16:59"))
                result2 = a.S_16_17;
            else if (end >= TimeSpan.Parse("17:00") && end <= TimeSpan.Parse("17:59"))
                result2 = a.S_17_18;
            else if (end >= TimeSpan.Parse("18:00") && end <= TimeSpan.Parse("18:59"))
                result2 = a.S_18_19;
            else if (end >= TimeSpan.Parse("19:00") && end <= TimeSpan.Parse("20:00"))
                result2 = a.S_19_20;
            else
                result2 = false;

            return result && result2 ? true : false;
        }

        private ScheduledVirtualAppointments SetDataCompanyHostOrGuest(ScheduledVirtualAppointments x, CompanyProfileSimple y, string type)
        {
            if (type == "Host")
            {
                x.CompanyNameGuest = y.CompanyName;
                x.EmailGuest = y.Email;
                x.PhoneNumberGuest = y.PhoneNumber;
            }
            else if (type == "Guest")
            {
                x.CompanyNameHost = y.CompanyName;
                x.EmailHost = y.Email;
                x.PhoneNumberHost = y.PhoneNumber;
            }

            return x;
        }


        #endregion
    }
}

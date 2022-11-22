using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Linq;

namespace CLN.services.Services
{
    public class VirtualAppointmentsService: IVirtualAppointmentsService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
    
        public VirtualAppointmentsService(CLNContext context, ICommonService commonService)
        {
            this._context = context;
            this._commonService = commonService;
        }

        // 1 lista  2 objeto
        public async Task<IResponse> GetAvailableHoursCompany(string nit, int idUser)
        {
            SqlParameter[] parameterList;

            var result = await GetAvailableHoursCompanyInternal(nit);

            var model = new AvailableHoursCompanyDto();
            if (result.Count == 0)
            {
                parameterList = new SqlParameter[]
                {
                 new SqlParameter("@numberId", nit)
                };

                var companyProfile = (List<CompanyProfileSimple>)await this._commonService.ExcuteSqlStoredProcedure<CompanyProfileSimple>("GetEspecificCompany", parameterList, 1);
                if (companyProfile.Count > 0)
                {
                    model = SetAvailableHoursCompanyDto(companyProfile);
                    var itemsJson = JsonConvert.SerializeObject(model);

                    parameterList = new SqlParameter[]
                    {
                      new SqlParameter("@itemsJson", itemsJson),
                      new SqlParameter("@idUser",idUser)
                    };

                    var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateAvailableHoursCompany", parameterList, 2);
                    if (update.Result == "OK")
                    {
                        result = await GetAvailableHoursCompanyInternal(nit);
                        //model = SetAvailableHoursCompanyDto(result);
                    }
                    else
                    {
                        model = null;
                        var response = new Response<StoreProcedureLiteResponse>(update, null);
                        return response;
                    }
                }
                else
                {
                    model = null;
                    var response = new Response<AvailableHoursCompanyDto>(model, null);
                    response.Succeeded = false;
                    response.Message = "El Nit de la empresa: " + nit + " No existe";
                    return response;
                }

            }


            model = SetAvailableHoursCompanyDto(result);

            return new Response<AvailableHoursCompanyDto>(model, null);
        }

        public async Task<IResponse> UpdateAvailableHoursCompany(AvailableHoursCompanyDto model,int idUser)
        {
            var itemsJson = JsonConvert.SerializeObject(model);
            SqlParameter[] parameterList = new SqlParameter[]
            {
                  new SqlParameter("@itemsJson", itemsJson),
                  new SqlParameter("@idUser",idUser)
            };

            var update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateAvailableHoursCompany", parameterList, 2);


            return new Response<StoreProcedureLiteResponse>(update, null);
        }

        public async Task<IResponse> UpdateAvailableHoursCompanyEspecific(AvailableHoursCompanyEspecificDto model, int idUser)
        {
             model.EspecificDate = model.EspecificDate.Date;
             var maxDate = DateTime.Now.Date.AddDays(91);
             if(model.EspecificDate > maxDate)
             {
                model = null;
                var response = new Response<AvailableHoursCompanyEspecificDto>(model, null);
                response.Succeeded = false;
                response.Message = "La fecha de inclusión/exclusión no puede exceder 90 días";
                return response;
             }

             var update = new StoreProcedureLiteResponse();
             var nit = model.NumberId;
             SqlParameter[] parameterList = new SqlParameter[]
             {
                 new SqlParameter("@numberId", nit)
             };

            var companyProfile = (List<CompanyProfileSimple>)await this._commonService.ExcuteSqlStoredProcedure<CompanyProfileSimple>("GetEspecificCompany", parameterList, 1);
            if (companyProfile.Count > 0)
            {
                model.Status = 1;
                model.EspecificDay.WeekDay = Helpers.Helpers.DayOfWeek(model.EspecificDate);
                var itemsJson = JsonConvert.SerializeObject(model);
                parameterList = new SqlParameter[]
                {
                  new SqlParameter("@itemsJson", itemsJson),
                  new SqlParameter("@idUser",idUser)
                };

               update = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateAvailableHoursCompanyEspecific", parameterList, 2);
            }
            else
            {
                model = null;
                var response = new Response<AvailableHoursCompanyEspecificDto>(model, null);
                response.Succeeded = false;
                response.Message = "El Nit de la empresa: " + nit + " No existe";
                return response;
            }
            
            return new Response<StoreProcedureLiteResponse>(update, null);
        }

        public async Task<IResponse> GetAvailableHoursCompanyEspecificBetweenDate(string nit, DateTime startDate , DateTime endDate)
        {
            var model = new AvailableHoursCompanyDto();
            SqlParameter[]  parameterList = new SqlParameter[]
            {
                 new SqlParameter("@numberId", nit)
            };

            var companyProfile = (List<CompanyProfileSimple>)await this._commonService.ExcuteSqlStoredProcedure<CompanyProfileSimple>("GetEspecificCompany", parameterList, 1);
            if (companyProfile.Count == 0)
            {
                model = null;
                var response = new Response<AvailableHoursCompanyDto>(model, null);
                response.Succeeded = false;
                response.Message = "El Nit de la empresa: " + nit + " No existe";
                return response;
            }

            var result = await GetAvailableHoursCompanyInternal(nit);
            if (result.Count == 0)
            {
                model = null;
                var response = new Response<AvailableHoursCompanyDto>(model, null);
                response.Succeeded = false;
                response.Message = "Para crear horario por defecto: api/VirtualAppointments/GetAvailableHoursCompany/" + nit;
                return response;
            }

            var especific = await GetAvailableHoursCompanyEspecific(nit, startDate,endDate);
            if (especific.Count > 0)
                result = SetEspecificDate(result, especific);

            model = SetAvailableHoursCompanyDto(result);

            return new Response<AvailableHoursCompanyDto>(model, null);
        }



        #region PRIVATE

        private async Task<List<AvailableHoursCompany>> GetAvailableHoursCompanyInternal(string nit)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@numberId", nit)
            };

            return (List<AvailableHoursCompany>)await this._commonService.ExcuteSqlStoredProcedure<AvailableHoursCompany>("GetAvailableHoursCompany", parameterList, 1);
        }

        private AvailableHoursCompanyDto SetAvailableHoursCompanyDto(List<AvailableHoursCompany> lst)
        {
            var model = new AvailableHoursCompanyDto();
            model.Id = lst.Select(x => x.Id).FirstOrDefault();
            model.CompanyName = lst.Select(x => x.CompanyName).FirstOrDefault();
            model.NumberId = lst.Select(x => x.NumberId).FirstOrDefault();
            model.Email = lst.Select(x => x.Email).FirstOrDefault();
            model.Phonenumber = lst.Select(x => x.Phonenumber).FirstOrDefault();
            model.IndustryMainSector = JsonConvert.DeserializeObject<List<Dictionary<string,string>>>(lst.Select(x => x.IndustryMainSector).FirstOrDefault());
            model.Status = lst.Select(x => x.Status).FirstOrDefault();
            model.DateCreate = lst.Select(x => x.DateCreate).FirstOrDefault();
            model.IdUserCreate = lst.Select(x => x.IdUserCreate).FirstOrDefault();
            model.DateUpdate = lst.Select(x => x.DateUpdate).FirstOrDefault();
            model.IdUserUpdate = lst.Select(x => x.IdUserUpdate).FirstOrDefault();

            model.Monday = new AvailableHoursCompanyDetail();
            model.Monday = SetDefaultShedule(lst, model, "Lunes");

            model.Tuesday = new AvailableHoursCompanyDetail();
            model.Tuesday = SetDefaultShedule(lst, model, "Martes");

            model.Wednesday = new AvailableHoursCompanyDetail();
            model.Wednesday = SetDefaultShedule(lst, model, "Miercoles");

            model.Thursday = new AvailableHoursCompanyDetail();
            model.Thursday = SetDefaultShedule(lst, model, "Jueves");

            model.Friday = new AvailableHoursCompanyDetail();
            model.Friday = SetDefaultShedule(lst, model, "Viernes");

            model.Saturday = new AvailableHoursCompanyDetail();
            model.Saturday = SetDefaultShedule(lst, model, "Sabado");

            model.Sunday = new AvailableHoursCompanyDetail();
            model.Sunday = SetDefaultShedule(lst, model, "Domingo");


            return model;
        }

        private AvailableHoursCompanyDetail SetDefaultShedule(List<AvailableHoursCompany> lst , AvailableHoursCompanyDto model, string weekDay)
        {

            var x = new AvailableHoursCompanyDetail();
            x.IdDetail = lst.Where(x => x.WeekDay == weekDay).Select(x => x.IdDetail).FirstOrDefault();
            x.NumberIdDetail = lst.Select(x => x.NumberId).FirstOrDefault();
            x.WeekDay = weekDay;
            x.V_05_06 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_05_06).FirstOrDefault();
            x.V_06_07 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_06_07).FirstOrDefault();
            x.V_07_08 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_07_08).FirstOrDefault();
            x.V_08_09 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_08_09).FirstOrDefault();
            x.V_09_10 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_09_10).FirstOrDefault();
            x.V_10_11 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_10_11).FirstOrDefault();
            x.V_11_12 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_11_12).FirstOrDefault();
            x.V_12_13 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_12_13).FirstOrDefault();
            x.V_13_14 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_13_14).FirstOrDefault();
            x.V_14_15 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_14_15).FirstOrDefault();
            x.V_15_16 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_15_16).FirstOrDefault();
            x.V_16_17 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_16_17).FirstOrDefault();
            x.V_17_18 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_17_18).FirstOrDefault();
            x.V_18_19 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_18_19).FirstOrDefault();
            x.V_19_20 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.V_19_20).FirstOrDefault();

            x.S_05_06 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_05_06).FirstOrDefault();
            x.S_06_07 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_06_07).FirstOrDefault();
            x.S_07_08 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_07_08).FirstOrDefault();
            x.S_08_09 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_08_09).FirstOrDefault();
            x.S_09_10 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_09_10).FirstOrDefault();
            x.S_10_11 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_10_11).FirstOrDefault();
            x.S_11_12 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_11_12).FirstOrDefault();
            x.S_12_13 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_12_13).FirstOrDefault();
            x.S_13_14 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_13_14).FirstOrDefault();
            x.S_14_15 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_14_15).FirstOrDefault();
            x.S_15_16 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_15_16).FirstOrDefault();
            x.S_16_17 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_16_17).FirstOrDefault();
            x.S_17_18 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_17_18).FirstOrDefault();
            x.S_18_19 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_18_19).FirstOrDefault();
            x.S_19_20 = lst.Where(x => x.WeekDay == weekDay).Select(x => x.S_19_20).FirstOrDefault();

            x.SelectedDay = lst.Where(x => x.WeekDay == weekDay).Select(x => x.SelectedDay).FirstOrDefault();

            return x;
        }

        public AvailableHoursCompanyDto SetAvailableHoursCompanyDto(List<CompanyProfileSimple> lst)
        {
            var model = new AvailableHoursCompanyDto();
            model.Id = 0;
            model.CompanyName = !string.IsNullOrEmpty(lst.Select(x => x.CompanyName).FirstOrDefault()) ? lst.Select(x => x.CompanyName).FirstOrDefault() : string.Empty;
            model.NumberId = lst.Select(x => x.NumberId).FirstOrDefault();
            model.Email = !string.IsNullOrEmpty(lst.Select(x => x.Email).FirstOrDefault()) ? lst.Select(x => x.Email).FirstOrDefault() : string.Empty;
            model.Status = 1;

            model.Monday = new AvailableHoursCompanyDetail();
            model.Monday = SetDefaultShedule(lst, model, "Lunes");

            model.Tuesday = new AvailableHoursCompanyDetail();
            model.Tuesday = SetDefaultShedule(lst, model, "Martes");

            model.Wednesday = new AvailableHoursCompanyDetail();
            model.Wednesday = SetDefaultShedule(lst, model, "Miercoles");

            model.Thursday = new AvailableHoursCompanyDetail();
            model.Thursday = SetDefaultShedule(lst, model, "Jueves");

            model.Friday = new AvailableHoursCompanyDetail();
            model.Friday = SetDefaultShedule(lst, model, "Viernes");

            model.Saturday = new AvailableHoursCompanyDetail();
            model.Saturday = SetDefaultShedule(lst, model, "Sabado");

            model.Sunday = new AvailableHoursCompanyDetail();
            model.Sunday = SetDefaultShedule(lst, model, "Domingo");

            return model;
        }

        private AvailableHoursCompanyDetail SetDefaultShedule(List<CompanyProfileSimple> lst, AvailableHoursCompanyDto model,  string weekDay)
        {
            var x = new AvailableHoursCompanyDetail();
            x.NumberIdDetail = lst.Select(x => x.NumberId).FirstOrDefault();
            x.WeekDay = weekDay;
            if(weekDay != "Sabado" && weekDay != "Domingo")
            {
                x.S_08_09 = true;
                x.V_08_09 = true;
                x.S_09_10 = true;
                x.V_09_10 = true;
                x.S_10_11 = true;
                x.V_10_11 = true;
                x.S_11_12 = true;
                x.V_11_12 = true;
                x.S_14_15 = true;
                x.V_14_15 = true;
                x.S_15_16 = true;
                x.V_15_16 = true;
                x.S_16_17 = true;
                x.V_16_17 = true;
                x.SelectedDay = true;
            }

            if (weekDay == "Sabado" || weekDay == "Domingo")
            {
                x.V_08_09 = true;
                x.V_09_10 = true;
                x.V_10_11 = true;
                x.V_11_12 = true;
                x.V_14_15 = true;
                x.V_15_16 = true;
                x.V_16_17 = true;
            }

            return x;
        }

        private List<AvailableHoursCompany> SetEspecificDate(List<AvailableHoursCompany> bydefault, List<AvailableHoursCompany> lstEspecific)
        {

            foreach(var especific in lstEspecific)
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

            }

            return bydefault;
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

        private async Task<List<AvailableHoursCompany>> GetAvailableHoursCompanyEspecific(string nit, DateTime startDate, DateTime endDate)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
              new SqlParameter("@numberId", nit),
              new SqlParameter("@startDate", startDate.Date),
              new SqlParameter("@endDate", endDate.Date)
            };

            return (List<AvailableHoursCompany>)await _commonService.ExcuteSqlStoredProcedure<AvailableHoursCompany>("GetAvailableHoursCompanyEspecificBetweenDate", parameterList, 1);
        }

        private async Task<List<ScheduledVirtualAppointments>> GetScheduledVirtualAppointmentsCompanyEspecific(string nit)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
              new SqlParameter("@numberId", nit),
              new SqlParameter("@appointmentDate", DateTime.Now.Date),
              new SqlParameter("@startHour", TimeSpan.Parse("00:00")),
              new SqlParameter("@endHour",TimeSpan.Parse("00:00")),
            };

            var model = (List<ScheduledVirtualAppointments>)await _commonService.ExcuteSqlStoredProcedure<ScheduledVirtualAppointments>("GetScheduledVirtualAppointmentsCompanyEspecific", parameterList, 1);

            return model;
        }
        #endregion

    }
}

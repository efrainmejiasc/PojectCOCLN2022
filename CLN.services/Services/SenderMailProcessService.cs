using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CLN.model.APIModels;
using CLN.model.Dto.CAS;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Helpers.Enumerator;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using CLN.Services.Email;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Utils;
using Newtonsoft.Json;
using RestSharp;
using Serilog;
namespace CLN.services.Services
{
    public class SenderMailProcessService : ISenderMailProcessService
    {
        private readonly ICommonService _commonService;
        private readonly CLNContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MailOffersViewModel objMail;
        public AlertDto objAlerta;
        public ContactInfoAlertsDto objContactInfoAlertsDto;
        private readonly IOptions<AppSettings> _settings;
        private readonly ICASService _casService;
        private readonly CultureInfo _esCO;
        private readonly IEmailService _emailService;
        private readonly CASUrlSettings _CASUrl;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly AppSettings _mail360Settings;
        private readonly ConnectionSettings _connectionSettings;
        public SenderMailProcessService(IHttpContextAccessor httpContextAccessor, ICommonService commonService
            , CLNContext context
            , IOptions<AppSettings> settings
            , ICASService casService
            , IEmailService emailService
            , IOptions<CASUrlSettings> CASUrlOptions
            , IWebHostEnvironment hostEnvironment
            , IOptions<ConnectionSettings> connectionSettings)
        {
            _httpContextAccessor = httpContextAccessor;
            _commonService = commonService;
            _context = context;
            _settings = settings;
            _casService = casService;
            _esCO = new("es-CO");
            _emailService = emailService;
            _CASUrl = CASUrlOptions.Value;
            _hostEnvironment = hostEnvironment;
            _mail360Settings = settings.Value;
            _connectionSettings = connectionSettings.Value;
        }

        public async Task<string> SenderMailProcessOfferrsAsync()
        {
            try
            {
                return await OpenCNNAsync();
            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        }

        public async Task<string> OpenCNNAsync()
        {
            var diaUltimo = UltimoViernesDelMes();
            var hoy = DateTime.Now.DayOfWeek;
            var hoyNUm = DateTime.Now.Day;
            bool semanal = false, mensual = false;
            List<MailOffersViewModel> proyectosLst = new(); 
            string anterior = string.Empty;
            EmailTemplateDto emailTemplate = new();
            List<MailOffersViewModel> acquisitionsLst = new();

            emailTemplate = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_PROCESOS);

            if (hoy.ToString().Equals(_settings.Value.CompanyOffersWeeklyDay))///Seteo de valor semanal en true
            { semanal = true; }

            if (((int)hoy == diaUltimo && DateTime.Now.Hour >= 17) || _settings.Value.CompanyOffersMonthly)///Seteo de valor mensual en true - Después de las 5 de la tarde
            {   
                mensual = true;
                emailTemplate = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_PROCESOS_MENSUAL);
            }

            if (emailTemplate == null)
                return "No se encontraron las plantilla de los correos.";

            SqlParameter[] parameterList = new SqlParameter[]
            {
                        new SqlParameter("@semanal",semanal),
                        new SqlParameter("@mensual",mensual)
            };
            var gims = await _commonService.ExcuteSqlStoredProcedure("GetInfoMailSender", parameterList);

            if (gims == null)
                return "No hay notifiaciones de ofertas nuevas para enviar.";

            foreach (DataRow row in gims.Rows)
            {
                objMail = new MailOffersViewModel///Carga el objeto con el nuevo mail la primera vez
                {
                    Entidad = (row["Entidad"] == DBNull.Value) ? string.Empty : Helpers.Helpers.FirstCharToUpper(row["Entidad"].ToString()),
                    ObjContratar = (row["ObjetoAContratar"] == DBNull.Value) ? string.Empty : Helpers.Helpers.FirstCharToUpper(row["ObjetoAContratar"].ToString()),
                    Valor = (row["Valor"] == DBNull.Value) ? string.Empty : ((decimal)row["Valor"]).ToString("C2", _esCO),
                    Fecha = (row["FechaPublicacion"] == DBNull.Value) ? string.Empty : row["FechaPublicacion"].ToString(),
                    Url = (row["Url"] == DBNull.Value) ? string.Empty : Helpers.Helpers.FirstCharToUpper(row["Url"].ToString()),
                    IdProceso = (row["Url"] == DBNull.Value) ? 0 : (int)row["IdProceso"],
                    IdCompany = (row["Url"] == DBNull.Value) ? 0 : (int)row["IdCompany"],
                    Email = (row["Email"] == DBNull.Value) ? string.Empty : Helpers.Helpers.FirstCharToUpper(row["Email"].ToString()),
                    Frecuencia = (row["FrecuenciaModalidad"] == DBNull.Value) ? string.Empty : Helpers.Helpers.FirstCharToUpper(row["FrecuenciaModalidad"].ToString()),
                    Notificacion = (row["Notificacion"] == DBNull.Value) ? string.Empty : Helpers.Helpers.FirstCharToUpper(row["Notificacion"].ToString()),
                    Modalidad = (row["Modalidad"] == DBNull.Value) ? string.Empty : Helpers.Helpers.FirstCharToUpper(row["Modalidad"].ToString()),
                    Tipo = (row["Url"] == DBNull.Value) ? 0 : (int)row["Tipo"],
                    TotalOfertas = (row["Url"] == DBNull.Value) ? 0 : (int)row["TotalOfertas"]
                };
                if(objMail.Tipo == 1)
                    proyectosLst.Add(objMail);
                else
                    acquisitionsLst.Add(objMail);
            }

            var companyList = proyectosLst.Select(x => x.IdCompany).Distinct().ToList();

            foreach (var c in companyList)
            {
                var cpl = proyectosLst.Where(y => y.IdCompany == c).Distinct().ToList();
                var cal = acquisitionsLst.Where(y => y.IdCompany == c).Distinct().ToList();
                var a = await SenderMailOffersProcess(cpl, cal, mensual, emailTemplate);
            }
            return "OK";
        }

        public async Task<string> SenderMailOffersProcess(List<MailOffersViewModel> proyectosLst, List<MailOffersViewModel> acquisitionLst, bool mensual, EmailTemplateDto emailTemplate)
        {
            string companyEmail = string.Empty;
            if (proyectosLst.Count > 0 || acquisitionLst.Count > 0)
            {
                string subject = emailTemplate.Subject;//_settings.Value.CompanyOffersEmailSubject;
                var processesHtml = new List<string>();
                var acquisitionsHtml = new List<string>();
                var bodyHTML = emailTemplate.Body;
                int processCount = proyectosLst.Count;
                int processTotal = processCount == 0 ? 0 : proyectosLst.FirstOrDefault().TotalOfertas;
                int processRow = 1;
                int acquisitionCount = acquisitionLst.Count;
                int acquisitionTotal = acquisitionCount == 0 ? 0 : acquisitionLst.FirstOrDefault().TotalOfertas;
                int acquisitionRow = 1;

                if (processCount == 0)
                {
                    bodyHTML = bodyHTML.Replace("*exists_processes*", "No hay procesos de contratación disponibles");
                }
                else
                {
                    foreach (var item in proyectosLst)
                    {
                        var processHtml = emailTemplate.AdditionalBody.ElementAt(0).Html;
                        processHtml = processHtml.Replace("*processNumber*", processRow.ToString());
                        processHtml = processHtml.Replace("*entity*", item.Entidad);
                        processHtml = processHtml.Replace("*description*", item.ObjContratar);
                        processHtml = processHtml.Replace("*price*", item.Valor);
                        processHtml = processHtml.Replace("*seeMore*", $"{item.Url}");

                        processesHtml.Add(processHtml);
                        processRow++;
                        companyEmail = item.Email;
                    }
                    var h = string.Join(" ", processesHtml);
                    bodyHTML = bodyHTML.Replace("*totalProcesses*", processTotal.ToString());
                    bodyHTML = bodyHTML.Replace("*processes*", h);
                    bodyHTML = bodyHTML.Replace("*exists_processes*", "Top " + processCount + " de procesos de contratación");
                }

                if (mensual)
                {
                    var acquisitionGlobalHtml = emailTemplate.AdditionalBody.ElementAt(1).Html;
                    if (acquisitionCount == 0)
                    {
                        acquisitionGlobalHtml = acquisitionGlobalHtml.Replace("*exists_acquisitions*", "No hay adquisiciones disponibles");
                        acquisitionGlobalHtml = acquisitionGlobalHtml.Replace("*acquisitions*", "");
                    }
                    else
                    {
                        foreach (var item in acquisitionLst)
                        {
                            var acquisitionHtml = emailTemplate.AdditionalBody.ElementAt(2).Html;
                            acquisitionHtml = acquisitionHtml.Replace("*acquisitionNumber*", acquisitionRow.ToString());
                            acquisitionHtml = acquisitionHtml.Replace("*entity*", item.Entidad);
                            acquisitionHtml = acquisitionHtml.Replace("*description*", item.ObjContratar);
                            acquisitionHtml = acquisitionHtml.Replace("*price*", item.Fecha);
                            acquisitionHtml = acquisitionHtml.Replace("*startDate*", item.Fecha);
                            acquisitionHtml = acquisitionHtml.Replace("*modality*", $"{item.Modalidad}");

                            acquisitionsHtml.Add(acquisitionHtml);
                            acquisitionRow++;
                            companyEmail = item.Email;
                        }
                        var h1 = string.Join(" ", acquisitionsHtml);
                        acquisitionGlobalHtml = acquisitionGlobalHtml.Replace("*acquisitions*", h1);
                        acquisitionGlobalHtml = acquisitionGlobalHtml.Replace("*exists_acquisitions*", "Top " + acquisitionCount + " de Planes de adquisición");
                    }
                    bodyHTML = bodyHTML.Replace("*totalAcquisitions*", acquisitionTotal.ToString());
                    bodyHTML = bodyHTML.Replace("*month*", DateTime.Now.AddMonths(1).ToString("MMMM", _esCO));
                    bodyHTML = bodyHTML.Replace("*acquisition_section*", acquisitionGlobalHtml);
                }

                bodyHTML = bodyHTML.Replace("*seeMoreProcess*", _settings.Value.host + _settings.Value.CompanyOffersUrl);
                bodyHTML = bodyHTML.Replace("*urlHost*", _settings.Value.host);

                List<ContactInfoAlertsDto> ContactInfoAlertsDtoLst = new ();
                objContactInfoAlertsDto = new ContactInfoAlertsDto
                {
                    email = companyEmail
                };
                ContactInfoAlertsDtoLst.Add(objContactInfoAlertsDto);

                var er = await SendMail(bodyHTML, subject, ContactInfoAlertsDtoLst);
                if ((bool)Helpers.Helpers.GetValue(er, "Result"))
                {
                    int idSE = int.Parse((string)Helpers.Helpers.GetValue(er, "Message"));
                    foreach (var item in proyectosLst)
                    {
                        SqlParameter[] parameterList = new SqlParameter[]
                        {
                            new SqlParameter("@idSendingMail",idSE),
                            new SqlParameter("@idProceso",item.IdProceso),
                            new SqlParameter("@idCompany",item.IdCompany)
                        };
                        var pmp = await _commonService.ExcuteSqlStoredProcedure("PostMailxProceso", parameterList);
                    }
                }
                return "OK";
            }
            else
            {
                return "No hay información para enviar.";
            }
        }

        public int UltimoViernesDelMes()
        {
            int anio = DateTime.Now.Year;
            int mes = DateTime.Now.Month;
            var ulimoViernesDelMes = new DateTime(anio, mes, DateTime.DaysInMonth(anio, mes));
            while (ulimoViernesDelMes.DayOfWeek != DayOfWeek.Friday)
                ulimoViernesDelMes = ulimoViernesDelMes.AddDays(-1);
            return ulimoViernesDelMes.Day;
        }
        public async Task<Object> GetInfoMailSended(string email)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@email", email == null ? string.Empty:email),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetInfoMailSended", parameterList);
            return records;
        }

        #region templates
        public async Task<string> SenderAlertsAsync()
        {
            try
            {
                return await OpenCNNAlertsync();
            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        }
        public async Task<string> SenderAlert()
        {
            try
            {
                return await OpenCNNAlertsync();
            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        }
        public async Task<string> OpenCNNAlertsync()
        {
            List<AlertDto> alertsLst = new();
            var iams = await _commonService.ExcuteSqlStoredProcedure("GetInfoAlertsMailSender", null);
            if (iams == null)
                return "No hay alertas para enviar.";

            foreach (DataRow row in iams.Rows)
            {
                objAlerta = new AlertDto
                {
                    desde = row["desde"].ToString(),
                    hasta = row["hasta"].ToString(),
                    nombre = (string)row["Nombre"],
                    sendPimes = (bool)row["sendPimes"],
                    infoComercial = (string)row["infoComercial"],
                    characterization = (string)row["caracterizaciones"],
                    idAlert = (int)(decimal)row["idAlert"],
                    tipoNotificacion = (string)row["tipoNotificacion"],
                    tipoPlantilla = (int)(decimal)row["tipoPlantilla"],
                    enlace = row["enlace"].ToString(),
                    primerTexto = (string)row["primerTexto"],
                    segundoTexto = (string)row["segundoTexto"],
                    tercerTexto = (string)row["tercerTexto"],
                    image = (string)row["image"],
                    sms = (bool)row["SMS"],
                    dias = (string)row["dias"],
                    frecuencia = (string)row["frecuencia"],
                    sendAll = (bool)row["sendAll"],
                    sectores = (string)row["sectores"],
                    fechaUltimoEnvio = row["fechaUltimoEnvio"].ToString(),
                    idUsuario = (int)row["idUserCreate"]
                };
                alertsLst.Add(objAlerta);
            }

            string[] stringArray = new string[8];
            int cont = 0;
            var gfha = await _commonService.ExcuteSqlStoredProcedure("GetFormatHtmlAlertas", null);
                   
            if (gfha == null)
                return "No se encontraron las plantilla de los correos.";                

            foreach (DataRow row in gfha.Rows)
            {
                stringArray[cont] = (string)row["html"];
                cont++;
            }

            foreach (AlertDto item in alertsLst)
            {
                bool firstTime = true;
                bool toSend = false;
                string msg = string.Empty;
                string htmlBody = string.Empty;

                if (item.frecuencia != null)
                    if (Frequency(item.frecuencia, item.fechaUltimoEnvio))///Evalua si es semanal, quincenal o mensual
                        toSend = true;

                if (toSend)
                {
                    SqlParameter[] parameterList = new SqlParameter[]
                    {
                        new SqlParameter("@sendAll",item.sendAll),
                        new SqlParameter("@sectores",item.sectores),
                        new SqlParameter("@microBusiness",item.sendPimes),
                        new SqlParameter("@characterization",item.characterization),
                        new SqlParameter("@commercialInformation",item.infoComercial),
                        new SqlParameter("@tipoNotificacion",item.tipoNotificacion)
                    };
                    var gimm = await _commonService.ExcuteSqlStoredProcedure("GetInfoMobile&Mails", parameterList);

                    if (iams == null)
                        continue;

                    foreach (DataRow row in gimm.Rows)
                    {
                        List<ContactInfoAlertsDto> ContactInfoAlertsDtoLst = new();
                        objContactInfoAlertsDto = new ContactInfoAlertsDto
                        {
                            phone = (string)row["phoneNumber"],
                            email = (string)row["email"],
                        };
                        ContactInfoAlertsDtoLst.Add(objContactInfoAlertsDto);
                        if (item.sms)
                        {
                            string phone = row["phoneNumber"].ToString();
                            phone = validPhone(phone);
                            if (phone != null)
                            {
                                if (firstTime)
                                {
                                    if (item.primerTexto.Length > 90)
                                    {
                                        item.primerTexto = item.primerTexto.Substring(0, 90);
                                    }
                                    if (item.tercerTexto != null && item.tercerTexto.Length > 69)
                                    {
                                        item.tercerTexto = item.tercerTexto.Substring(0, 69);
                                    }
                                    msg = item.primerTexto + " " + item.tercerTexto;
                                }
                                    
                                var er = await SendSMS(phone, msg);
                                if (firstTime && (bool)Helpers.Helpers.GetValue(er, "Result"))
                                    await SetAlertSended(item.idAlert, (int)row["companyId"], int.Parse((string)Helpers.Helpers.GetValue(er, "Message")));

                                firstTime = false;
                            }
                        }
                        else if (!item.sms)
                        {
                            if (firstTime)
                            {
                                string directory = _settings.Value.hostServicios;
                                if (!item.image.Contains(_settings.Value.hostServicios))
                                {
                                    item.image = directory + item.image;
                                }
                                string str = string.Empty;
                                if (item.tipoPlantilla == 1)
                                {
                                    str = stringArray[0];
                                    str = str.Replace("%%%", item.image).Replace("###", item.primerTexto).Replace("$$$", item.enlace).Replace("*urlHost*", _settings.Value.host);
                                }
                                else
                                if (item.tipoPlantilla == 2)
                                {
                                    str = stringArray[1];
                                    str = str.Replace("%%%", item.image).Replace("###", item.primerTexto).Replace("&&&", item.segundoTexto).Replace("$$$", item.enlace).Replace("*urlHost*", _settings.Value.host);
                                }
                                else
                                if (item.tipoPlantilla == 3)
                                {
                                    str = stringArray[2];
                                    str = str.Replace("%%%", item.image).Replace("###", item.primerTexto).Replace("$$$", item.enlace).Replace("*urlHost*", _settings.Value.host);
                                }
                                htmlBody = str;
                            }

                            var er = await SendMail(htmlBody, item.tipoNotificacion, ContactInfoAlertsDtoLst);
                            if (firstTime && (bool)Helpers.Helpers.GetValue(er, "Result"))
                                await SetAlertSended(item.idAlert, (int)row["companyId"], int.Parse((string)Helpers.Helpers.GetValue(er, "Message")));

                            firstTime = false;
                        }
                    }
                }
            }
            return "OK";
        }

        public async Task<object> SendMail(string htmlBody, string subject, List<ContactInfoAlertsDto> contactInfoAlertsLst)
        {
            List<string> to = new ();

            to = contactInfoAlertsLst.Select(x => x.email).Distinct().ToList();
            try
            {
                SendEmailDetails emailDetail = new()
                {
                    Subject = subject,
                    To = to.ToArray(),
                    Body = htmlBody
                };
                var result = await _emailService.Mail360(emailDetail);
                //var result = await _emailService.SendEmail(emailDetail);
                return result;
            }
            catch (Exception ex)
            {
                return new { ex.Message };
            }
        }

        public async Task<object> SendSMS(string number, string msm)
        {
            List<string> to = new() { number };
            try
            {
                SendSMSDetails smsDetail = new()
                {
                    Message = msm,
                    To = to.ToArray()
                };
                var result = await _emailService.SMS360(smsDetail);
                return result;
            }
            catch (Exception ex)
            {
                return new { ex.Message };
            }
        }

        public bool FrequencyDay(string days)
        {
            days = days.ToLower();
            CultureInfo ci = new CultureInfo("Es-Es");
            string hoy = ci.DateTimeFormat.GetDayName(DateTime.Now.DayOfWeek);
            if (days.Contains(hoy))
            {
                return true;
            }
            return false;
        }

        public bool Frequency(string frecuencia, string fechaUltimoEnvio)
        {
            DateTime ultimoEnvio = Convert.ToDateTime(fechaUltimoEnvio);
            if (ultimoEnvio.Year == 1900)
            {
                return true;
            }
            if (frecuencia.ToLower() == "semanal")
            {
                int dif = (DateTime.Now - ultimoEnvio).Days;
                if (dif > 6)
                {
                    return true;
                }
            }
            if (frecuencia.ToLower() == "quincenal")
            {
                int dif = (DateTime.Now - ultimoEnvio).Days;
                if (dif > 13)
                {
                    return true;
                }
            }
            if (frecuencia.ToLower() == "mensual")
            {
                int dif = (DateTime.Now - ultimoEnvio).Days;
                if (dif > 27)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task SetAlertSended(int idAlert, int idCompany, int idSended)
        {
            /* //se comenta pq no creo que haga nada esta funcionalidad
            SqlParameter[] parameterList = new SqlParameter[]
                       {
                            new SqlParameter("@sendAll",idSended),
                            new SqlParameter("@idProceso",idAlert),
                            new SqlParameter("@idCompany",idCompany)
                       };
            var pnac = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("PostNotifAlertasCompras", parameterList, 2);
            */

            SqlParameter[] parameterList2 = new SqlParameter[]
            {
                new SqlParameter("@idAlert",idAlert)
            };
            var sas = await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetAlertSended", parameterList2, 2);
            #endregion
        }

        public string validPhone(string Phone)
        {
            if (Phone != null && Phone.Length > 9)
            {
                Phone = Phone.Substring(Phone.Length - 10);
                if (Phone.Substring(0, 1) == "3")
                {
                    Phone = "57" + Phone;
                    return Phone;
                }
                return null;
            }
            return null;
        }

        public async Task<IResponse> SubmitNewCLNContentsAsync(CancellationToken cancelationToken)
        {
            dynamic result = new ExpandoObject();
            var dateNow = DateTime.UtcNow;
            var dateLastWeek = DateTime.UtcNow.AddDays(-7);

            //var CommunitysData = await _casService.GetCLNCommunitiesAsync(cancelationToken);

            //var lCompanyProfiles1 = await (from u in _context.CompanyProfiles
            //                               select u).ToListAsync(cancelationToken);

            var lCompanyProfiles = await _commonService.GetCompaniesforNewCLNContents();

            result.CLNEvents = await SendCLNEventsAsync(lCompanyProfiles, dateNow, dateLastWeek, cancelationToken);
            result.CLNServices = await SendCLNServicessAsync(lCompanyProfiles, dateNow, dateLastWeek, cancelationToken);
            result.CLNBusiness = await SendCLNBusinessOpportunitiesAsync(lCompanyProfiles, dateNow, dateLastWeek, cancelationToken);
            //result.CLNCommunities = await SendCLNCommunitiesAsync(lCompanyProfiles, dateNow, dateLastWeek, cancelationToken);

            return new Response<object>(result, null);
        }

        private async Task<List<object>> SendCLNEventsAsync(List<CompanyProfileCLNNewContentDto> lCompanyProfiles, DateTime dateNow, DateTime dateLastWeek, CancellationToken cancelationToken)
        {
            var proccessResult = new ProcessResult();
            var startProcess = DateTime.Now;
            var endProcess = new DateTime();

            var lresult = new List<object>();
            var EventsData = await _casService.GetCLNEventsAsync(cancelationToken);
            var lEvents = ((Response<List<Event>>)EventsData).Data;
            var le = lEvents.Where(x => Helpers.Helpers.GetDateTimefromTimeStamp(x.created) >= dateLastWeek && Helpers.Helpers.GetDateTimefromTimeStamp(x.end_date) >= dateNow).ToList();
            //var le = lEvents;// solo para el ejemplo

            if (le.Count == 0)
            {
                proccessResult.ServiceUrl = "SendCLNEventsAsync";
                proccessResult.Result = "No se encontraron eventos";
                endProcess = DateTime.Now;
                await _commonService.SetProcessLog(1, "Envio de emails a empresas acerca de eventos", startProcess, endProcess, true, proccessResult, 1);
                return lresult;
            }


            var lIndustries = le.Where(k => k.industry != null).Select(x => x.industry).Distinct().ToList();
            var emailTemplate = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_EVENTOS);

            var n = 1;
            foreach (var i in lIndustries)
            {
                var eventsHtml = new List<string>();
                var body = emailTemplate.Body;

                var result = true;
                var lc = lCompanyProfiles.Where(x => x.Industries.Any(y => y.Value.Equals(i)) && x.NotificationTypes.Any(z => z.Notification != null && z.Notification.Equals("Eventos / Contenidos"))).ToList();

                if (lc.Count == 0)
                    continue;

                var l = le.Where(w => w.industry != null && w.industry.Equals(i)).Distinct().ToList();
                for (int e = 0; (e < l.Count && e < 4); e++)
                {
                    var fi = Helpers.Helpers.GetDateTimefromTimeStamp(l[e].init_date);
                    var fc = Helpers.Helpers.GetDateTimefromTimeStamp(l[e].end_date);
                    var eventHtml = emailTemplate.AdditionalBody.FirstOrDefault().Html;
                    eventHtml = eventHtml.Replace("*Eventos/Contenidos*", l[e].title);
                    eventHtml = eventHtml.Replace("*Fecha_de_inicio*", fi.ToString("dd/MM/yyyy"));
                    eventHtml = eventHtml.Replace("*Fecha_de_cierre*", fc.ToString("dd/MM/yyyy"));
                    eventHtml = eventHtml.Replace("*ver_mas*", $"{_CASUrl.EventDetailUrl}{l[e].id}");

                    eventsHtml.Add(eventHtml);
                }

                string[] to = lc.Select(y => y.Email).ToArray();
                var h = string.Join(" ", eventsHtml);
                body = body.Replace("*Eventos*", h);
                body = body.Replace("*urlHost*", _settings.Value.host);
                try
                {
                    SendEmailDetails emailDetail = new()
                    {
                        Subject = emailTemplate.Subject,
                        To = to,
                        Body = body
                    };
                    var se = await _emailService.Mail360(emailDetail);
                    //var se = await _emailService.SendEmail(emailDetail);
                    result = (bool)Helpers.Helpers.GetValue(se, "Result");

                    proccessResult.ServiceUrl = "SendCLNEventsAsync";
                    proccessResult.Result = "exitoso";
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de eventos", startProcess, endProcess, true, proccessResult, 1);

                }
                catch (Exception ex)
                {
                    result = false;
                    proccessResult.ServiceUrl = "SendCLNEventsAsync";
                    proccessResult.Result = "Fallido";
                    proccessResult.ProcessError = JsonConvert.SerializeObject(ex);
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de eventos", startProcess, endProcess, result, proccessResult, 1);
                }

                lresult.Add(new { EmailType = "Eventos", EmailSended = result, Industry = i });
                n++;
            }

            return lresult;
        }

        private async Task<List<object>> SendCLNServicessAsync(List<CompanyProfileCLNNewContentDto> lCompanyProfiles, DateTime dateNow, DateTime dateLastWeek, CancellationToken cancelationToken)
        {
            var proccessResult = new ProcessResult();
            var startProcess = DateTime.Now;
            var endProcess = new DateTime();


            var lresult = new List<object>();
            var ServicessData = await _casService.GetCLNServicessAsync(cancelationToken);
            var lServices = ((Response<List<Service>>)ServicessData).Data;
            var ls = lServices.Where(x => Helpers.Helpers.GetDateTimefromTimeStamp(x.created) >= dateLastWeek).ToList();
            //var ls = lServices;// solo para el ejemplo

            if (ls.Count == 0)
            {
                proccessResult.ServiceUrl = "SendCLNServicessAsync";
                proccessResult.Result = "No se encontraron servicios de apoyo";
                endProcess = DateTime.Now;
                await _commonService.SetProcessLog(1, "Envio de emails a empresas acerca de servicios de apoyo", startProcess, endProcess, true, proccessResult, 1);
                return lresult;
            }


            var lIndustries = ls.Where(k => k.industry != null).Select(x => x.industry).Distinct().ToList();
            var emailTemplate = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_SERVICIOS);

            var n = 1;
            foreach (var i in lIndustries)
            {
                var servicesHtml = new List<string>();
                var body = emailTemplate.Body;

                var result = true;
                var lc = lCompanyProfiles.Where(x => x.Industries.Any(y => y.Value.Equals(i)) && x.NotificationTypes.Any(z => z.Notification != null && z.Notification.Equals("Servicios de apoyo"))).ToList();

                if (lc.Count == 0)
                    continue;

                var l = ls.Where(w => w.industry != null && w.industry.Equals(i)).Distinct().ToList();
                for (int s = 0; (s < l.Count && s < 4); s++)
                {
                    var fi = Helpers.Helpers.GetDateTimefromTimeStamp(l[s].created);
                    var serviceHtml = emailTemplate.AdditionalBody.FirstOrDefault().Html;
                    serviceHtml = serviceHtml.Replace("*Servicio_de_apoyo*", l[s].title);
                    serviceHtml = serviceHtml.Replace("*Fecha_de_inicio*", fi.ToString("dd/MM/yyyy"));

                    serviceHtml = serviceHtml.Replace("*ver_mas*", $"{_CASUrl.ServiceDetailUrl}{l[s].id}");

                    servicesHtml.Add(serviceHtml);
                }

                string[] to = lc.Select(y => y.Email).ToArray();
                var h = string.Join(" ", servicesHtml);
                body = body.Replace("*Servicios*", h);
                body = body.Replace("*urlHost*", _settings.Value.host);

                try
                {
                    SendEmailDetails emailDetail = new()
                    {
                        Subject = emailTemplate.Subject,
                        To = to,
                        Body = body
                    };
                    var se = await _emailService.Mail360(emailDetail);
                    //var se = await _emailService.SendEmail(emailDetail);
                    result = (bool)Helpers.Helpers.GetValue(se, "Result");

                    proccessResult.ServiceUrl = "SendCLNServicessAsync";
                    proccessResult.Result = "Exitoso";
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de servicios de apoyo", startProcess, endProcess, result, proccessResult, 1);

                }
                catch (Exception ex)
                {
                    result = false;
                    proccessResult.ServiceUrl = "SendCLNServicessAsync";
                    proccessResult.Result = "Fallido";
                    proccessResult.ProcessError = JsonConvert.SerializeObject(ex);
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de servicios de apoyo", startProcess, endProcess, result, proccessResult, 1);
                }

                lresult.Add(new { EmailType = "Servicios de apoyo", EmailSended = result, Industry = i });
                n++;
            }


            return lresult;
        }

        private async Task<List<object>> SendCLNBusinessOpportunitiesAsync(List<CompanyProfileCLNNewContentDto> lCompanyProfiles, DateTime dateNow, DateTime dateLastWeek, CancellationToken cancelationToken)
        {
            var proccessResult = new ProcessResult();
            var startProcess = DateTime.Now;
            var endProcess = new DateTime();

            var lresult = new List<object>();
            var BusinessData = await _casService.GetCLNBusinessOpportunitiesAsync(cancelationToken);
            var lBusiness = ((Response<List<BusinessOpportunity>>)BusinessData).Data;
            var lb = lBusiness.Where(x => Helpers.Helpers.GetDateTimefromTimeStamp(x.publish_date) >= dateLastWeek && Helpers.Helpers.GetDateTimefromTimeStamp(x.finish_date) >= dateNow).ToList();
            //var lb = lBusiness;// solo para el ejemplo									

            if (lb.Count == 0)
            {
                proccessResult.ServiceUrl = "SendCLNBusinessOpportunitiesAsync";
                proccessResult.Result = "No se encontraron anuncios de compra";
                endProcess = DateTime.Now;
                await _commonService.SetProcessLog(1, "Envio de emails a empresas acerca de anuncios de compra", startProcess, endProcess, true, proccessResult, 1);
                return lresult;
            }


            var lIndustries = lb.Where(k => k.industry != null).Select(x => x.industry).Distinct().ToList();
            var emailTemplate = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_ANUNCIOS);

            var n = 1;
            foreach (var i in lIndustries)
            {
                var opportunitiesHtml = new List<string>();
                var body = emailTemplate.Body;

                var result = true;
                var lc = lCompanyProfiles.Where(x => x.Industries.Any(y => y.Value.Equals(i)) && x.NotificationTypes.Any(z => z.Notification != null && z.Notification.Equals("Anuncios de compra"))).ToList();

                if (lc.Count == 0)
                    continue;

                var l = lb.Where(w => w.industry != null && w.industry.Equals(i)).Distinct().ToList();
                for (int b = 0; (b < l.Count && b < 4); b++)
                {
                    var fi = Helpers.Helpers.GetDateTimefromTimeStamp(l[b].publish_date);
                    var fc = Helpers.Helpers.GetDateTimefromTimeStamp(l[b].finish_date);
                    var opportunityHtml = emailTemplate.AdditionalBody.FirstOrDefault().Html;
                    opportunityHtml = opportunityHtml.Replace("*Anuncio_de_compra*", l[b].title);
                    opportunityHtml = opportunityHtml.Replace("*Fecha_de_inicio*", fi.ToString("dd/MM/yyyy"));
                    opportunityHtml = opportunityHtml.Replace("*Fecha_de_cierre*", fc.ToString("dd/MM/yyyy"));
                    opportunityHtml = opportunityHtml.Replace("*Proyecto*", l[b].idb_project_name);
                    opportunityHtml = opportunityHtml.Replace("*ver_mas*", $"{_CASUrl.BusinessOpportunityDetailUrl}{l[b].id}");

                    opportunitiesHtml.Add(opportunityHtml);
                }

                string[] to = lc.Select(y => y.Email).ToArray();
                var h = string.Join(" ", opportunitiesHtml);
                body = body.Replace("*Anuncios*", h);
                body = body.Replace("*urlHost*", _settings.Value.host);

                try
                {
                    SendEmailDetails emailDetail = new()
                    {
                        Subject = emailTemplate.Subject,
                        To = to,
                        Body = body
                    };
                    var se = await _emailService.Mail360(emailDetail);
                    //var se = await _emailService.SendEmail(emailDetail);
                    result = (bool)Helpers.Helpers.GetValue(se, "Result");

                    proccessResult.ServiceUrl = "SendCLNBusinessOpportunitiesAsync";
                    proccessResult.Result = "Exitoso";
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de anuncios de compra", startProcess, endProcess, result, proccessResult, 1);

                }
                catch (Exception ex)
                {
                    result = false;
                    proccessResult.ServiceUrl = "SendCLNBusinessOpportunitiesAsync";
                    proccessResult.Result = "Fallido";
                    proccessResult.ProcessError = JsonConvert.SerializeObject(ex);
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de compra", startProcess, endProcess, result, proccessResult, 1);
                }

                lresult.Add(new { EmailType = "Anuncios de compra", EmailSended = result, Industry = i });
                n++;
            }
            return lresult;
        }

        private async Task<List<object>> SendCLNCommunitiesAsync(List<CompanyProfileCLNNewContentDto> lCompanyProfiles, DateTime dateNow, DateTime dateLastWeek, CancellationToken cancelationToken)
        {
            var proccessResult = new ProcessResult();
            var startProcess = DateTime.Now;
            var endProcess = new DateTime();

            var lresult = new List<object>();
            var communityData = await _casService.GetCLNCommunitiesAsync(cancelationToken);
            var lCommunity = ((Response<List<Community>>)communityData).Data;
            var le = lCommunity;
            // var le = lCommunity.Where(x => Helpers.Helpers.GetDateTimefromTimeStamp(x.created) >= dateLastWeek && Helpers.Helpers.GetDateTimefromTimeStamp(x.end_date) >= dateNow).ToList();


            if (le.Count == 0)
            {
                proccessResult.ServiceUrl = "SendCLNCommunitiesAsync";
                proccessResult.Result = "No se encontraron comunidades";
                endProcess = DateTime.Now;
                await _commonService.SetProcessLog(1, "Envio de emails a empresas acerca de comunidades", startProcess, endProcess, true, proccessResult, 1);
                return lresult;
            }


            var lIndustries = le.Where(k => k.category != null).Select(x => x.category).Distinct().ToList();
            var emailTemplate = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_EVENTOS);

            var n = 1;
            foreach (var i in lIndustries)
            {
                var communitysHtml = new List<string>();
                var body = emailTemplate.Body;

                var result = true;
                //var lc = lCompanyProfiles.Where(x => x.Industries.Any(y => y.Value.Equals(i)) && x.NotificationTypes.Any(z => z.Notification != null && z.Notification.Equals("Comunidades"))).ToList();
                var lc = lCompanyProfiles.ToList();

                if (lc.Count == 0)
                    continue;

                var l = le.Where(w => w.category != null && w.category.Equals(i)).Distinct().ToList();
                for (int e = 0; (e < l.Count && e < 4); e++)
                {
                    var communityHtml = emailTemplate.AdditionalBody.FirstOrDefault().Html;
                    communityHtml = communityHtml.Replace("*Comunidad*", l[e].name);
                    communityHtml = communityHtml.Replace("*Categoria*", l[e].category);
                    communityHtml = communityHtml.Replace("*Fecha_de_inicio*", DateTime.Now.ToString("dd/MM/yyyy"));
                    communityHtml = communityHtml.Replace("*Fecha_de_cierre*", DateTime.Now.ToString("dd/MM/yyyy"));
                    communityHtml = communityHtml.Replace("*ver_mas*", $"{_CASUrl.ComunitiesUrls}{l[e].id}");

                    communitysHtml.Add(communityHtml);
                }

                string[] to = lc.Select(y => y.Email).ToArray();
                var h = string.Join(" ", communitysHtml);
                body = body.Replace("*Comunidad*", h);
                body = body.Replace("*urlHost*", _settings.Value.host);
                try
                {
                    SendEmailDetails emailDetail = new()
                    {
                        Subject = emailTemplate.Subject,
                        To = to,
                        Body = body
                    };
                    var se = await _emailService.Mail360(emailDetail);
                    //var se = await _emailService.SendEmail(emailDetail);
                    result = (bool)Helpers.Helpers.GetValue(se, "Result");

                    proccessResult.ServiceUrl = "SendCLNCommunitiesAsync";
                    proccessResult.Result = "exitoso";
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de comunidades", startProcess, endProcess, true, proccessResult, 1);

                }
                catch (Exception ex)
                {
                    result = false;
                    proccessResult.ServiceUrl = "SendCLNCommunitiesAsync";
                    proccessResult.Result = "Fallido";
                    proccessResult.ProcessError = JsonConvert.SerializeObject(ex);
                    endProcess = DateTime.Now;
                    await _commonService.SetProcessLog(n, "Envio de emails a empresas acerca de comunidades", startProcess, endProcess, result, proccessResult, 1);
                }

                lresult.Add(new { EmailType = "Comunidades", EmailSended = result, Industry = i });
                n++;
            }

            return lresult;
        }


        public async Task<bool> SenderAppointnmentsVirtualNotify(ScheduledVirtualAppointmentsNotify model )
        {
            var result = false;
            var to = new string[1];

            var template = new EmailTemplateDto();
            if(model.TypeState == "Programado")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_INVITATION);
                to[0] = model.EmailGuest;
            }
            else if (model.TypeState == "Confirmado" && model.Type == "Guest")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_CONFIRMATION);
                to[0] = model.EmailHost;
            }
            else if (model.TypeState == "Confirmado" && model.Type == "Host")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_CONFIRMATION);
                to[0] = model.EmailGuest;
            }
            else if (model.TypeState == "Cancelado" && model.Type == "Host")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_CANCELATION);
                to[0] = model.EmailGuest;
            }
            else if (model.TypeState == "Cancelado" && model.Type == "Guest")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_CANCELATION);
                to[0] = model.EmailHost;
            }
            else if (model.TypeState == "Rechazado")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_REJECTION);
                to[0] = model.EmailHost;
            }
            else if (model.TypeState == "Reprogramado por Invitado")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_RESHEDULED_BY_GUEST);
                to[0] = model.EmailHost;
            }
            else if (model.TypeState == "Reprogramado por Anfitrion")
            {
                template = await _emailService.GetEmailTemplate((int)EnumeratorEmailTemplate.EMAIL_RESHEDULED_BY_HOST);
                to[0] = model.EmailGuest;
            }

            //to[1] = "emejias@ivolucion.com";
            var body = template.Body;
            body = SetBody(model.TypeState, body, model);

            SendEmailDetails emailDetail = new()
            {
                Subject = template.Subject,
                To = to,
                Body = body
            };
            var se = await _emailService.Mail360(emailDetail);
            //var se = await _emailService.SendEmail(emailDetail);
            result = (bool)Helpers.Helpers.GetValue(se, "Result");

            return result;
        }

        private string SetBody(string typeState, string body, ScheduledVirtualAppointmentsNotify model)
        {
            if (typeState == "Programado")
            {
                body = body.Replace("*Motivo*", model.Reason);
                body = body.Replace("*Sector/Industria_Anfitriona*", String.Join(", ", model.IndustriesHost.Select(x => x.Value)));
                body = body.Replace("*Empresa_Anfitriona*", model.Host);
                body = body.Replace("*Id_Empresa*", model.NumberIdGuest);
            }
            else if (typeState == "Confirmado")
            {
                body = body.Replace("*Empresa_Invitada*", model.Host);
                body = body.Replace("*Sector/Industria_Invitada*", String.Join(", ", model.IndustriesGuest.Select(x => x.Value)));
                body = body.Replace("*Motivo*", model.Reason);
                body = body.Replace("*Id_Empresa*", model.NumberIdHost);
            }
            else if (typeState == "Cancelado" && model.Type == "Host")
            {
                body = body.Replace("*Nombre_Empresa2*", model.Guest);
                body = body.Replace("*Nombre_Empresa1*", model.Host);
                body = body.Replace("*Sector/Industria*", String.Join(", ", model.IndustriesHost.Select(x => x.Value)));
                body = body.Replace("*Motivo_Cancelacion*", model.ReasonState);
            }
            else if (typeState == "Cancelado" && model.Type == "Guest")
            {
                body = body.Replace("*Nombre_Empresa2*", model.Host);
                body = body.Replace("*Nombre_Empresa1*", model.Guest);
                body = body.Replace("*Sector/Industria*", String.Join(", ", model.IndustriesGuest.Select(x => x.Value)));
                body = body.Replace("*Motivo_Cancelacion*", model.ReasonState);
            }
            else if (typeState == "Rechazado")
            {
                body = body.Replace("*Empresa_Anfitriona*", model.Host);
                body = body.Replace("*Empresa_Invitada*", model.Guest);
                body = body.Replace("*Sector/Industria_Invitada*", String.Join(", ", model.IndustriesGuest.Select(x => x.Value)));
                body = body.Replace("*Motivo_Rechazo*", model.ReasonState);
                body = body.Replace("*Id_Empresa*", model.NumberIdHost);
            }
            else if (typeState == "Reprogramado por Anfitrion")
            {
                body = body.Replace("*Empresa_Invitada*", model.Guest);
                body = body.Replace("*Empresa_Anfitriona*", model.Host);
                body = body.Replace("*Sector/Industria_Anfitriona*", String.Join(", ", model.IndustriesHost.Select(x => x.Value)));
                body = body.Replace("*Motivo*", model.Reason);
                body = body.Replace("*Id_Empresa*", model.NumberIdGuest);
            }
            else if (typeState == "Reprogramado por Invitado")
            {
                body = body.Replace("*Empresa_Anfitriona*", model.Host);
                body = body.Replace("*Empresa_Invitada*", model.Guest);
                body = body.Replace("*Sector/Industria_Invitada*", String.Join(", ", model.IndustriesGuest.Select(x => x.Value)));
                body = body.Replace("*Motivo*", model.Reason);
                body = body.Replace("*Id_Empresa*", model.NumberIdHost);
            }

            body = body.Replace("*Fecha*", CultureInfo.InvariantCulture.TextInfo.ToTitleCase(model.AppointmentDate.Date.ToString("dddd, dd MMMM yyyy", CultureInfo.CreateSpecificCulture("es-CO"))));
            body = body.Replace("*Hora*", model.StartHour.ToString(@"hh\:mm") + "-" + model.EndHour.ToString(@"hh\:mm"));
            body = body.Replace("*Enlace_Cita*", model.Link);
            body = body.Replace("*urlHost*", _settings.Value.host);

            return body;
        }
    }
}

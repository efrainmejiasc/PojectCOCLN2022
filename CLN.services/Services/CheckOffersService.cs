using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Helpers.Constants;
using CLN.services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class CheckOffersService : ICheckOffersService
    {
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CheckOffersService(IHttpContextAccessor httpContextAccessor, ICommonService commonService)
        {
            _httpContextAccessor = httpContextAccessor;
            _commonService = commonService;
        }
        public int GetIdUser()
        {
            return int.TryParse(_httpContextAccessor?.HttpContext?.User?.FindFirst("IdUser")?.Value, out int outValue) ? (int)outValue : 0;
        }
  
        public async Task<string> GetHiringProcessesSecopOne(string pUrl, string pQuery)
        {
            int intCount = 1;
            ProcessLog processLog;
            List<ProcessLog> lProcessLog;
            List<HiringProcess> listAux;
            DateTime dateStartProcess = new DateTime();
            DateTime dateEndProcess = new DateTime();
            IPAddress[] ips = Dns.GetHostAddresses(Dns.GetHostName());
            ProcessResult processResult = new();
            string strResponse;
            do
            {
                dateStartProcess = DateTime.Now;
                try
                {
                    await _commonService.ExcuteSqlStoredProcedure<object>("DeleteAllHiringProcesses", null, 0);

                    processLog = new();
                    lProcessLog = new();
                    string strDate = DateTime.Now.AddMonths(-4).ToString("yyyy-MM-dd");

                    var strUrl = pUrl + pQuery.Replace("DateHere", strDate);

                    WebRequest request = (HttpWebRequest)WebRequest.Create(strUrl);
                    request.Method = "GET";
                    request.ContentType = "application/json";

                    using (var response = request.GetResponse())
                    {
                        processResult.ServiceResult = JsonConvert.SerializeObject(response);
                        using (var strReader = response.GetResponseStream())
                        {
                            var result = strReader.ToString();
                            using (StreamReader objReader = new StreamReader(strReader))
                            {
                                var objet = objReader.ReadToEnd();
                                List<HiringProcessSecopOneDto> listHiringProcess = System.Text.Json.JsonSerializer.Deserialize<List<HiringProcessSecopOneDto>>(objet);
                                listAux = listHiringProcess.Select(la => (HiringProcess)la).ToList();
                                //_context.HiringProcesses.AddRange(listAux);

                            }
                        }

                    }

                    var r = await SaveHiringProcess(listAux);
                    if (!r.ToString().Equals("OK"))
                        throw new Exception("Falló el guardar los procesos de contratación en la base de datos");

                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    processLog.Attempts = intCount;
                    processLog.Process = ConstantHiringProcess.nameProcessSecopOne;
                    processLog.ProcessStartDate = dateStartProcess;
                    processLog.ProcesseEndDate = dateEndProcess;
                    processLog.Success = true;
                    processLog.Ip = ips[1].ToString();
                    processLog.ProcessResult = JsonConvert.SerializeObject(processResult);
                    processLog.IdUserCreate = GetIdUser();
                    processLog.DateCreate = DateTime.Now;
                    strResponse = "Exitoso";
                    //_context.ProcessLogs.Add(processLog);
                    lProcessLog.Add(processLog);

                    _ = await SaveProcessLog(lProcessLog);
                    break;
                }
                catch (Exception ex)
                {
                    processLog = new();
                    lProcessLog = new();

                    intCount++;
                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.badRequest;
                    dateEndProcess = DateTime.Now;
                    processLog.Attempts = intCount;
                    processLog.Process = ConstantHiringProcess.nameProcessSecopOne;
                    processLog.ProcessStartDate = dateStartProcess;
                    processLog.ProcesseEndDate = dateEndProcess;
                    processLog.Success = true;
                    processLog.Ip = ips[1].ToString();
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    processLog.ProcessResult = JsonConvert.SerializeObject(processResult);
                    processLog.IdUserCreate = GetIdUser();
                    processLog.DateCreate = DateTime.Now;
                    strResponse = "Fallido";
                    //_context.ProcessLogs.Add(processLog);
                    lProcessLog.Add(processLog);

                    _ = await SaveProcessLog(lProcessLog);
                }
            } while (intCount < 3);

            return strResponse;
        }

        public async Task<string> GetHiringProcessesSecopTwo(string pUrl, string pQuery)
        {
            int intCount = 1;
            ProcessLog processLog;
            List<ProcessLog> lProcessLog;
            List<HiringProcess> listAux;
            DateTime dateStartProcess = new DateTime();
            DateTime dateEndProcess = new DateTime();
            IPAddress[] ips = Dns.GetHostAddresses(Dns.GetHostName());
            ProcessResult processResult = new();
            string strResponse;
            do
            {
                dateStartProcess = DateTime.Now;
                try
                {
                    processLog = new();
                    lProcessLog = new();
                    string currentDate = DateTime.Now.ToString("yyyy-MM-dd");
                    string currentDateless3 = DateTime.Now.AddDays(-3).ToString("yyyy-MM-dd");

                    var strUrl = pUrl + pQuery.Replace("CurrentDate-3", currentDateless3).Replace("CurrentDate", currentDate); 

                    WebRequest request = (HttpWebRequest)WebRequest.Create(strUrl);
                    request.Method = "GET";
                    request.ContentType = "application/json";

                    using (var response = request.GetResponse())
                    {
                        processResult.ServiceResult = JsonConvert.SerializeObject(response);
                        using (var strReader = response.GetResponseStream())
                        {
                            var result = strReader.ToString();
                            using (StreamReader objReader = new StreamReader(strReader))
                            {
                                var objet = objReader.ReadToEnd();
                                List<HiringProcessSecopTwoDto> listHiringProcess = System.Text.Json.JsonSerializer.Deserialize<List<HiringProcessSecopTwoDto>>(objet);
                                listAux = listHiringProcess.Select(la => (HiringProcess)la).ToList();
                                //_context.HiringProcesses.AddRange(listAux);
                            }
                        }
                    }

                    var r  = await SaveHiringProcess(listAux);
                    if (!r.ToString().Equals("OK"))
                        throw new Exception("Falló el guardar los procesos de contratación en la base de datos");

                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    processLog.Attempts = intCount;
                    processLog.Process = ConstantHiringProcess.nameProcessSecopTwo;
                    processLog.ProcessStartDate = dateStartProcess;
                    processLog.ProcesseEndDate = dateEndProcess;
                    processLog.Success = true;
                    processLog.Ip = ips[1].ToString();
                    processLog.ProcessResult = JsonConvert.SerializeObject(processResult);
                    processLog.IdUserCreate = GetIdUser();
                    processLog.DateCreate = DateTime.Now;
                    strResponse = "Exitoso";
                    //_context.ProcessLogs.Add(processLog);
                    lProcessLog.Add(processLog);

                    _= await SaveProcessLog(lProcessLog);
                    break;
                }
                catch (Exception ex)
                {
                    processLog = new();
                    lProcessLog = new();

                    intCount++;
                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.badRequest;
                    dateEndProcess = DateTime.Now;
                    processLog.Attempts = intCount;
                    processLog.Process = ConstantHiringProcess.nameProcessSecopOne;
                    processLog.ProcessStartDate = dateStartProcess;
                    processLog.ProcesseEndDate = dateEndProcess;
                    processLog.Success = true;
                    processLog.Ip = ips[1].ToString();
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    processLog.ProcessResult = JsonConvert.SerializeObject(processResult);
                    processLog.IdUserCreate = GetIdUser();
                    processLog.DateCreate = DateTime.Now;
                    strResponse = "Fallido";
                    //_context.ProcessLogs.Add(processLog);
                    lProcessLog.Add(processLog);

                    _ = await SaveProcessLog(lProcessLog);
                }
            } while (intCount < 3);
            return strResponse;
        }

        private async Task<object> SaveHiringProcess(object hiringProcess)
        {
            string json = JsonConvert.SerializeObject(hiringProcess);
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@hiringProcessJson", json)
            };

            var result = (StoreProcedureLiteResponse) await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetHiringProcess", parameterList, 0);
            return result.Result; 
        }

        private async Task<object> SaveProcessLog(object processLog)
        {
            var settings = new JsonSerializerSettings { DateFormatString = "yyyy-MM-ddTHH:mm:ss.fffZ" };
            string json = JsonConvert.SerializeObject(processLog, settings);
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@processLogJson", json)
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetProcessLog", parameterList, 0);
            return result.Result;
        }
    }
}

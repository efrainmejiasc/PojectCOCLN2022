using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Helpers.Constants;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class HiringProcessService : IHiringProcessService
    {
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private HttpClient _httpClient;
        private IConfiguration _configuracion { get; }
        public HiringProcessService(IHttpContextAccessor httpContextAccessor, ICommonService commonService
            , IConfiguration configuracion)
        {
            _httpContextAccessor = httpContextAccessor;
            _commonService = commonService;
            _configuracion = configuracion;
            _httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(480)
            };
        }
        public int GetIdUser()
        {
            return int.TryParse(_httpContextAccessor?.HttpContext?.User?.FindFirst("IdUser")?.Value, out int outValue) ? (int)outValue : 0;
        }
        //public async Task<string> GetHiringProcessesSecopOne(string pUrl, string pQuery)
        //{
        //    int intCount = 1;
        //    ProcessLog processLog = new();
        //    List<ProcessLog> lProcessLog = new();
        //    DateTime dateStartProcess = new DateTime();
        //    DateTime dateEndProcess = new DateTime();
        //    IPAddress[] ips = Dns.GetHostAddresses(Dns.GetHostName());
        //    ProcessResult processResult = new();
        //    string strResponse;
        //    do
        //    {
        //        dateStartProcess = DateTime.Now;
        //        try
        //        {
        //            await _commonService.ExcuteSqlStoredProcedure<object>("DeleteAllHiringProcesses", null, 0);
        //            string strDate = DateTime.Now.AddMonths(-4).ToString("yyyy-MM-dd");

        //            var strUrl = pUrl + pQuery.Replace("DateHere", strDate);

        //            WebRequest request = (HttpWebRequest)WebRequest.Create(strUrl);
        //            request.Method = "GET";
        //            request.ContentType = "application/json";

        //            using (var response = request.GetResponse())
        //            {
        //                processResult.ServiceResult = JsonConvert.SerializeObject(response);
        //                using (var strReader = response.GetResponseStream())
        //                {
        //                    var result = strReader.ToString();
        //                    using (StreamReader objReader = new StreamReader(strReader))
        //                    {
        //                        var objet = objReader.ReadToEnd();
        //                        List<HiringProcessSecopOneDto> listHiringProcess = System.Text.Json.JsonSerializer.Deserialize<List<HiringProcessSecopOneDto>>(objet);
        //                        List<HiringProcess> listAux = listHiringProcess.Select(la => (HiringProcess)la).ToList();   
        //                        _context.HiringProcesses.AddRange(listAux);

        //                    }
        //                }

        //            }
        //            processResult.ServiceUrl = pUrl;
        //            processResult.Result = ConstantHiringProcess.sucessfullRequest;
        //            dateEndProcess = DateTime.Now;
        //            processLog.Attempts = intCount;
        //            processLog.Process = ConstantHiringProcess.nameProcessSecopOne;
        //            processLog.ProcessStartDate = dateStartProcess;
        //            processLog.ProcesseEndDate = dateEndProcess;
        //            processLog.Success = true;
        //            processLog.Ip = ips[1].ToString();
        //            processLog.ProcessResult = JsonConvert.SerializeObject(processResult);
        //            processLog.IdUserCreate = GetIdUser();
        //            processLog.DateCreate = DateTime.Now;
        //            strResponse = "Exitoso";
        //            //_context.ProcessLogs.Add(processLog);     
        //            break;
        //        }
        //        catch (Exception ex)
        //        {
        //            processLog = new();
        //            lProcessLog = new();

        //            intCount++;
        //            processResult.ServiceUrl = pUrl;
        //            processResult.Result = ConstantHiringProcess.badRequest;
        //            dateEndProcess = DateTime.Now;
        //            processLog.Attempts = intCount;
        //            processLog.Process = ConstantHiringProcess.nameProcessSecopOne;
        //            processLog.ProcessStartDate = dateStartProcess;
        //            processLog.ProcesseEndDate = dateEndProcess;
        //            processLog.Success = true;
        //            processLog.Ip = ips[1].ToString();
        //            processResult.ProcessError = JsonConvert.SerializeObject(ex);
        //            processLog.ProcessResult = JsonConvert.SerializeObject(processResult);
        //            processLog.IdUserCreate = GetIdUser();
        //            processLog.DateCreate = DateTime.Now;
        //            strResponse = "Fallido";
        //            //_context.ProcessLogs.Add(processLog);
        //            lProcessLog.Add(processLog);

        //            _ = await SaveProcessLog(lProcessLog);
        //        }
        //    } while (intCount < 3);
        //    await _context.SaveChangesAsync(); 
        //    return strResponse;
        //}

        public async Task<IResponse> DeleteAllHiringProcesses()
        {
            var r = (StoreProcedureLiteResponse) await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("DeleteAllHiringProcesses", null, 0);
            string strResponse = r.Result.Equals("OK") ? "Exitoso" : "Fallido";
            return new Response<object>(null, strResponse);
        }

        public async Task<IResponse> GetHiringProcessesSecopOne(string pUrl, string pQuery)
        {
            int intCount = 1;
            List<HiringProcess> listAux = new();
            ProcessResult processResult = new();
            string strResponse;
            var success = true;
            do
            {
                DateTime dateStartProcess = DateTime.Now;
                DateTime dateEndProcess;
                try
                {
                    //_ = await _commonService.ExcuteSqlStoredProcedure<object>("DeleteAllHiringProcesses", null, 0).ConfigureAwait(false);

                    string strDate = DateTime.Now.AddMonths(-4).ToString("yyyy-MM-dd");

                    var strUrl = pUrl + pQuery.Replace("DateHere", strDate);

                    var response = await _httpClient.GetAsync(strUrl);
                    processResult.ServiceResult = JsonConvert.SerializeObject(response);
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        List<HiringProcessSecopOneDto> listHiringProcess = JsonConvert.DeserializeObject<List<HiringProcessSecopOneDto>>(content);
                        listAux = listHiringProcess.Select(la => (HiringProcess)la).ToList();
                    }
                    else { throw new Exception("Servicio no respondió 200"); }

                    //var i = listAux.Count / 10000;
                    //while (i >= 0) {
                    //var l = (from t in listAux select t).Skip(i * 10000).Take(10000).ToList();
                    var r = await SaveHiringProcess(listAux).ConfigureAwait(false);
                    if (!r.ToString().Equals("OK"))
                        throw new Exception("Falló el guardar los procesos de contratación en la base de datos");
                    //i--;
                    //}
                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    _ = await _commonService.SetProcessLog(intCount, ConstantHiringProcess.nameProcessSecopOne, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false);
                    break;
                }
                catch (Exception ex)
                {
                    success = false;
                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.badRequest;
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    _ = await _commonService.SetProcessLog(intCount, ConstantHiringProcess.nameProcessSecopOne, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false);
                    intCount++;
                }
            } while (intCount < 4);

            return new Response<object>(null, strResponse);
        }

        public async Task<IResponse> GetHiringProcessesSecopTwo(string pUrl, string pQuery)
        {
            int intCount = 1;
            List<HiringProcess> listAux;
            ProcessResult processResult = new();
            string strResponse;
            var success = true;
            do
            {
                DateTime dateStartProcess = DateTime.Now;
                DateTime dateEndProcess;
                try
                {
                    string currentDate = DateTime.Now.ToString("yyyy-MM-dd");
                    string currentDateless3 = DateTime.Now.AddDays(-3).ToString("yyyy-MM-dd");

                    var strUrl = pUrl + pQuery.Replace("CurrentDate-3", currentDateless3).Replace("CurrentDate", currentDate);

                    var response = await _httpClient.GetAsync(strUrl);
                    processResult.ServiceResult = JsonConvert.SerializeObject(response);
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        List<HiringProcessSecopTwoDto> listHiringProcess = JsonConvert.DeserializeObject<List<HiringProcessSecopTwoDto>>(content);
                        listAux = listHiringProcess.Select(la => (HiringProcess)la).ToList();
                    }
                    else { throw new Exception("Servicio no respondió 200"); }

                    var r = await SaveHiringProcess(listAux).ConfigureAwait(false);
                    if (!r.ToString().Equals("OK"))
                        throw new Exception("Falló el guardar los procesos de contratación en la base de datos");

                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    _ = await _commonService.SetProcessLog(intCount, ConstantHiringProcess.nameProcessSecopTwo, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false);
                    break;
                }
                catch (Exception ex)
                {
                    success = false;
                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.badRequest;
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    _ = await _commonService.SetProcessLog(intCount, ConstantHiringProcess.nameProcessSecopTwo, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false);
                    intCount++;
                }
            } while (intCount < 4);
            return new Response<object>(null, strResponse);
        }

        private async Task<object> SaveHiringProcess(object hiringProcess)
        {
            string json = JsonConvert.SerializeObject(hiringProcess);
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@hiringProcessJson", json)
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetHiringProcess", parameterList, 0).ConfigureAwait(false);
            return result.Result;
        }

        public async Task<IResponse> SetHiringProcessCompanyOffers()
        {
            int intCount = 1;
            DateTime dateStartProcess = new DateTime();
            DateTime dateEndProcess = new DateTime();
            IPAddress[] ips = Dns.GetHostAddresses(Dns.GetHostName());
            ProcessResult processResult = new();
            string strResponse;
            var success = true;
            do
            {
                dateStartProcess = DateTime.Now;
                try
                {
                    var r = await SaveHiringProcessCompanyOffers();
                    if (!r.ToString().Equals("OK"))
                        throw new Exception("Falló el procesar ofertas de procesos de contratación por interes, en la base de datos");

                    processResult.ServiceUrl = null;
                    processResult.Result = ConstantHiringProcess.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    _ = await _commonService.SetProcessLog(intCount, ConstantHiringProcess.nameHiringProcessCompanyOffers, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false);
                    intCount = 4;
                }
                catch (Exception ex)
                {
                    success = false;
                    processResult.ServiceUrl = null;
                    processResult.Result = ConstantHiringProcess.badRequest;
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    _ = await _commonService.SetProcessLog(intCount, ConstantHiringProcess.nameHiringProcessCompanyOffers, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false);
                    intCount++;
                }
            } while (intCount < 4);
            return new Response<object>(null, strResponse);
        }

        private async Task<object> SaveHiringProcessCompanyOffers()
        {
            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetHiringProcessCompanyOffers", null, 0);
            return result.Result;
        }

        public async Task<Object> GetProcessPurchaseById(int idProcess)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idProcess", idProcess == 0 ? 0:idProcess)
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetProcessPurchaseByFilter", parameterList);
            return records;
        }

        public async Task<IResponse> GetHiringProcessActualStages()
        {
            var result = (List<HiringProcessesStageDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessesStageDto>("GetHiringProcessesActualStage", null, 1);

            return new Response<List<HiringProcessesStageDto>>(result, null);
        }

        public async Task<IResponse> GetHiringProcessActualModes()
        {
            var result = (List<HiringProcessesModeDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessesModeDto>("GetHiringProcessesActualMode", null, 1);

            return new Response<List<HiringProcessesModeDto>>(result, null);
        }

        public async Task<IResponse> FilterGetHiringProcessProcessNumber(string processNumber)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@processNumber", processNumber)
            };

            var result = (List<HiringProcessProcessNumberDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessProcessNumberDto>("GetHiringProcessProcessNumber", parameterList, 1);

            return new Response<List<HiringProcessProcessNumberDto>>(result, null);
        }

        public async Task<IResponse> GetHiringProcessTotalCount()
        {
            var result = (HiringProcessTotalCountDto)await _commonService.ExcuteSqlStoredProcedure<HiringProcessTotalCountDto>("GetHiringProcessTotalCount", null, 2);

            return new Response<HiringProcessTotalCountDto>(result, null);
        }

        public async Task<object> GetHiringProcessTotalCountandSuma()
        {
            var result = await _commonService.ExcuteSqlStoredProcedure("GetHiringProcessTotalCountandSuma", null);

            return result;
        }

        public async Task<IResponse> GetHiringProcessesByFilter(HiringProcessByFilter filter)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@processNumber", filter.ProcessNumber),
                new SqlParameter("@UNSPSCCodes", filter.UNSPSCCodes),
                new SqlParameter("@entities", filter.Entities),
                new SqlParameter("@objectDescription", filter.ObjectDescription),
                new SqlParameter("@stages", filter.Stages),
                new SqlParameter("@modes",filter.Modes),
                new SqlParameter("@minValue", filter.MinValue),
                new SqlParameter("@maxValue", filter.MaxValue),
                new SqlParameter("@departments", filter.Departments),
                new SqlParameter("@municipalities", filter.Municipalities),
                new SqlParameter("@secopOne", filter.SecopOne)
            };

            var result = (List<HiringProcessFilterResult>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessFilterResult>("GetHiringProcessesByFilter", parameterList, 1);
            return new Response<List<HiringProcessFilterResult>>(result, null);
        }

        public async Task<IResponse> GetHiringProcessesById(int idHiringProcess)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@idHiringProcess", idHiringProcess)
            };

            var result = (HiringProcessFilterResultDetail)await _commonService.ExcuteSqlStoredProcedure<HiringProcessFilterResultDetail>("GetHiringProcessesById", parameterList, 2);
            return new Response<HiringProcessFilterResultDetail>(result, null);
        }

        public async Task<object> GetHiringProcessesByFilterforDownloadExcel(HiringProcessByFilter filter, string SheetName)
        {
            object byteFile = null;
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@processNumber", filter.ProcessNumber),
                new SqlParameter("@UNSPSCCodes", filter.UNSPSCCodes),
                new SqlParameter("@entities", filter.Entities),
                new SqlParameter("@objectDescription", filter.ObjectDescription),
                new SqlParameter("@stages", filter.Stages),
                new SqlParameter("@modes", filter.Modes),
                new SqlParameter("@minValue", filter.MinValue),
                new SqlParameter("@maxValue", filter.MaxValue),
                new SqlParameter("@departments", filter.Departments),
                new SqlParameter("@municipalities", filter.Municipalities),
                new SqlParameter("@secopOne", filter.SecopOne),
            };

            var result = await _commonService.ExcuteSqlStoredProcedure("GetHiringProcessesByFilterforExcel", parameterList);

            if (result != null && result.Rows.Count > 0)
            {
                byteFile = Helpers.Helpers.CreateExcelDynamicallybyDataTable(result, SheetName, false);
            }
            return byteFile;
        }

        public async Task<Object> GetModalitiesByCompanyIdForProcess(int idCompany)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idCompany", idCompany == 0 ? 0:idCompany),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetModalitiesByCompanyIdForProcess", parameterList);
            return records;
        }
    }
}

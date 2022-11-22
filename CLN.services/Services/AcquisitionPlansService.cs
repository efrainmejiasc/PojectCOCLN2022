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
using System.Data;
using Microsoft.Extensions.Configuration;
using CLN.services.Wrappers;
using CLN.model.Settings;
using Microsoft.Extensions.Options;

namespace CLN.services.Services
{
    public class AcquisitionPlansService : IAcquisitionPlansService
    {
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AcquisitionPlanSettings _acquisitionPlanSettings;
        public AcquisitionPlansService(IHttpContextAccessor httpContextAccessor, ICommonService commonService, IOptions<AcquisitionPlanSettings> acquisitionPlanSettings)
        {
            _httpContextAccessor = httpContextAccessor;
            _commonService = commonService;
            _acquisitionPlanSettings = acquisitionPlanSettings.Value;
        }
        public int GetIdUser()
        {
            return int.TryParse(_httpContextAccessor?.HttpContext?.User?.FindFirst("IdUser")?.Value, out int outValue) ? (int)outValue : 0;
        }

        /// <summary>
        /// Obtener planes de adquisicion SECOP I
        /// </summary>
        /// <param name="pUrl">Url SECOP I Header</param>
        /// <param name="pQuery">Query url SECOP I Header</param>
        /// <param name="pUrlDetail">Url SECOP I Detail</param>
        /// <param name="pQueryDetail">Query url SECOP I Detail</param>
        /// <returns></returns>
        public async Task<string> GetAcquisitionPlansSecopOne(string pUrl, string pQuery, string pUrlDetail, string pQueryDetail, int? anio)
        {
            int intCount = 1;
            List<AcquisitionPlans> listAuxHeader;
            List<AcquisitionPlans> listAuxDetail;
            List<AcquisitionPlans> listAux;
            DateTime dateStartProcess = new DateTime();
            DateTime dateEndProcess = new DateTime();
            IPAddress[] ips = Dns.GetHostAddresses(Dns.GetHostName());
            ProcessResult processResult = new();
            string strResponse;
            var success = true;
            string strDate = anio != null ? anio.ToString() : DateTime.Now.ToString("yyyy");
            var strUrl = pUrl + pQuery.Replace("CurrentYear", strDate);
            var mesesAnio = String.Format("'Enero {0}','Febrero {0}','Marzo {0}','Abril {0}','Mayo {0}','Junio {0}','Julio {0}','Agosto {0}','Septiembre {0}','Octubre {0}','Noviembre {0}','Diciembre {0}'", strDate);
            var strUrl2 = pUrlDetail + pQueryDetail.Replace("MesesAnio", mesesAnio);
            do
            {
                dateStartProcess = DateTime.Now;
                try
                {
                    await _commonService.ExcuteSqlStoredProcedure<object>("DeleteAllAcquisitionPlans", null, 0);

                    #region PaaHeader
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
                                List<AcquisitionPlansSecopOneDto> listAcquisitionPlans = System.Text.Json.JsonSerializer.Deserialize<List<AcquisitionPlansSecopOneDto>>(objet);
                                listAuxHeader = listAcquisitionPlans.Select(la => (AcquisitionPlans)la).ToList();
                            }
                        }
                    }
                    #endregion

                    if (listAuxHeader.Count > 0)
                    {
                        #region PaaDetail
                        listAux = new List<AcquisitionPlans>();
                        WebRequest request2 = (HttpWebRequest)WebRequest.Create(strUrl2);
                        request2.Method = "GET";
                        request2.ContentType = "application/json";
                        using (var response = request2.GetResponse())
                        {
                            processResult.ServiceResult = JsonConvert.SerializeObject(response);
                            using (var strReader = response.GetResponseStream())
                            {
                                var result = strReader.ToString();
                                using (StreamReader objReader = new StreamReader(strReader))
                                {
                                    var objet = objReader.ReadToEnd();
                                    List<AcquisitionPlansSecopOneDto> listAcquisitionPlans = System.Text.Json.JsonSerializer.Deserialize<List<AcquisitionPlansSecopOneDto>>(objet);
                                    listAuxDetail = listAcquisitionPlans.Select(la => (AcquisitionPlans)la).ToList();
                                    // foreach (var item in listAuxDetail)
                                    // {
                                    //    var headerAux = listAuxHeader.FirstOrDefault(x => x.IdPaa == item.Uid);
                                    //    if (headerAux != null)
                                    //    {
                                    //        item.IdPaa = headerAux.IdPaa;
                                    //        item.EntityName = headerAux.EntityName;
                                    //        item.Year = headerAux.Year;
                                    //        item.CreatedDate = headerAux.CreatedDate;
                                    //        item.LastEditDate = headerAux.LastEditDate;
                                    //        item.Department = headerAux.Department;
                                    //        item.City = headerAux.City;
                                    //        item.Location = headerAux.Location;
                                    //        item.ContactInfo = headerAux.ContactInfo;
                                    //        item.ContactEmail = headerAux.ContactEmail;
                                    //        item.ContactPhone = headerAux.ContactPhone;

                                    //        listAux.Add(item);
                                    //    }
                                    // }
                                    listAux = listAuxHeader;
                                }
                            }
                        }
                        #endregion

                        if (listAux.Count > 0)
                        {
                            var r = await SaveAcquisitionPlans(listAux).ConfigureAwait(false);
                            if (!r.ToString().Equals("OK"))
                                throw new Exception("Falló el guardar los planes de adquisicion en la base de datos");
                        }
                    }

                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantAcquisitionPlans.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, ConstantAcquisitionPlans.nameProcessSecopOne, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false); ;
                    intCount = 4;
                }
                catch (Exception ex)
                {
                    success = false;
                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.badRequest;
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, ConstantAcquisitionPlans.nameProcessSecopOne, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false); ;
                    intCount++;
                }
            } while (intCount < 4);

            return strResponse;
        }

        /// <summary>
        /// Obtener planes de adquisicion SECOP II
        /// </summary>
        /// <param name="pUrl">Url SECOP I Header</param>
        /// <param name="pQuery">Query url SECOP I Header</param>
        /// <param name="pUrlDetail">Url SECOP I Detail</param>
        /// <param name="pQueryDetail">Query url SECOP I Detail</param>
        /// <returns></returns>
        public async Task<string> GetAcquisitionPlansSecopTwo(string pUrl, string pQuery, string pUrlDetail, string pQueryDetail, int? anio)
        {
            int intCount = 1;
            List<AcquisitionPlans> listAuxHeader;
            List<AcquisitionPlans> listAuxDetail;
            List<AcquisitionPlans> listAux;
            DateTime dateStartProcess = new DateTime();
            DateTime dateEndProcess = new DateTime();
            IPAddress[] ips = Dns.GetHostAddresses(Dns.GetHostName());
            ProcessResult processResult = new();
            string strResponse;
            var success = true;
            string strDate = anio != null ? anio.ToString() : DateTime.Now.ToString("yyyy");
            var strUrl = pUrl + pQuery.Replace("CurrentYear", strDate);
            var strUrl2 = pUrlDetail + pQueryDetail.Replace("CurrentYear", strDate);
            do
            {
                dateStartProcess = DateTime.Now;
                try
                {
                    #region PaaHeader
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
                                List<AcquisitionPlansSecopTwoDto> listAcquisitionPlans = System.Text.Json.JsonSerializer.Deserialize<List<AcquisitionPlansSecopTwoDto>>(objet);
                                listAuxHeader = listAcquisitionPlans.Select(la => (AcquisitionPlans)la).ToList();
                            }
                        }
                    }
                    #endregion

                    if (listAuxHeader.Count > 0)
                    {
                        #region PaaDetail
                        //var mesesAnio = String.Format("'Enero {0}','Febrero {0}','Marzo {0}','Abril {0}','Mayo {0}','Junio {0}','Julio {0}','Agosto {0}','Septiembre {0}','Octubre {0}','Noviembre {0}','Diciembre {0}'", strDate);
                        //var strUrl2 = pUrlDetail + pQueryDetail.Replace("MesesAnio", mesesAnio);
                        listAux = new List<AcquisitionPlans>();
                        WebRequest request2 = (HttpWebRequest)WebRequest.Create(strUrl2);
                        request2.Method = "GET";
                        request2.ContentType = "application/json";
                        using (var response = request2.GetResponse())
                        {
                            processResult.ServiceResult = JsonConvert.SerializeObject(response);
                            using (var strReader = response.GetResponseStream())
                            {
                                var result = strReader.ToString();
                                using (StreamReader objReader = new StreamReader(strReader))
                                {
                                    var objet = objReader.ReadToEnd();
                                    List<AcquisitionPlansSecopTwoDto> listAcquisitionPlans = System.Text.Json.JsonSerializer.Deserialize<List<AcquisitionPlansSecopTwoDto>>(objet);
                                    listAuxDetail = listAcquisitionPlans.Select(la => (AcquisitionPlans)la).ToList();
                                    foreach (var item in listAuxDetail)
                                    {
                                        var headerAux = listAuxHeader.FirstOrDefault(x => x.IdPaa == item.IdPaa);
                                        if (headerAux != null)
                                        {
                                            item.EntityName = headerAux.EntityName;
                                            item.Year = headerAux.Year;
                                            item.CreatedDate = headerAux.CreatedDate;
                                            item.LastEditDate = headerAux.LastEditDate;
                                            item.Department = headerAux.Department;
                                            item.City = headerAux.City;
                                            item.Location = headerAux.Location;
                                            item.ContactInfo = headerAux.ContactInfo;
                                            item.ContactEmail = headerAux.ContactEmail;
                                            item.ContactPhone = headerAux.ContactPhone;

                                            listAux.Add(item);
                                        }
                                    }
                                }
                            }
                        }
                        #endregion

                        if (listAux.Count > 0)
                        {
                            var r = await SaveAcquisitionPlans(listAux).ConfigureAwait(false);
                            if (!r.ToString().Equals("OK"))
                                throw new Exception("Falló el guardar los planes de adquisicion en la base de datos");
                        }
                    }

                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantAcquisitionPlans.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, ConstantAcquisitionPlans.nameProcessSecopTwo, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false); ;
                    intCount = 4;
                }
                catch (Exception ex)
                {
                    success = false;
                    processResult.ServiceUrl = pUrl;
                    processResult.Result = ConstantHiringProcess.badRequest;
                    processResult.ProcessError = JsonConvert.SerializeObject(ex);
                    dateEndProcess = DateTime.Now;
                    strResponse = "Fallido";

                    await _commonService.SetProcessLog(intCount, ConstantAcquisitionPlans.nameProcessSecopTwo, dateStartProcess, dateEndProcess, success, processResult, GetIdUser()).ConfigureAwait(false); ;
                    intCount++;
                }
            } while (intCount < 4);

            return strResponse;
        }

        /// <summary>
        /// Guardar planes de adquisicion en la base de datos
        /// </summary>
        /// <param name="acquisitionPlans"></param>
        /// <returns></returns>
        private async Task<object> SaveAcquisitionPlans(object acquisitionPlans)
        {
            string json = JsonConvert.SerializeObject(acquisitionPlans);
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@acquisitionPlansJson", json)
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetAcquisitionPlans", parameterList, 0).ConfigureAwait(false); ;
            return result.Result;
        }

        public async Task<string> SetAcquisitionPlansCompanyOffers()
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
                    string currentDate = DateTime.Now.ToString("yyyy-MM-dd");

                    var r = await SaveOffersAcquisitionPlans();
                    if (!r.ToString().Equals("OK"))
                        throw new Exception("Falló el procesar ofertas de planes de adquisicion por interes, en la base de datos");

                    processResult.ServiceUrl = null;
                    processResult.Result = ConstantAcquisitionPlans.sucessfullRequest;
                    dateEndProcess = DateTime.Now;
                    strResponse = "Exitoso";

                    await _commonService.SetProcessLog(intCount, ConstantAcquisitionPlans.nameOffersAcquisitionPlans, dateStartProcess, dateEndProcess, success, processResult, GetIdUser());
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

                    await _commonService.SetProcessLog(intCount, ConstantAcquisitionPlans.nameOffersAcquisitionPlans, dateStartProcess, dateEndProcess, success, processResult, GetIdUser());
                    intCount++;
                }
            } while (intCount < 4);
            return strResponse;
        }

        private async Task<object> SaveOffersAcquisitionPlans()
        {
            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetAcquisitionPlansCompanyOffers", null, 0);
            return result.Result;
        }

        public async Task<Object> GetAcquisitionPurchaseById(int idAcquisition)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idAcquisition", idAcquisition == 0 ? 0:idAcquisition)
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetAcquisitionPurchaseByFilter", parameterList);
            return records;
        }

        public async Task<Object> GetUNSPSCClassProducts(string classProduct)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@classProduct", classProduct == null ? "clase_producto" : classProduct)
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetUNSPSCClassProducts", parameterList);
            return records;
        }

        public async Task<IResponse> GetAcquisitionPlansMode()
        {
            var result = (List<HiringProcessesModeDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessesModeDto>("GetPublicAcquisitionPlansMode", null, 1);
            return new Response<List<HiringProcessesModeDto>>(result, null);
        }

        public async Task<IResponse> FilterCompaniesNameWithAcquisitionPlans(string companyNameFilter)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@companyNameFilter", companyNameFilter)
              };

            var result = (List<HiringProcessCompanyNameDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessCompanyNameDto>("GetCompaniesNameWithAcquisitionPlans", parameterList, 1);
            return new Response<List<HiringProcessCompanyNameDto>>(result, null);
        }

        /// <summary>
        /// Obtener Planes de adquisicion por filtro dinamico
        /// </summary>
        /// <param name="filter">Filtro dinamico</param>
        /// <returns></returns>
        public async Task<Object> GetAcquisitionPlansByFilter(AcquisitionPlansByFilter filter, bool isXlsFormat = false)
        {

            filter.dateInicial = setFechaString(filter.dateInicial, 1);
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@categoriesCodes", filter.UNSPSCCodes == null ? string.Empty:filter.UNSPSCCodes),
                    new SqlParameter("@modality", filter.modality == null ? string.Empty:filter.modality),
                    new SqlParameter("@minValue", filter.minValue == null ? string.Empty:filter.minValue),
                    new SqlParameter("@maxValue", filter.maxValue == null ? string.Empty:filter.maxValue),
                    new SqlParameter("@dateInicial", filter.dateInicial == null ? string.Empty:filter.dateInicial),
                    new SqlParameter("@entity", filter.entity == null ? string.Empty:filter.entity),
                    new SqlParameter("@dept", filter.dept == null ? string.Empty:filter.dept),
                    new SqlParameter("@munic", filter.munic == null ? string.Empty:filter.munic),
                    new SqlParameter("@isXlsFormat", isXlsFormat == true ? 1 : 0)
              };

            var records = await _commonService.ExcuteSqlStoredProcedure("GetAcquisitionPlansByFilter", parameterList);
            //var result = (List<CompanyOffersByFilter>)await _commonService.ExcuteSqlStoredProcedure<CompanyOffersByFilter>("GetProcessCompanyByFilter", parameterList, 1);
            //return new Response<List<CompanyOffersByFilter>>(result, null);
            return records;
        }

        /// <summary>
        /// Consulta un listado de planes de adquisicion por filtro dinámico, y genera un excel a partir de la información consultada
        /// </summary>
        /// <param name="filter">filtro dinámico</param>
        /// <returns>Arreglo de bytes con la información del archivo</returns>
        public async Task<DescargarExcel> ExportarAcquisitionPlansExcel(AcquisitionPlansByFilter filter)
        {
            object byteFile = null;

            var dt = (DataTable)await GetAcquisitionPlansByFilter(filter, true);
            var filename = $"{_acquisitionPlanSettings.FileName} {DateTime.Now:dd-MM-yyyy}{_acquisitionPlanSettings.FileExtension}";

            if (dt != null && dt.Rows.Count > 0)
            {
                byteFile = Helpers.Helpers.CreateExcelDynamicallybyDataTable(dt, _acquisitionPlanSettings.SheetName, false);
            }           

            DescargarExcel Descarga = new();
            Descarga.Archivo = (byte[])byteFile;
            Descarga.NombreArchivo = Path.GetFileName(filename);
            return Descarga;
        }

        /// <summary>
        /// Obtener un plan de adquisicion de acuerdo al Id Seleccionado
        /// </summary>
        /// <param name="idAcquisition">Id Seleccionado del Plan de adquisicion</param>
        /// <returns></returns>
        public async Task<Object> GetAcquisitionPlanById(int idAcquisition)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idAcquisition", idAcquisition == 0 ? 0:idAcquisition)
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetAcquisitionPlanById", parameterList);
            return records;
        }

        /// <summary>
        /// Obtener total de registros de planes de adquisicion
        /// </summary>
        /// <returns></returns>
        public async Task<Object> GetAcquisitionPlansTotalCount()
        {
            var records = await _commonService.ExcuteSqlStoredProcedure("GetAcquisitionPlansTotalCount", null);
            return records;
        }

        #region MetodosPrivados
        string setFechaString(string date, int iniFin)
        {
            if (date != null && date != string.Empty)
            {
                if (iniFin == 2)
                {
                    DateTime fecha = Convert.ToDateTime(date);
                    DateTime fechafin = Convert.ToDateTime(date).AddDays(1);
                    date = fechafin.ToString();
                }
                string year = Convert.ToDateTime(date).Year.ToString();
                string month = Convert.ToDateTime(date).Month.ToString();
                string day = Convert.ToDateTime(date).Day.ToString();

                return date = "'" + year + "-" + month + "-" + day + "'";

            }
            else
            {
                return null;
            }
        }
        #endregion

        public async Task<Object> GetEntitiesByIdCompanyForAcquisition(int idCompany)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idCompany", idCompany == 0 ? 0:idCompany),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetEntitiesByIdCompanyForAcquisition", parameterList);
            return records;
        }

        public async Task<Object> GetModalitiesByCompanyIdForAcquisition(int idCompany)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idCompany", idCompany == 0 ? 0:idCompany),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetModalitiesByCompanyIdForAcquisition", parameterList);
            return records;
        }
    }
}

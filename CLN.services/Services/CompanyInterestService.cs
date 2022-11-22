using CLN.model.APIModels;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Helpers.Constants;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class CompanyInterestService : ICompanyInterestService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
        private IConfiguration _configuracion { get; }

        public CompanyInterestService(CLNContext context, ICommonService commonService, IConfiguration configuracion)
        {
            _context = context;
            _commonService = commonService;
            _configuracion = configuracion;
        }

        public async Task<IResponse> GetHiringProcessesStage()
        {
            var result = (List<HiringProcessesStageDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessesStageDto>("GetPublicHiringProcessesStage", null, 1);

            return new Response<List<HiringProcessesStageDto>>(result, null);
        }

        public async Task<IResponse> GetHiringProcessesMode()
        {
            var result = (List<HiringProcessesModeDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessesModeDto>("GetPublicHiringProcessesMode", null, 1);

            return new Response<List<HiringProcessesModeDto>>(result, null);
        }

        public async Task<IResponse> FilterCompaniesNameWithHiringProcess(string companyNameFilter)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@companyNameFilter", companyNameFilter)
              };

            var result = (List<HiringProcessCompanyNameDto>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessCompanyNameDto>("GetCompaniesNameWithHiringProcess", parameterList, 1);

            return new Response<List<HiringProcessCompanyNameDto>>(result, null);
        }

        public async Task<IResponse> FilterProcessByObject(string objectFilter)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@objFilter", objectFilter)
              };

            var result = (List<HiringProcessByObjectWord>)await _commonService.ExcuteSqlStoredProcedure<HiringProcessByObjectWord>("GetFilterProcessByObjectWord", parameterList, 1);

            return new Response<List<HiringProcessByObjectWord>>(result, null);
        }

        public async Task<IResponse> GetHiringProcessMaximumValue()
        {
            var result = (HiringProcessMaximunValueDto)await _commonService.ExcuteSqlStoredProcedure<HiringProcessMaximunValueDto>("GetMaximumValueHiringProcess", null, 2);

            return new Response<HiringProcessMaximunValueDto>(result, null);
        }

        public async Task<IResponse> GetCompanyInterest(int companyId)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@companyId", companyId)
              };

            var result = (List<CompanyInterestDto>)await _commonService.ExcuteSqlStoredProcedure<CompanyInterestDto>("GetCompanyInterest", parameterList, 1);

            return new Response<List<CompanyInterestDto>>(result, null);
        }

        public async Task<IResponse> CreateCompanyInterest(CompanyInterestDto companyInterest, string UserEmail)
        {
            var companyInteresJson = JsonConvert.SerializeObject((CompanyInterestLiteDto)companyInterest);

            var companyInterestDepartemtJson = JsonConvert.SerializeObject(companyInterest.Departments);
            var companyInterestMunipalityJson = JsonConvert.SerializeObject(companyInterest.Municipalities);
            var companyInterestStageJson = JsonConvert.SerializeObject(companyInterest.Stages);
            var companyInterestModeJson = JsonConvert.SerializeObject(companyInterest.Modes);
            var companyInterestClassifierJson = JsonConvert.SerializeObject(companyInterest.Classifiers);
            var companyInterestMonthJson = JsonConvert.SerializeObject(companyInterest.Months);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@companyInterestJson", companyInteresJson),
                new SqlParameter("@companyInterestDepartemtJson", companyInterestDepartemtJson.Equals("null") ? null : companyInterestDepartemtJson),
                new SqlParameter("@companyInterestMunipalityJson", companyInterestMunipalityJson.Equals("null") ? null : companyInterestMunipalityJson),
                new SqlParameter("@companyInterestStageJson", companyInterestStageJson.Equals("null") ? null : companyInterestStageJson),
                new SqlParameter("@companyInterestModeJson", companyInterestModeJson.Equals("null") ? null : companyInterestModeJson),
                new SqlParameter("@companyInterestClassifierJson", companyInterestClassifierJson.Equals("null") ? null : companyInterestClassifierJson),
                new SqlParameter("@companyInterestMonthJson", companyInterestMonthJson.Equals("null") ? null : companyInterestMonthJson),
                new SqlParameter("@user", UserEmail)
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateCompanyInterest", parameterList, 2);

            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<IResponse> UpdateCompanyInterest(CompanyInterestDto companyInterest, string UserEmail)
        {
            var companyInteresJson = JsonConvert.SerializeObject((CompanyInterestLiteDto)companyInterest);

            var companyInterestDepartemtJson = JsonConvert.SerializeObject(companyInterest.Departments);
            var companyInterestMunipalityJson = JsonConvert.SerializeObject(companyInterest.Municipalities);
            var companyInterestStageJson = JsonConvert.SerializeObject(companyInterest.Stages);
            var companyInterestModeJson = JsonConvert.SerializeObject(companyInterest.Modes);
            var companyInterestClassifierJson = JsonConvert.SerializeObject(companyInterest.Classifiers);
            var companyInterestMonthJson = JsonConvert.SerializeObject(companyInterest.Months);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@companyInterestJson", companyInteresJson),
                new SqlParameter("@companyInterestDepartemtJson", companyInterestDepartemtJson.Equals("null") ? null : companyInterestDepartemtJson),
                new SqlParameter("@companyInterestMunipalityJson", companyInterestMunipalityJson.Equals("null") ? null : companyInterestMunipalityJson),
                new SqlParameter("@companyInterestStageJson", companyInterestStageJson.Equals("null") ? null : companyInterestStageJson),
                new SqlParameter("@companyInterestModeJson", companyInterestModeJson.Equals("null") ? null : companyInterestModeJson),
                new SqlParameter("@companyInterestClassifierJson", companyInterestClassifierJson.Equals("null") ? null : companyInterestClassifierJson),
                new SqlParameter("@companyInterestMonthJson", companyInterestMonthJson.Equals("null") ? null : companyInterestMonthJson),
                new SqlParameter("@user", UserEmail)
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("UpdateCompanyInterest", parameterList, 2);

            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<IResponse> GetCompanyInterestNotification(int companyId)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@companyId", companyId)
            };

            var result = (List<CompanyInterestNotificationDto>)await _commonService.ExcuteSqlStoredProcedure<CompanyInterestNotificationDto>("GetCompanyInterestNotification", parameterList, 1);

            return new Response<List<CompanyInterestNotificationDto>>(result, null);
        }

        public async Task<IResponse> SetCompanyInterestNotification(List<CompanyInterestNotificationDto> lCompanyInterestNotification, string UserEmail)
        {
            var companyInterestNotificationJson = JsonConvert.SerializeObject(lCompanyInterestNotification);

            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@companyInterestNotificationJson", companyInterestNotificationJson),
                new SqlParameter("@user", UserEmail)
            };

            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetCompanyInterestNotification", parameterList, 2);

            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<IResponse> GetContractModalities()
        {
            var result = (List<ContractModality>)await _commonService.ExcuteSqlStoredProcedure<ContractModality>("GetContractModalities", null, 1);

            return new Response<List<ContractModality>>(result, null);
        }

        public async Task<Object> GetCompanies()
        {
            var result = await _commonService.ExcuteSqlStoredProcedure("GetCompanies", null);

            return result;
        }

        public async Task<Object> GetProcessCompanyByFilter(CompanyOffersByFilter filter)
        {
            filter.dateInicial = setFechaString(filter.dateInicial, 1);
            filter.dateFin = setFechaString(filter.dateFin, 2);
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@entity", filter.entity == null ? string.Empty : filter.entity),
                    new SqlParameter("@dept", filter.dept == null ? string.Empty : filter.dept),
                    new SqlParameter("@munic", filter.munic == null ? string.Empty : filter.munic),
                    new SqlParameter("@processNumber", filter.processNumber == null ? string.Empty : filter.processNumber),
                    new SqlParameter("@dateInicial", filter.dateInicial == null ? string.Empty:filter.dateInicial),
                    new SqlParameter("@dateFin", filter.dateFin == null ? string.Empty:filter.dateFin),
                    new SqlParameter("@minValue", filter.minValue == null ? string.Empty : filter.minValue),
                    new SqlParameter("@maxValue", filter.maxValue == null ? string.Empty : filter.maxValue),
                    new SqlParameter("@desc", filter.objContratar == null ? string.Empty : filter.objContratar),
                    new SqlParameter("@modality", filter.modality == null ? string.Empty : filter.modality),
                    new SqlParameter("@company", filter.company == null ? string.Empty : filter.company),
              };

            var records = await _commonService.ExcuteSqlStoredProcedure("GetProcessCompanyByFilter", parameterList);
            //var result = (List<CompanyOffersByFilter>)await _commonService.ExcuteSqlStoredProcedure<CompanyOffersByFilter>("GetProcessCompanyByFilter", parameterList, 1);
            //return new Response<List<CompanyOffersByFilter>>(result, null);
            return records;
        }
        public async Task<Object> GetAcquisitionsCompanyByFilter(CompanyOffersByFilter filter)
        {

            filter.dateInicial = setFechaString(filter.dateInicial, 1);
            filter.dateFin = setFechaString(filter.dateFin, 2);
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@entity", filter.entity == null ? string.Empty:filter.entity),
                    new SqlParameter("@dept", filter.dept == null ? string.Empty:filter.dept),
                    new SqlParameter("@munic", filter.munic == null ? string.Empty:filter.munic),
                    new SqlParameter("@dateInicial", filter.dateInicial == null ? string.Empty:filter.dateInicial),
                    new SqlParameter("@dateFin", filter.dateFin == null ? string.Empty:filter.dateFin),
                    new SqlParameter("@minValue", filter.minValue == null ? string.Empty:filter.minValue),
                    new SqlParameter("@maxValue", filter.maxValue == null ? string.Empty:filter.maxValue),
                    new SqlParameter("@desc", filter.objContratar == null ? string.Empty:filter.objContratar),
                    new SqlParameter("@modality", filter.modality == null ? string.Empty:filter.modality),
                    new SqlParameter("@company", filter.company == null ? string.Empty:filter.company),
              };

            var records = await _commonService.ExcuteSqlStoredProcedure("GetAcquisitionsCompanyByFilter", parameterList);
            //var result = (List<CompanyOffersByFilter>)await _commonService.ExcuteSqlStoredProcedure<CompanyOffersByFilter>("GetProcessCompanyByFilter", parameterList, 1);
            //return new Response<List<CompanyOffersByFilter>>(result, null);
            return records;
        }

        /// <summary>
        /// Consulta un listado de procesos posibles por filtro dinámico, y genera un excel a partir de la información consultada
        /// </summary>
        /// <param name="filter">filtro dinámico</param>
        /// <returns>Arreglo de bytes con la información del archivo</returns>
        public async Task<DescargarExcel> ExportarProcessExcel(CompanyOffersByFilter filter)
        {
            var lstLog = await GetProcessCompanyByFilter(filter);
            string lstLogJson = JsonConvert.SerializeObject(lstLog);
            DataTable dt = JsonConvert.DeserializeObject<DataTable>(lstLogJson);
            string Archivo = EscribirArchivo(dt);
            byte[] bytesArchivo = await ObtenerBytesArchivo(Archivo);
            DescargarExcel Descarga = new();
            Descarga.Archivo = bytesArchivo;
            Descarga.NombreArchivo = Path.GetFileName(Archivo);
            return Descarga;
        }

        /// <summary>
        /// Consulta un listado de procesos adquisiciones por filtro dinámico, y genera un excel a partir de la información consultada
        /// </summary>
        /// <param name="filter">filtro dinámico</param>
        /// <returns>Arreglo de bytes con la información del archivo</returns>
        public async Task<DescargarExcel> ExportarAcquisitionsExcel(CompanyOffersByFilter filter)
        {
            var lstLog = await GetAcquisitionsCompanyByFilter(filter);
            string lstLogJson = JsonConvert.SerializeObject(lstLog);
            DataTable dt = JsonConvert.DeserializeObject<DataTable>(lstLogJson);
            string Archivo = EscribirArchivo(dt);
            byte[] bytesArchivo = await ObtenerBytesArchivo(Archivo);
            DescargarExcel Descarga = new();
            Descarga.Archivo = bytesArchivo;
            Descarga.NombreArchivo = Path.GetFileName(Archivo);
            return Descarga;
        }

        /// <summary>
        /// Convierte un datatable un un archivo de excel y lo escribe en disco
        /// </summary>
        /// <param name="dt">Dataset con la información para el archivo</param>
        /// <returns>nombre del archivo creado</returns>
        private string EscribirArchivo(DataTable dt)
        {
            string Archivo = string.Empty;
            XLWorkbook wb = new XLWorkbook();
            string NombreArchivo = ObtenerRutaArchivo();
            string NombreHoja = Path.GetFileNameWithoutExtension(NombreArchivo);
            wb.Worksheets.Add(dt, NombreHoja);
            string RutaDirectorio = "~//App_Data";
            if (!string.IsNullOrEmpty(RutaDirectorio))
            {
                CrearEliminarDirectorio(RutaDirectorio);
                Archivo = Path.Combine(RutaDirectorio, NombreArchivo);
                if (File.Exists(Archivo))
                {
                    File.Delete(Archivo);
                }
                wb.SaveAs(Archivo);
            }

            return Archivo;
        }
        public string ObtenerRutaArchivo()
        {
            string NombreArchivo = string.Empty;
            string Nombre = _configuracion.GetValue<string>("ArchivoXLS:NombreArchivo");
            string Extension = _configuracion.GetValue<string>("ArchivoXLS:Extension");
            NombreArchivo = string.Format("{0}{1}", Nombre, DateTime.Now.ToShortDateString().Replace("/", ""));
            NombreArchivo = string.Format("{0}.{1}", NombreArchivo, Extension);
            return NombreArchivo;
        }
        /// <summary>
        /// Lee el archivo indicado, obtiene sus bytes y elimina el archivo
        /// </summary>
        /// <param name="Archivo">Contiene el path completo para leer el archivo</param>
        /// <returns>arreglo de bytes</returns>
        private async Task<byte[]> ObtenerBytesArchivo(string Archivo)
        {
            byte[] bytesArchivo = null;
            if (File.Exists(Archivo))
            {
                bytesArchivo = await File.ReadAllBytesAsync(Archivo);
                File.Delete(Archivo);
                CrearEliminarDirectorio(Path.GetDirectoryName(Archivo));
            }
            return bytesArchivo;
        }
        /// <summary>
        /// Valida si existe el directorio lo elimina, en caso contrario lo crea
        /// </summary>
        /// <param name="RutaDirectorio">Ruta del directorio a validar</param>
        private void CrearEliminarDirectorio(string RutaDirectorio)
        {
            if (!Directory.Exists(RutaDirectorio))
            {
                Directory.CreateDirectory(RutaDirectorio);
            }
            else
            {
                Directory.Delete(RutaDirectorio);
            }
        }

        public async Task<Object> GetEntitiesByIdCompany(int idCompany)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idCompany", idCompany == 0 ? 0:idCompany),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetEntitiesByIdCompany", parameterList);
            return records;
        }

        public async Task<Object> GetEntitiesByIdCompanyForProcess(int idCompany)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@idCompany", idCompany == 0 ? 0:idCompany),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetEntitiesByIdCompanyForProcess", parameterList);
            return records;
        }

        public string setFechaString(string date, int iniFin)
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

        public async Task<IResponse> GetAcquisitionPlanMaximumValue()
        {
            var result = (AcquisitionPlanMaximunValueDto)await _commonService.ExcuteSqlStoredProcedure<AcquisitionPlanMaximunValueDto>("GetMaximumValueAcquisitionPlan", null, 2);

            return new Response<AcquisitionPlanMaximunValueDto>(result, null);
        }
    }
}

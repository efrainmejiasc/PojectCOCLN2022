using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CLN.model.APIModels;
using CLN.model.Settings;
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

namespace CLN.services.Services
{
    public class CPCIIUUNSPSCCLNCorrelativeService : ICPCIIUUNSPSCCLNCorrelativeService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
        private readonly AppSettings _settings;
        private readonly CorrelativeSettings _correlativeSettings;
        private readonly ICustomCache _cache;
        private readonly ISequentialGuidGenerator _guidGenerator;
        private readonly ConsolidatedSettings _consolidatedSettings;
        public CPCIIUUNSPSCCLNCorrelativeService(CLNContext context
            , ICommonService commonService
            , IOptions<AppSettings> settingsOptions
            , IOptions<CorrelativeSettings> correlativeSettings
            , ICustomCache cache
            , ISequentialGuidGenerator guidGenerator
            , IOptions<ConsolidatedSettings> consolidatedSettings)
        {
            _context = context;
            _commonService = commonService;
            _settings = settingsOptions.Value;
            _correlativeSettings = correlativeSettings.Value;
            _cache = cache;
            _guidGenerator = guidGenerator;
            _consolidatedSettings = consolidatedSettings.Value;
        }

        public async Task<IResponse> ValidateFile(IList<IFormFile> files)
        {
            Stream fileStream = Stream.Null;
            ValidationFileResult vResult = new();
            string fileName = string.Empty;

            if (files == null || files.Count == 0)
                return new Response<bool>(message: $"{Helpers.Constants.ValidateFile.notFile:D}");

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    fileName = formFile.FileName;
                    fileStream = formFile.OpenReadStream();
                }
            }

            string sheet = _correlativeSettings.SheetName;
            List<CPCIIUUNSPSCCLNCorrelativeDto> lObj = _commonService.ImportExcel<CPCIIUUNSPSCCLNCorrelativeDto>(fileStream, sheet);
            vResult.RecordsNumber = lObj.Count;

            if (vResult.RecordsNumber == 0)
                return new Response<ValidationFileResult>(vResult, message: $"{Helpers.Constants.ValidateFile.validationFileNoData:D}");
            
            foreach (var obj in lObj)
            {
                var valid = _commonService.ValidateModel(obj, out ICollection<System.ComponentModel.DataAnnotations.ValidationResult> results);
                if (!valid)
                {
                    obj.ErrorReport = string.Join("-", results.Select(o => o.ErrorMessage));
                    vResult.FailedRecordsNumber++;
                }
            }
            vResult.SucceedRecordsNumber = vResult.RecordsNumber - vResult.FailedRecordsNumber;

            if (vResult.FailedRecordsNumber == 0) {
                vResult.Identifier = SetRecordsinCache(fileName, lObj);
            } else {
                vResult.Identifier = CreateValidationReportFile(lObj);
            }
            return new Response<ValidationFileResult>(vResult, message: $"{Helpers.Constants.ValidateFile.validationFile:D}");
        }

        private string CreateValidationReportFile(List<CPCIIUUNSPSCCLNCorrelativeDto> lObj) 
        {
            var id = _guidGenerator.SQLServerSequentialGuid();
            var byteFile = Helpers.Helpers.CreateExcelDynamically<CPCIIUUNSPSCCLNCorrelativeDto>(lObj, _correlativeSettings.SheetName);

            _cache.Set(id.ToString(), byteFile);

            return id.ToString();
        }

        private string SetRecordsinCache(string fileName, List<CPCIIUUNSPSCCLNCorrelativeDto> lObj)
        {
            var id = _guidGenerator.SQLServerSequentialGuid();
            var dic = new Dictionary<string, object>
            {
                { "fileName", fileName },
                { "records", lObj }
            };

            _cache.Set(id.ToString(), dic);

            return id.ToString();
        }

        public object GetValidationReportFile(string fileIdentifier)
        {
            _cache.TryGetValue(fileIdentifier, out object value);
            return value;
        }

        public async Task<IResponse> UploadCorrelativeRecords(string recordsIdentifier, string user)
        {
            _cache.TryGetValue(recordsIdentifier, out object value);
            StoreProcedureLiteResponse result = new();
            
            if (value != null) 
            {
                var dic = (Dictionary<string, object>)value;
                var fileName = dic["fileName"];
                var records = (List<CPCIIUUNSPSCCLNCorrelativeDto>)dic["records"];
                var jsonObj = JsonConvert.SerializeObject(records);

                SqlParameter[] parameterList = new SqlParameter[]
                {
                    new SqlParameter("@correlativeRecordsJson", jsonObj),
                    new SqlParameter("@fileName", fileName),
                    new SqlParameter("@user", user)
                };

                result = (StoreProcedureLiteResponse) await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateCPCIIUUNSPSCCLNCorrelativeRecords", parameterList, 2);
                if(result.Result.Equals("OK"))
                    _cache.Remove(recordsIdentifier);
            }
            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<object> GetUploadedCorrelativeRecords()
        {
            var records = await _commonService.ExcuteSqlStoredProcedure("GetCPCIIUUNSPSCCLNCorrelativeRecords", null);
            var byteFile = Helpers.Helpers.CreateExcelDynamicallybyDataTable(records, _correlativeSettings.SheetName, false);

            return byteFile;
        }

        public async Task<IResponse> GetCorrelativeFileName()
        {
            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("GetCPCIIUUNSPSCCLNCorrelativeFileName", null, 2);

            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<IResponse> GetCPCIIUUNSPSCCLNCorrelativeSectorsAndProducts()
        {
            var result = (List<CPCIIUUNSPSCCLNCorrelativeSectorNodeDto>)await _commonService.ExcuteSqlStoredProcedure<CPCIIUUNSPSCCLNCorrelativeSectorNodeDto>("GetCPCIIUUNSPSCCLNCorrelativeSectorsAndProducts", null, 1);

            return new Response<List<CPCIIUUNSPSCCLNCorrelativeSectorNodeDto>>(result, null);
        }
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsSectors(string strPDP, string strCP)
        {
            SqlParameter[] parameterList = new SqlParameter[]
             {
                    new SqlParameter("@strPDP", strPDP),
                    new SqlParameter("@strCP", strCP),
             };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetCPCIIUUNSPSCCLNCorrelativeProductsSectors", parameterList);
            return records;
        }
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector(string sector)
        {
            SqlParameter[] parameterList = new SqlParameter[]
             {
                    new SqlParameter("@sector", sector == null ? string.Empty:sector),
             };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector", parameterList);
            return records;
        }
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup(string sector)
        {
            SqlParameter[] parameterList = new SqlParameter[]
             {
                    new SqlParameter("@grupo", sector == null ? string.Empty:sector),
             };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup", parameterList);
            return records;
        }
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment(string segment)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@segment", segment == null ? string.Empty:segment),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment", parameterList);
            return records;
        }
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily(string family,string strPDP, string strCP)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@family", family == null ? string.Empty:family),
                    new SqlParameter("@strPDP", strPDP),
                    new SqlParameter("@strCP", strCP),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily", parameterList);
            return records;
        }
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsByClass(string clase, string strPDP, string strCP)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@clase", clase == null ? string.Empty:clase),
                    new SqlParameter("@strPDP", strPDP),
                    new SqlParameter("@strCP", strCP),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetCPCIIUUNSPSCCLNCorrelativeProductsByClass", parameterList);
            return records;
        }
        ///// <summary>
        ///// Consulta un listado de productos en arbol, y genera un excel a partir de la información consultada
        ///// </summary>
        ///// <param name="level">nivel en el árbol</param>
        ///// <param name="param">parametro para el nivel</param>
        ///// <returns>Arreglo de bytes con la información del archivo</returns>
        //public async Task<DescargarExcel> ExportarArbolExcel(int level, string param)
        //{
        //    object lstLog = new();
        //    object byteFile = null;
        //    switch (level)
        //    {
        //        case 1:
        //            lstLog = await GetCPCIIUUNSPSCCLNCorrelativeProductsSectors();
        //            break;
        //        case 2:
        //            lstLog = await GetCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector(param);
        //            break;
        //        case 3:
        //            lstLog = await GetCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup(param);
        //            break;
        //        case 4:
        //            lstLog = await GetCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment(param);
        //            break;
        //        case 5:
        //            lstLog = await GetCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily(param);
        //            break;
        //        case 6:
        //            lstLog = await GetCPCIIUUNSPSCCLNCorrelativeProductsByClass(param);
        //            break;
        //    }
        //    string lstLogJson = JsonConvert.SerializeObject(lstLog);
        //    DataTable dt = JsonConvert.DeserializeObject<DataTable>(lstLogJson);

        //    var filename = $"{_consolidatedSettings.FileName} {DateTime.Now:dd-MM-yyyy}{_consolidatedSettings.FileExtension}";

        //    if (dt != null && dt.Rows.Count > 0)
        //    {
        //        byteFile = Helpers.Helpers.CreateExcelDynamicallybyDataTable(dt, _consolidatedSettings.SheetName, false);
        //    }

        //    DescargarExcel Descarga = new();
        //    Descarga.Archivo = (byte[])byteFile;
        //    Descarga.NombreArchivo = Path.GetFileName(filename);
        //    return Descarga;
        //}
    }
}

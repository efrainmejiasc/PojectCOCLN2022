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
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace CLN.services.Services
{
    public class UNSPSCClassifierService : IUNSPSCClassifierService
    {
        private readonly CLNContext _context;
        private readonly ICommonService _commonService;
        private Response _res;
        private readonly AppSettings _settings;
        private readonly ClassifierSettings _classifierSettings;
        private readonly ICustomCache _cache;
        private readonly ISequentialGuidGenerator _guidGenerator;
        private readonly ConsolidatedSettings _consolidatedSettings;
        public UNSPSCClassifierService(CLNContext context
            , ICommonService commonService
            , IOptions<AppSettings> settingsOptions
            , IOptions<ClassifierSettings> classifierSettings
            , ICustomCache cache
            , ISequentialGuidGenerator guidGenerator
            , IOptions<ConsolidatedSettings> consolidatedSettings)
        {
            _context = context;
            _commonService = commonService;
            _settings = settingsOptions.Value;
            _classifierSettings = classifierSettings.Value;
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

            string sheet = _classifierSettings.SheetName;
            List<UNSPSCClassifierDto> lObj = _commonService.ImportExcel<UNSPSCClassifierDto>(fileStream, sheet);
            vResult.RecordsNumber = lObj.Count;

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

            if (vResult.FailedRecordsNumber == 0)
            {
                vResult.Identifier = SetRecordsinCache(fileName, lObj);
            }
            else
            {
                vResult.Identifier = CreateValidationReportFile(lObj);
            }

            return new Response<model.APIModels.ValidationFileResult>(vResult, message: $"{Helpers.Constants.ValidateFile.validationFile:D}");
        }

        private string CreateValidationReportFile(List<UNSPSCClassifierDto> lObj)
        {
            var id = _guidGenerator.SQLServerSequentialGuid();
            var byteFile = Helpers.Helpers.CreateExcelDynamically<UNSPSCClassifierDto>(lObj, _classifierSettings.SheetName);

            _cache.Set(id.ToString(), byteFile);

            return id.ToString();
        }

        private string SetRecordsinCache(string fileName, List<UNSPSCClassifierDto> lObj)
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

        public async Task<IResponse> UploadClassifierRecords(string recordsIdentifier, string user)
        {
            _cache.TryGetValue(recordsIdentifier, out object value);
            StoreProcedureLiteResponse result = new();

            if (value != null)
            {
                var dic = (Dictionary<string, object>)value;
                var fileName = dic["fileName"];
                var records = (List<UNSPSCClassifierDto>)dic["records"];
                var jsonObj = JsonConvert.SerializeObject(records);

                SqlParameter[] parameterList = new SqlParameter[]
                {
                    new SqlParameter("@classifierRecordsJson", jsonObj),
                    new SqlParameter("@fileName", fileName),
                    new SqlParameter("@user", user)
                };

                result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("CreateUNSPSCClassifierRecords", parameterList, 2);
                if (result.Result.Equals("OK"))
                    _cache.Remove(recordsIdentifier);
            }
            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<object> GetUploadedClassifierRecords()
        {
            var records = await _commonService.ExcuteSqlStoredProcedure("GetUNSPSCClassifierRecords", null);
            var byteFile = Helpers.Helpers.CreateExcelDynamicallybyDataTable(records, _classifierSettings.SheetName, false);

            return byteFile;
        }

        public async Task<IResponse> GetClassifierFileName()
        {
            var result = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("GetUNSPSCClassifierFileName", null, 2);

            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<IResponse> GetUNSPSCClassifiersNodeChildren(int nodeCode, int level)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                    new SqlParameter("@nodeCode", nodeCode),
                    new SqlParameter("@level", level)
            };
            var result = (List<UNSPSCClassifierNodeDto>)await _commonService.ExcuteSqlStoredProcedure<UNSPSCClassifierNodeDto>("GetUNSPSCClassifiersNodeChildren", parameterList, 1);

            return new Response<List<UNSPSCClassifierNodeDto>>(result, null);
        }

        public async Task<Object> GetProductsUNSPSCZeroLevel()
        {
            var records = await _commonService.ExcuteSqlStoredProcedure("GetProductsUNSPSCZeroLevel", null);
            return records;
        }

        public async Task<Object> GetProductsUNSPSCFirstLevel(string grupo)
        {
            SqlParameter[] parameterList = new SqlParameter[]
             {
                    new SqlParameter("@grupo", grupo == null ? string.Empty:grupo),
             };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetProductsUNSPSCFirstLevel", parameterList);
            return records;
        }

        public async Task<Object> GetProductsUNSPSCBySegmentCodeSecondLevel(string segment)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@segment", segment == null ? string.Empty:segment),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetProductsUNSPSCBySegmentCodeSecondLevel", parameterList);
            return records;
        }
        public async Task<Object> GetProductsUNSPSCByFamilyCodeThirdLevel(string family)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@family", family == null ? string.Empty:family),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetProductsUNSPSCByFamilyCodeThirdLevel", parameterList);
            return records;
        }
        public async Task<Object> GetProductsUNSPSCByClassCodeFourthLevel(string clase)
        {
            SqlParameter[] parameterList = new SqlParameter[]
              {
                    new SqlParameter("@clase", clase == null ? string.Empty:clase),
              };
            var records = await _commonService.ExcuteSqlStoredProcedure("GetProductsUNSPSCByClassCodeFourthLevel", parameterList);
            return records;
        }
        /// <summary>
        /// Consulta un listado de productos en arbol, y genera un excel a partir de la información consultada
        /// </summary>
        /// <param name="level">nivel en el árbol</param>
        /// <param name="param">parametro para el nivel</param>
        /// <returns>Arreglo de bytes con la información del archivo</returns>
        public async Task<DescargarExcel> ExportarArbolExcel(int level, string param)
        {
            object lstLog = new();
            object byteFile = null;
            switch (level)
            {
                case 1:
                    lstLog = await GetProductsUNSPSCZeroLevel();
                    break;
                case 2:
                    lstLog = await GetProductsUNSPSCFirstLevel(param);
                    break;
                case 3:
                    lstLog = await GetProductsUNSPSCBySegmentCodeSecondLevel(param);
                    break;
                case 4:
                    lstLog = await GetProductsUNSPSCByFamilyCodeThirdLevel(param);
                    break;
                case 5:
                    lstLog = await GetProductsUNSPSCByClassCodeFourthLevel(param);
                    break;
            }
            string lstLogJson = JsonConvert.SerializeObject(lstLog);
            DataTable dt = JsonConvert.DeserializeObject<DataTable>(lstLogJson);

            var filename = $"{_consolidatedSettings.FileName} {DateTime.Now:dd-MM-yyyy}{_consolidatedSettings.FileExtension}";

            if (dt != null && dt.Rows.Count > 0)
            {
                byteFile = Helpers.Helpers.CreateExcelDynamicallybyDataTable(dt, _consolidatedSettings.SheetName, false);
            }

            DescargarExcel Descarga = new();
            Descarga.Archivo = (byte[])byteFile;
            Descarga.NombreArchivo = Path.GetFileName(filename);
            return Descarga;
        }
    }
}

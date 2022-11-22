using CLN.model.APIModels;
using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Services
{
    public class CommonService : ICommonService
    {
        private readonly CLNContext _context;

        public CommonService(CLNContext context)
        {
            _context = context;
        }

        public async Task<object> ExcuteSqlStoredProcedure<T>(string storedProcedure, SqlParameter[] parameterList, int listorObject)
        {
            List<T> lobj = null;
            object obj = null;
            if (_context.ChangeTracker.LazyLoadingEnabled != false)
                _context.ChangeTracker.LazyLoadingEnabled = false;
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                if (parameterList != null)
                    command.Parameters.AddRange(parameterList);

                command.CommandTimeout = 0;
                command.CommandText = storedProcedure;
                command.CommandType = System.Data.CommandType.StoredProcedure;

                if (command.Connection.State != System.Data.ConnectionState.Open)
                    command.Connection.Open();

                System.Data.Common.DbDataReader reader = await command.ExecuteReaderAsync();

                if (reader.HasRows)
                {
                    var jsonRes = "";
                    while (await reader.ReadAsync())
                        jsonRes += reader.GetTextReader(0).ReadToEnd();

                    try
                    {
                        if (listorObject == 1)
                        { lobj = JsonConvert.DeserializeObject<List<T>>(jsonRes); }
                        else
                        { obj = JsonConvert.DeserializeObject<T>(jsonRes); }
                    }
                    catch (Exception ex )
                    {
                      var er = ex.ToString();
                    }
                }
                try { reader.Dispose();}
                catch (Exception ex) 
                {
                  var er = ex.ToString(); 
                }
                command.Connection.Close();
            }

            return listorObject == 1 ? lobj ?? new List<T>() : obj ?? (T)Activator.CreateInstance(typeof(T));
        }

        public async Task<DataTable> ExcuteSqlStoredProcedure(string storedProcedure, SqlParameter[] parameterList)
        {
            DataTable dataTable = null;
            if (_context.ChangeTracker.LazyLoadingEnabled != false)
                _context.ChangeTracker.LazyLoadingEnabled = false;
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                if (parameterList != null)
                    command.Parameters.AddRange(parameterList);

                command.CommandTimeout = 0;
                command.CommandText = storedProcedure;
                command.CommandType = CommandType.StoredProcedure;

                if (command.Connection.State != ConnectionState.Open)
                    command.Connection.Open();

                System.Data.Common.DbDataReader reader = await command.ExecuteReaderAsync();

                if (reader.HasRows)
                {
                    dataTable = new DataTable();
                    dataTable.Load(reader);
                }
                try { reader.Dispose(); } catch (Exception) { }
                command.Connection.Close();
            }

            return dataTable;
        }

        public List<T> ImportExcel<T>(string excelFilePath, string sheetName)
        {
            List<T> list = new();
            Type typeOfObject = typeof(T);

            using (IXLWorkbook workbook = new XLWorkbook(excelFilePath))
            {
                var worksheet = workbook.Worksheets.Where(w => w.Name == sheetName).First();
                var properties = typeOfObject.GetProperties();
                //header column texts
                var columns = worksheet.FirstRow().Cells().Select((v, i) => new { Value = v.Value, Index = i + 1 });//indexing in closedxml starts with 1 not from 0

                foreach (IXLRow row in worksheet.RowsUsed().Skip(1))//Skip first row which is used for column header texts
                {
                    T obj = (T)Activator.CreateInstance(typeOfObject);

                    foreach (var prop in properties)
                    {
                        int colIndex = columns.SingleOrDefault(c => c.Value.ToString() == prop.Name.ToString()).Index;
                        var val = row.Cell(colIndex).Value;
                        var type = prop.PropertyType;
                        prop.SetValue(obj, Convert.ChangeType(val, type));
                    }

                    list.Add(obj);
                }

            }

            return list;
        }
        public List<T> ImportExcel<T>(Stream fileStream, string sheetName)
        {
            List<T> list = new();
            Type typeOfObject = typeof(T);

            using (IXLWorkbook workbook = new XLWorkbook(fileStream))
            {
                var worksheet = workbook.Worksheets.Where(w => w.Name == sheetName).FirstOrDefault();
                if (worksheet == null)
                    return list;

                var properties = typeOfObject.GetProperties();
                //header column texts
                var columns = worksheet.FirstRow().Cells().Select((v, i) => new { Value = v.Value, Index = i + 1 });//indexing in closedxml starts with 1 not from 0

                foreach (IXLRow row in worksheet.RowsUsed().Skip(1))//Skip first row which is used for column header texts
                {
                    T obj = (T)Activator.CreateInstance(typeOfObject);

                    foreach (var prop in properties)
                    {
                        var customAttribute = prop.CustomAttributes.FirstOrDefault().ConstructorArguments.FirstOrDefault().Value.ToString();
                        var col = columns.SingleOrDefault(c => c.Value.ToString() == prop.Name.ToString() || c.Value.ToString() == customAttribute);

                        var val = col != null ? row.Cell(col.Index).Value : null;
                        var type = prop.PropertyType;
                        prop.SetValue(obj, Convert.ChangeType(val, type));
                    }

                    list.Add(obj);
                }

            }

            return list;
        }

        public bool ValidateModel<T>(T obj, out ICollection<System.ComponentModel.DataAnnotations.ValidationResult> results)
        {
            results = new List<System.ComponentModel.DataAnnotations.ValidationResult>();

            return Validator.TryValidateObject(obj, new ValidationContext(obj), results, true);
        }

        public async Task<IResponse> GetTerritorialentities()
        {
            var result = (List<TerritorialEntityDto>)await ExcuteSqlStoredProcedure<TerritorialEntityDto>("GetTerritorialentities", null, 1);

            return new Response<List<TerritorialEntityDto>>(result, null);
        }

        public async Task<IResponse> GetTerritorialentitiesInHiringProcess()
        {
            var result = (List<TerritorialEntityDto>)await ExcuteSqlStoredProcedure<TerritorialEntityDto>("GetTerritorialentitiesInHiringProcess", null, 1);

            return new Response<List<TerritorialEntityDto>>(result, null);
        }

        public async Task<IResponse> GetNotificationType()
        {
            var result = (List<NotificationTypeDto>)await ExcuteSqlStoredProcedure<NotificationTypeDto>("GetNotificationType", null, 1);

            return new Response<List<NotificationTypeDto>>(result, null);
        }


        public async Task<object> SetProcessLog(int Attempts, string Process, DateTime ProcessStartDate, DateTime ProcesseEndDate, bool Success, object ProcessResult, int IdUser)
        {
            IPAddress[] ips = Dns.GetHostAddresses(Dns.GetHostName());
            var pl = new ProcessLog
            {
                Attempts = Attempts,
                Process = Process,
                ProcessStartDate = ProcessStartDate,
                ProcesseEndDate = ProcesseEndDate,
                Success = Success,
                Ip = ips.Select(x=>x.AddressFamily == AddressFamily.InterNetwork).LastOrDefault().ToString(),
                ProcessResult = JsonConvert.SerializeObject(ProcessResult),
                IdUserCreate = IdUser,
                DateCreate = DateTime.Now
            };

            var settings = new JsonSerializerSettings { DateFormatString = "yyyy-MM-ddTHH:mm:ss.fffZ" };
            string json = JsonConvert.SerializeObject(pl, settings);
            SqlParameter[] parameterList = new SqlParameter[]
            {
            new SqlParameter("@processLogJson", json)
            };

            var result = (StoreProcedureLiteResponse)await ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetProcessLog", parameterList, 0);
            return result;

        }
        public async Task<Object> GetTittleConsolidados()
        {
            var records = await ExcuteSqlStoredProcedure("GetTittleConsolidados", null);
            return records;

        }

        public async Task<IResponse> GetMonthList()
        {
            var result = (List<MonthDto>)await ExcuteSqlStoredProcedure<MonthDto>("GetMonthsList", null, 1);

            return new Response<List<MonthDto>>(result, null);
        }

        public async Task<IResponse> GetPersonType()
        {
            var result = (List<PersonTypeDto>)await ExcuteSqlStoredProcedure<PersonTypeDto>("GetPersonType", null, 1);

            return new Response<List<PersonTypeDto>>(result, null);
        }
        public async Task<IResponse> GetCharacterizationList()
        {
            var result = (List<CharacterizationDto>)await ExcuteSqlStoredProcedure<CharacterizationDto>("GetCharacterizationList", null, 1);

            return new Response<List<CharacterizationDto>>(result, null);
        }
        public async Task<IResponse> GetCommercialInfoList()
        {
            var result = (List<CommercialInfoDto>)await ExcuteSqlStoredProcedure<CommercialInfoDto>("GetCommercialInfoList", null, 1);

            return new Response<List<CommercialInfoDto>>(result, null);
        }
        public async Task<IResponse> GetFrequencyList()
        {
            var result = (List<FrequencyDto>)await ExcuteSqlStoredProcedure<FrequencyDto>("GetFrequencyList", null, 1);

            return new Response<List<FrequencyDto>>(result, null);
        }
        public async Task<IResponse> GetSectorsList()
        {
            var result = (List<SectorDto>)await ExcuteSqlStoredProcedure<SectorDto>("GetSectorsList", null, 1);

            return new Response<List<SectorDto>>(result, null);
        }
        public async Task<IResponse> GetAlerts()
        {
            var result = (List<AlertDto>)await ExcuteSqlStoredProcedure<AlertDto>("GetAlerts", null, 1);

            return new Response<List<AlertDto>>(result, null);
        }
     
        public async Task<IResponse> GetAlertsById(int id)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                    new SqlParameter("@idAlert", id == 0 ? 0:id),
            };
            var result = (List<AlertDto>)await ExcuteSqlStoredProcedure<AlertDto>("GetAlertsById", parameterList, 1);
            return new Response<List<AlertDto>>(result, null);
        }

        public async Task<IResponse> GetAlertsByName(string name)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                    new SqlParameter("@name",name== null ? 0:name),
            };
            var result = (List<AlertDto>)await ExcuteSqlStoredProcedure<AlertDto>("GetAlertsByName", parameterList, 1);
            return new Response<List<AlertDto>>(result, null);
        }
        public async Task<object> PutStateAlert(int idAlert, bool isActive)
        {
            SqlParameter[] parameterList = new SqlParameter[]
             {
                    new SqlParameter("@idAlert", idAlert == 0 ? 0:idAlert),
                    new SqlParameter("@isActive", isActive == false ? 0:isActive)
             };
            var result = (StoreProcedureLiteResponse)await ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("PutStateAlert", parameterList, 0);
            return result.Result;
        }

        public async Task<object> DeleteAlert(int idAlert)
        {
            SqlParameter[] parameterList = new SqlParameter[]
             {
                    new SqlParameter("@idAlert", idAlert == 0 ? 0:idAlert)
             };
            var result = (StoreProcedureLiteResponse)await ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("DeleteAlert", parameterList, 0);
            return result.Result;
        }

        public async Task<IResponse> PostAlerts(AlertDto alert)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                    new SqlParameter("@idAlert", alert.idAlert == 0 ? 0:alert.idAlert),
                    new SqlParameter("@nombre", alert.nombre == null ? 0:alert.nombre),
                    new SqlParameter("@fechaUltimoEnvio",DateTime.Now),
                    new SqlParameter("@tipoNotificacion", alert.tipoNotificacion == null ? 0:alert.tipoNotificacion),
                    new SqlParameter("@tipoPlantilla", alert.tipoPlantilla == 0 ? 0:alert.tipoPlantilla),
                    new SqlParameter("@isActive", alert.isActive == false ? 0:alert.isActive),
                    new SqlParameter("@frecuencia", alert.frecuencia == null ? 0:alert.frecuencia),
                    new SqlParameter("@sendAll", alert.sendAll == false ? 0:alert.sendAll),
                    new SqlParameter("@sendPimes", alert.sendPimes == false ? 0:alert.sendPimes),
                    new SqlParameter("@tipoPersona", alert.tipoPersona == null ? 0:alert.tipoPersona),
                    new SqlParameter("@sectores", alert.sectores == null ? 0:alert.sectores),
                    new SqlParameter("@caracterizaciones", alert.characterization == null ? 0:alert.characterization),
                    new SqlParameter("@infoComercial", alert.infoComercial == null ? 0:alert.infoComercial),
                    new SqlParameter("@desde", alert.desde == null ? 0:alert.desde),
                    new SqlParameter("@hasta", alert.hasta == null ? 0:alert.hasta),
                    new SqlParameter("@dias", alert.dias == null ? 0:alert.dias),
                    new SqlParameter("@hora", alert.hora == null ? 0:alert.hora),
                    new SqlParameter("@sms", alert.sms == false ? 0:alert.sms),
                    new SqlParameter("@image", alert.image == null ? 0:alert.image),
                    new SqlParameter("@enlace", alert.enlace == null ? 0:alert.enlace),
                    new SqlParameter("@primerTexto", alert.primerTexto == null ? 0:alert.primerTexto),
                    new SqlParameter("@segundoTexto", alert.segundoTexto == null ? 0:alert.segundoTexto),
                    new SqlParameter("@tercerTexto", alert.tercerTexto == null ? 0:alert.tercerTexto),
                    new SqlParameter("@idUsuario", alert.idUsuario == 0 ? 0:alert.idUsuario)
            };
            var result = (StoreProcedureLiteResponse)await ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("PostAlerts", parameterList, 2);
            return new Response<StoreProcedureLiteResponse>(result, null);
        }

        public async Task<object> SaveImageForAlerts(IFormFile pFile, string pDirectory)
        {
            Guid guid = Guid.NewGuid();
            object Obj = null;
            string[] fileAtrr = pFile.FileName.Split('.');
            int cnt = fileAtrr.Length;
            string strNameDocument = $"{guid}{"."}{fileAtrr[cnt-1]}";
            string fullPath = Path.Combine(pDirectory + "/" + strNameDocument);
            Audit auditSaveFileComponent = new();
            if (!Directory.Exists(pDirectory))
            {
                Directory.CreateDirectory(pDirectory);
            }

            var streamFile = new FileStream(
                                            fullPath,
                                            FileMode.Create
                                            );
            using (streamFile)
            {
                await pFile.CopyToAsync(streamFile);
                Obj = pFile;
            }
            auditSaveFileComponent.Date = DateTime.Now;
            auditSaveFileComponent.IdAction = 5;
            auditSaveFileComponent.IdMessageResponse = 1;
            _context.Audits.Add(auditSaveFileComponent);
            return "assets/upload/ComponentesMultimediaAlerts/" + strNameDocument;
        }

        public async Task<List<CompanyProfileCLNNewContentDto>> GetCompaniesforNewCLNContents()
        {
            var result = (List<CompanyProfileCLNNewContentDto>)await ExcuteSqlStoredProcedure<CompanyProfileCLNNewContentDto>("GetCompaniesforNewCLNContents", null, 1);

            return result;
        }

        public async Task<HtmlTemplateDto> GetHtmlTemplate(int enumerator)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@enumerator", enumerator)
            };
            var emailTemplate = (HtmlTemplateDto)await ExcuteSqlStoredProcedure<HtmlTemplateDto>("GetHtmlTemplate", parameterList, 2);
            return emailTemplate;
        }

        public async Task<IResponse> GetStates()
        {
            var result = (List<States>)await ExcuteSqlStoredProcedure<States>("GetStates", null, 1);

            return new Response<List<States>>(result, null);
        }
    }
}
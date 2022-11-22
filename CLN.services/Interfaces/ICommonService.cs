using CLN.model.APIModels;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface ICommonService
    {
        Task<IResponse> GetStates();
        Task<object> ExcuteSqlStoredProcedure<T>(string storedProcedure, SqlParameter[] parameterList, int listorObject);
        Task<DataTable> ExcuteSqlStoredProcedure(string storedProcedure, SqlParameter[] parameterList);
        List<T> ImportExcel<T>(string excelFilePath, string sheetName);
        List<T> ImportExcel<T>(Stream fileStream, string sheetName);
        bool ValidateModel<T>(T obj, out ICollection<System.ComponentModel.DataAnnotations.ValidationResult> results);
        Task<IResponse> GetTerritorialentities();
        Task<IResponse> GetTerritorialentitiesInHiringProcess();
        Task<IResponse> GetNotificationType();
        Task<object> SetProcessLog(int Attempts, string Process, DateTime ProcessStartDate, DateTime ProcesseEndDate, bool Success, object ProcessResult, int IdUser);

        Task<object> GetTittleConsolidados();
        Task<IResponse> GetMonthList();
        Task<IResponse> GetPersonType();
        Task<IResponse> GetCharacterizationList();
        Task<IResponse> GetCommercialInfoList();
        Task<IResponse> GetFrequencyList();
        Task<IResponse> GetSectorsList();
        Task<IResponse> GetAlerts();
        Task<IResponse> GetAlertsById(int id);
        Task<IResponse> GetAlertsByName(string name);
        public Task<Object> PutStateAlert(int idAlert, bool isActive);
        public Task<Object> DeleteAlert(int idAlert);
        Task<IResponse> PostAlerts(AlertDto alert);
        Task<object> SaveImageForAlerts(IFormFile pFile, string pDirectory);
        Task<List<CompanyProfileCLNNewContentDto>> GetCompaniesforNewCLNContents();
        Task<HtmlTemplateDto> GetHtmlTemplate(int enumerator);
    }
}

using CLN.model.APIModels;
using CLN.services.Wrappers;
using System;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IHiringProcessService
    {
        public Task<IResponse> DeleteAllHiringProcesses();
        public Task<IResponse> GetHiringProcessesSecopOne(string pUrl, string pQuery);
        public Task<IResponse> GetHiringProcessesSecopTwo(string pUrl, string pQuery);
        public Task<IResponse> SetHiringProcessCompanyOffers();
        public Task<Object> GetProcessPurchaseById(int idProcess);
        Task<IResponse> GetHiringProcessActualStages();
        Task<IResponse> GetHiringProcessActualModes();
        Task<IResponse> FilterGetHiringProcessProcessNumber(string processNumber);
        Task<IResponse> GetHiringProcessTotalCount();
        Task<Object> GetHiringProcessTotalCountandSuma();
        Task<IResponse> GetHiringProcessesByFilter(HiringProcessByFilter filter);
        Task<IResponse> GetHiringProcessesById(int idHiringProcess); 
        Task<object> GetHiringProcessesByFilterforDownloadExcel(HiringProcessByFilter filter, string SheetName);
        Task<Object> GetModalitiesByCompanyIdForProcess(int idCompany);
    }
}

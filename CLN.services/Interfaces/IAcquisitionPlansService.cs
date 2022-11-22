using System;
using System.Threading.Tasks;
using CLN.model.APIModels;
using CLN.services.Wrappers;

namespace CLN.services.Interfaces
{
    public interface IAcquisitionPlansService
    {
        public Task<string> GetAcquisitionPlansSecopOne(string pUrl, string pQuery, string pUrlDetail, string pQueryDetail, int? anio);
        public Task<string> GetAcquisitionPlansSecopTwo(string pUrl, string pQuery, string pUrlDetail, string pQueryDetail, int? anio);
        public Task<string> SetAcquisitionPlansCompanyOffers();
        public Task<Object> GetAcquisitionPurchaseById(int idAcquisition);
        Task<Object> GetUNSPSCClassProducts(string classProduct);
        Task<IResponse> GetAcquisitionPlansMode();
        Task<IResponse> FilterCompaniesNameWithAcquisitionPlans(string companyNameFilter);
        public Task<Object> GetAcquisitionPlansByFilter(AcquisitionPlansByFilter filter, bool isXlsFormat = false);
        public Task<DescargarExcel> ExportarAcquisitionPlansExcel(AcquisitionPlansByFilter filter);
        public Task<Object> GetAcquisitionPlanById(int idAcquisition);
        public Task<Object> GetAcquisitionPlansTotalCount();
        Task<Object> GetEntitiesByIdCompanyForAcquisition(int idCompany);
        Task<Object> GetModalitiesByCompanyIdForAcquisition(int idCompany);
    }
}

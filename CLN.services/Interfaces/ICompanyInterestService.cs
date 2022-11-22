using CLN.model.APIModels;
using CLN.services.Wrappers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface ICompanyInterestService
    {
        Task<IResponse> GetHiringProcessesStage();
        Task<IResponse> GetHiringProcessesMode();
        Task<IResponse> FilterCompaniesNameWithHiringProcess(string companyNameFilter);
        Task<IResponse> FilterProcessByObject(string objectFilter);
        Task<IResponse> GetHiringProcessMaximumValue();
        Task<IResponse> GetContractModalities();
        Task<Object> GetCompanies();
        Task<IResponse> GetCompanyInterest(int companyId);
        Task<Object> GetProcessCompanyByFilter(CompanyOffersByFilter filter);
        Task<Object> GetAcquisitionsCompanyByFilter(CompanyOffersByFilter filter);
        Task<DescargarExcel> ExportarProcessExcel(CompanyOffersByFilter filter);
        Task<DescargarExcel> ExportarAcquisitionsExcel(CompanyOffersByFilter filter);
        Task<IResponse> CreateCompanyInterest(CompanyInterestDto companyInterest, string UserEmail);
        Task<IResponse> UpdateCompanyInterest(CompanyInterestDto companyInterest, string UserEmail);
        Task<IResponse> GetCompanyInterestNotification(int companyId);
        Task<IResponse> SetCompanyInterestNotification(List<CompanyInterestNotificationDto> lCompanyInterestNotification, string UserEmail);
        Task<Object> GetEntitiesByIdCompany(int idCompany);
        Task<Object> GetEntitiesByIdCompanyForProcess(int idCompany);
        Task<IResponse> GetAcquisitionPlanMaximumValue();
    }
}

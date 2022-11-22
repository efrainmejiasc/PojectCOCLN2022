using CLN.model.APIModels;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface ICPCIIUUNSPSCCLNCorrelativeService
    {
        Task<IResponse> ValidateFile(IList<IFormFile> files);
        object GetValidationReportFile(string fileIdentifier);
        Task<IResponse> UploadCorrelativeRecords(string recordsIdentifier, string user);
        Task<object> GetUploadedCorrelativeRecords();
        Task<IResponse> GetCorrelativeFileName();
        Task<IResponse> GetCPCIIUUNSPSCCLNCorrelativeSectorsAndProducts();
        Task<object> GetCPCIIUUNSPSCCLNCorrelativeProductsSectors(string strPDP, string strCP);
        Task<object> GetCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector(string sector);
        Task<object> GetCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup(string grupo);
        Task<object> GetCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment(string segment);
        Task<object> GetCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily(string family,string strPDP, string strCP);
        Task<object> GetCPCIIUUNSPSCCLNCorrelativeProductsByClass(string clase,string strPDP, string strCP);
        //Task<DescargarExcel> ExportarArbolExcel(int level, string param);
    }
}

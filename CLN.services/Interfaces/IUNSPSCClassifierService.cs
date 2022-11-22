using CLN.model.APIModels;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IUNSPSCClassifierService
    {
        Task<IResponse> ValidateFile(IList<IFormFile> files);
        object GetValidationReportFile(string fileIdentifier);
        Task<IResponse> UploadClassifierRecords(string recordsIdentifier, string user);
        Task<object> GetUploadedClassifierRecords();
        Task<IResponse> GetClassifierFileName();
        Task<IResponse> GetUNSPSCClassifiersNodeChildren(int nodeCode, int level);
        Task<object> GetProductsUNSPSCZeroLevel();
        Task<object> GetProductsUNSPSCFirstLevel(string grupo);
        Task<object> GetProductsUNSPSCBySegmentCodeSecondLevel(string segment);
        Task<object> GetProductsUNSPSCByFamilyCodeThirdLevel(string family);
        Task<object> GetProductsUNSPSCByClassCodeFourthLevel(string clase);
        Task<DescargarExcel> ExportarArbolExcel(int level, string param);
    }
}

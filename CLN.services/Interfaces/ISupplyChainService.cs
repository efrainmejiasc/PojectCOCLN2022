using CLN.services.Wrappers;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface ISupplyChainService
    {
        Task<IResponse> GetSupplyElements();
        Task<IResponse> GetSupplyElementTemplates();
        Task<IResponse> GetSupplyChainbyCompanyAndUser(string companyId, string userEmail, string user);
        Task<IResponse> CreateSupplyChain(object entity, string userEmail);
        Task<IResponse> UpdateSupplyChain(object entity, string userEmail);
        Task<IResponse> DeleteSupplyChainElement(object entity, string userEmail);
        Task<object> GetSupplyChainbyCompanyAndUsertoDownload(string companyId, string userEmail, string user);
    }
}

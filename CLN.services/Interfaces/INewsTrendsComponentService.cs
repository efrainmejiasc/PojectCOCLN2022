using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface INewsTrendsComponentService
    {
        Task<object> GetComponents(string all);
        Task<object> GetPublishedComponents();
        Task<object> GetComponentDetail(string id);
        Task<object> DeleteComponent(string id, string idUser);
        Task<object> EditComponents(object entity, string idUser);
        Task<object> CreateComponents(object entity, string idUser);
        Task<object> PublishComponents(string idUser, string assetsHomeRute);
        Task<object> SaveMultimediaComponent(IFormFile pFile, string pDirectory);
    }
}

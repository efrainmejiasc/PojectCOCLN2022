using CLN.model.Models;
using CLN.services.Wrappers;
using System.Threading;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// Get companies associate to user from CAS and update companies information
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<IResponse> UpdateUserCompaniesInformationAsync(int userId, CancellationToken cancelationToken);

        /// <summary>
        /// Get user companies identifier
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<IResponse> GetUserCompaniesIdentifierAsync(int userId, CancellationToken cancelationToken);

        /// <summary>
        /// Get user companies
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<IResponse> GetUserCompaniesAsync(int userId, CancellationToken cancelationToken);

        /// <summary>
        /// Get user companies from CAS
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<IResponse> GetUserCompaniesFromCASAsync(int userId, CancellationToken cancelationToken);

        Task<object> GetMenubyUser(string idUser);
        Task<object> GetPermitsbyUserandMenu(string idUser);
        Task<object> GetMenusandPermitsbyUser(string idUser, string emailUser);
        Task<IResponse> GetUserCompaniestoManage(string idUser, string emailUser);
        Task<IResponse> CloseSession(string urlCLN);
        Task<IResponse> GetUserCompaniestoAppointments(string idUser, string emailUser);
    }
}

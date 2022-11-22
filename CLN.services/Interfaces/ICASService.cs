using CLN.services.Wrappers;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CLN.services.Interfaces
{
    /// <summary>
    /// Service for connect with CAS
    /// </summary>
    public interface ICASService
    {
        /// <summary>
        /// Generate url for login in CAS
        /// </summary>
        /// <returns></returns>
        IResponse GenerateUrl();

        /// <summary>
        /// Wait for finish login in CAS
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IResponse> WaitForLogin(Guid id, CancellationToken cancellationToken);

        /// <summary>
        /// Get basic user information
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ticket"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IResponse> GetBasicUserInformationAsync(Guid id, string ticket, CancellationToken cancellationToken);

        /// <summary>
        /// Get user profile
        /// </summary>
        /// <param name="token"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IResponse> GetUserProfileAsync(string token, CancellationToken cancellationToken);

        /// <summary>
        /// Get user company information
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IResponse> GetUserCompanyInformationAsync(int companyId, CancellationToken cancellationToken);
        Task<IResponse> GetUserCompanyInformationforCompanyProfile(int userId, int companyId, CancellationToken cancelationToken);

        ///// <summary>
        ///// Set user token from CAS
        ///// </summary>
        ///// <param name="token"></param>
        ///// <param name="cancellationToken"></param>
        ///// <returns></returns>
        //Task<IResponse> SetUserTokenAsync(string token, CancellationToken cancellationToken);

        ///// <summary>
        ///// Check if user is login in CAS. If user is in session return the same model of wait for login with de CLN token. 
        ///// </summary>
        ///// <param name="email"></param>
        ///// <param name="cancellationToken"></param>
        ///// <returns></returns>
        //Task<IResponse> LoginwithUserInSessionAsync(string email, CancellationToken cancellationToken);
        Task<IResponse> GetCLNEventsAsync(CancellationToken cancelationToken);
        Task<IResponse> GetCLNServicessAsync(CancellationToken cancelationToken);
        Task<IResponse> GetCLNBusinessOpportunitiesAsync(CancellationToken cancelationToken);
        Task<IResponse> GetCLNCommunitiesAsync(CancellationToken cancelationToken);

    }
}

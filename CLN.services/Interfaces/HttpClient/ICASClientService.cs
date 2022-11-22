using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace CLN.services.Interfaces.HttpClient
{
    /// <summary>
    /// Service for connect with CAS
    /// </summary>
    public interface ICASClientService : IClientService
    {
        /// <summary>
        /// Get basic user information
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ticket"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<HttpResponseMessage> GetBasicUserInformationAsync(Guid id, string ticket, CancellationToken cancelationToken);

        /// <summary>
        /// Get user profile
        /// </summary>
        /// <param name="token"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<HttpResponseMessage> GetUserProfileAsync(string token, CancellationToken cancelationToken);

        /// <summary>
        /// Get user company information
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<HttpResponseMessage> GetUserCompanyInformationAsync(int companyId, CancellationToken cancelationToken);

        /// <summary>
        /// Forgot password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<HttpResponseMessage> ForgotPasswordAsync(string email, CancellationToken cancelationToken);
        Task<HttpResponseMessage> GetCLNEventsAsync(string items, string offset, CancellationToken cancelationToken);
        Task<HttpResponseMessage> GetCLNServicesAsync(string items, string offset, CancellationToken cancelationToken);
        Task<HttpResponseMessage> GetCLNCommunitiesAsync(string items, string offset, CancellationToken cancelationToken);
        Task<HttpResponseMessage> GetCLNCommunityDetailAsync(int comunityId, CancellationToken cancelationToken);
        Task<HttpResponseMessage> GetCLNBusinessOpportunitiesAsync(string items, string offset, CancellationToken cancelationToken);
    }
}

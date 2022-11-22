using CLN.model.Dto.Login;
using CLN.model.Models;
using CLN.services.Wrappers;
using System.Threading;
using System.Threading.Tasks;


namespace CLN.services.Interfaces
{
    public interface IAutenticationService
    {
        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="puser"></param>
        ///// <param name="prmSecret"></param>
        ///// <param name="prmIssuer"></param>
        ///// <param name="prmAudience"></param>
        ///// <returns></returns>
        //Task<Response> Login(User puser, string prmSecret, string prmIssuer, string prmAudience);

        /// <summary>
        /// Login in CAS
        /// </summary>
        /// <param name="casLogin"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IResponse> LoginCASAsync(CASLoginDto casLogin, CancellationToken cancellationToken);

        /// <summary>
        /// Forgot password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="cancelationToken"></param>
        /// <returns></returns>
        Task<IResponse> ForgotPasswordAsync(string email, CancellationToken cancelationToken);

        /// <summary>
        /// Get user by CAS identifier
        /// </summary>
        /// <param name="userId"></param>
        /// /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<User> GetUserByCasIdAsync(int userId, CancellationToken cancellationToken);

        /// <summary>
        /// Get user by identifier
        /// </summary>
        /// <param name="userId"></param>
        /// /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<User> GetUserByIdAsync(int userId, CancellationToken cancellationToken);

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="email"></param>
        /// /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<User> GetUserByMailAsync(string email, CancellationToken cancellationToken);

        ///// <summary>
        ///// Get session for a user
        ///// </summary>
        ///// <param name="userId"></param>
        ///// /// <param name="cancellationToken"></param>
        ///// <returns></returns>
        //Task<SessionToken> GetUserInSessionAsync(int userId, CancellationToken cancellationToken);

        ///// <summary>
        ///// Check valid session for a user by id
        ///// </summary>
        ///// <param name="userId"></param>
        ///// <param name="cancellationToken"></param>
        ///// <returns></returns>
        //Task<bool> CheckUserInSessionAsync(int userId, CancellationToken cancellationToken);

        ///// <summary>
        ///// Check valid session for a user by email
        ///// </summary>
        ///// <param name="userId"></param>
        ///// <param name="cancellationToken"></param>
        ///// <returns></returns>
        //Task<SessionToken> GetUserInSessionByEmailAsync(string email, CancellationToken cancellationToken);

        ///// <summary>
        ///// Clear session for a User
        ///// </summary>
        ///// <param name="userId"></param>
        ///// <param name="cancellationToken"></param>
        ///// <returns></returns>
        //Task<IResponse> ClearUserSessionAsync(int userId, CancellationToken cancellationToken);

        ///// <summary>
        ///// Save token fron user when login before in CAS
        ///// </summary>
        ///// <param name="sessionToken"></param>
        ///// <param name="cancellationToken"></param>
        ///// <returns></returns>
        //Task<IResponse> SaveSessionTokenAsync(SessionToken sessionToken, CancellationToken cancellationToken);
    }
}

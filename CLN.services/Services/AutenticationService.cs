using AuthorizationTest.JwtHelpers;
using CLN.api.Controllers;
using CLN.Authorization.JwtHelpers;
using CLN.model.Dto.CAS;
using CLN.model.Dto.Login;
using CLN.model.ErrorMessages;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Extensions;
using CLN.services.Helpers;
using CLN.services.Interfaces;
using CLN.services.Interfaces.HttpClient;
using CLN.services.Persistence;
using CLN.services.Wrappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace CLN.services.Services
{
    public class AutenticationService : IAutenticationService
    {
        private readonly CLNContext _context;
        private readonly AppSettings _settings;
        private readonly ICASClientService _casClientService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="settingsOptions"></param>
        public AutenticationService(
            CLNContext context,
            IOptions<AppSettings> settingsOptions,
            ICASClientService casClientService)
        {
            _context = context;
            _settings = settingsOptions.Value;
            _casClientService = casClientService;
        }

        /// <inheritdoc />
        public async Task<IResponse> LoginCASAsync(CASLoginDto casLogin, CancellationToken cancellationToken)
        {
            try
            {
                var dbUser = await GetUserByMailAsync(casLogin.Email, cancellationToken);
                var isNew = dbUser == null;
                var needUpdate = false;

                if (isNew)
                {
                    dbUser = CreateUser(casLogin);
                    _context.Add(dbUser);
                }
                else
                    needUpdate = CheckUserForUpdate(dbUser, casLogin);

                if (needUpdate)
                    _context.Update(dbUser);

                if (isNew || needUpdate)
                    await _context.SaveChangesAsync(cancellationToken);

                var role = await _context.Rols.FirstOrDefaultAsync(r => r.IdRol == dbUser.IdRol, cancellationToken);
                var roles = role != null ? new string[] { role.Name } : Array.Empty<string>();
                //var token = GenerateToken(_settings.Secret, _settings.ClnIssuerJwt, _settings.ClnAudienceJwt, dbUser, roles);
                var token = GenerateToken2(_settings.Secret, _settings.ClnIssuerJwt, _settings.ClnAudienceJwt, dbUser, roles);

                return new Response<LoginResponseDto>(new LoginResponseDto
                {
                    Id = dbUser.IdUser,
                    IsAdmin = dbUser.IdRol == 1,
                    CASId = dbUser.CasId,
                    Email = dbUser.Email,
                    Token = token,
                    //Token = token.Value,
                    CASToken = casLogin.Token,
                    Country = dbUser.Country,
                    CountryCode = dbUser.CountryCode,
                    FullName = $"{dbUser.FirstName} {dbUser.FirstSurname}"
                });
            }
            catch (Exception)
            {
                return new Response<LoginResponseDto>(message: $"{CASLoginAccessMessages.LoginFailed:D}")
                {
                    Errors = new List<string>() { CASLoginAccessMessages.LoginFailed.GetDescription() }
                };
            }
        }

        /// <inheritdoc />
        public async Task<IResponse> ForgotPasswordAsync(string email, CancellationToken cancelationToken)
        {
            var error = new Response<bool>(message: $"{CASLoginAccessMessages.ErrorForgotPassword:D}")
            {
                Errors = new List<string>() { CASLoginAccessMessages.ErrorForgotPassword.GetDescription() }
            };

            try
            {
                var response = await _casClientService.ForgotPasswordAsync(email, cancelationToken);

                if (response.StatusCode == System.Net.HttpStatusCode.Created)
                {
                    var content = await response.Content.ReadAsStringAsync(cancelationToken);
                    var result = (ForgotPasswordResponseDto)JsonConvert.DeserializeObject(content, typeof(ForgotPasswordResponseDto));

                    if (!result.Success) return new Response<bool>(message: $"{CASLoginAccessMessages.ErrorForgotPasswordInvalidUser:D}:{CASLoginAccessMessages.ErrorForgotPasswordInvalidUser.GetDescription()}")
                    {
                        Errors = new List<string>() { CASLoginAccessMessages.ErrorForgotPasswordInvalidUser.GetDescription() }
                    };

                    return new Response<bool>()
                    {
                        Succeeded = true,
                        Message = $"{CASLoginAccessMessages.ForgotPasswordOk:D}:{CASLoginAccessMessages.ForgotPasswordOk.GetDescription()}"
                    };
                }

                return error;
            }
            catch (Exception)
            {
                // to do: add to log service

                return error;
            }
        }

        /// <inheritdoc />
        public async Task<User> GetUserByMailAsync(string email, CancellationToken cancellationToken) =>
            await _context.Users.Where(u => u.Email == email && (bool)u.IsActive).FirstOrDefaultAsync(cancellationToken);

        /// <inheritdoc />
        public async Task<User> GetUserByCasIdAsync(int userId, CancellationToken cancellationToken) =>
            await _context.Users.Where(u => u.CasId == userId && (bool)u.IsActive).FirstOrDefaultAsync(cancellationToken);

        /// <inheritdoc />
        public async Task<User> GetUserByIdAsync(int userId, CancellationToken cancellationToken) =>
            await _context.Users.Where(u => u.IdUser == userId && (bool)u.IsActive).FirstOrDefaultAsync(cancellationToken);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="casLogin"></param>
        /// <returns></returns>
        private static User CreateUser(CASLoginDto casLogin)
        {
            var dbUser = new User
            {
                CasId = casLogin?.Id,
                FirstName = !string.IsNullOrEmpty(casLogin.FirstName) ? casLogin.FirstName : string.Empty,
                FirstSurname = !string.IsNullOrEmpty(casLogin.LastName) ? casLogin.LastName : string.Empty,
                Email = casLogin.Email,
                UserName = !string.IsNullOrEmpty(casLogin.Username) ? casLogin.Username : string.Empty,
                Country = casLogin?.Country != null ? casLogin.Country : string.Empty,
                CountryCode = casLogin?.CountryCode != null ? casLogin.CountryCode : string.Empty,
                Companies = casLogin?.Companies != null ? casLogin.Companies : Array.Empty<CompanyToSaveDto>(),
                Password = string.Empty
            };

            dbUser.IdRol = casLogin?.IsAdmin != null ? casLogin.IsAdmin ? 1 : dbUser.Companies.Any(x => (x.IsAdmin.Value || x.IsOwner.Value)) ? 3 : 2 : 2;
            return dbUser;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbUser"></param>
        /// <param name="casLogin"></param>
        /// <returns></returns>
        private static bool CheckUserForUpdate(User dbUser, CASLoginDto casLogin)
        {
            var needUpdate = false;
            var casLoginCompanies = casLogin?.Companies != null ? casLogin.Companies : Array.Empty<CompanyToSaveDto>();

            if (casLogin?.Id != null && casLogin.Id > 0 && dbUser.CasId != casLogin.Id)
            {
                dbUser.CasId = casLogin.Id;
                needUpdate = true;
            }
            if (!string.IsNullOrEmpty(casLogin.FirstName) && dbUser.FirstName != casLogin.FirstName)
            {
                dbUser.FirstName = casLogin.FirstName;
                needUpdate = true;
            }
            if (!string.IsNullOrEmpty(casLogin.LastName) && dbUser.FirstSurname != casLogin.LastName)
            {
                dbUser.FirstSurname = casLogin.LastName;
                needUpdate = true;
            }
            if (!string.IsNullOrEmpty(casLogin.Username) && dbUser.UserName != casLogin.Username)
            {
                dbUser.UserName = casLogin.Username;
                needUpdate = true;
            }
            if (!string.IsNullOrEmpty(casLogin?.Country) && dbUser.Country != casLogin.Country)
            {
                dbUser.Country = casLogin.Country;
                needUpdate = true;
            }
            if (!string.IsNullOrEmpty(casLogin?.CountryCode) && dbUser.CountryCode != casLogin.CountryCode)
            {
                dbUser.CountryCode = casLogin.CountryCode;
                needUpdate = true;
            }
            if (casLogin?.IsAdmin != null && (casLogin.IsAdmin && dbUser.IdRol != 1 || !casLogin.IsAdmin && dbUser.IdRol == 1))
            {
                dbUser.IdRol = casLogin.IsAdmin ? 1 : 2;
                needUpdate = true;
            }
            if (dbUser.IdRol != 1 && casLoginCompanies.Length > 0)
            {
                dbUser.IdRol = casLoginCompanies.Any(x => x.IsAdmin.Value || x.IsOwner.Value) ? 3 : 2;
                needUpdate = true;
            }

            var companyMatch = true;
            if (casLoginCompanies.Length > 0)
            {
                if (casLogin.Companies.Length == dbUser.Companies.Length)
                {
                    foreach (var item in casLogin.Companies)
                    {
                        var existCompany = dbUser.Companies.Any(p => p.CompanyId == item.CompanyId && p.Name == item.Name && p.IsOwner == item.IsOwner && p.IsAdmin == item.IsAdmin);
                        if (!existCompany)
                        {
                            companyMatch = false;
                            break;
                        }
                    }
                }
                else
                    companyMatch = false;
            }
            else if (dbUser.Companies.Length > 0)
            {
                dbUser.Companies = Array.Empty<CompanyToSaveDto>();
                companyMatch = false;
            }

            if (!companyMatch)
            {
                dbUser.Companies = casLogin?.Companies;
                needUpdate = true;
            }

            return needUpdate;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="prmSecret"></param>
        /// <param name="prmIssuer"></param>
        /// <param name="prmAudience"></param>
        /// <param name="prmUser"></param>
        /// <returns></returns>
        public static JwtToken GenerateToken(string prmSecret, string prmIssuer, string prmAudience, User prmUser, params string[] roles)
        {
            string ipAddress = IpHelper.GetIpAddress();

            var tokenToBuild = new JwtTokenBuilder()
                .AddSecurityKey(JwtSecurityKey.Create(prmSecret))
                .AddIssuer(prmIssuer)
                .AddAudience(prmAudience)
                .AddSubject(prmUser.CasId.ToString())
                .AddExpiryinMinute(300)
                .AddClaim(JwtRegisteredClaimNames.Email, prmUser.Email)
                .AddClaim("uid", prmUser.CasId.ToString())
                .AddClaim("ip", ipAddress)
                .AddUsername(prmUser.Email);

            foreach (var role in roles)
            {
                tokenToBuild.AddRole(role);
            }

            return tokenToBuild.Build();
        }
        public static string GenerateToken2(string prmSecret, string prmIssuer, string prmAudience, User prmUser, params string[] roles)
        {
            string ipAddress = IpHelper.GetIpAddress();
            var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(prmSecret);

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(prmSecret));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);


            var claims = new Dictionary<string, object>
            {
                { ClaimTypes.Email, prmUser.Email },
                { "uid", prmUser.CasId.ToString() },
                { "ip", ipAddress },
                { JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() }
            };
            var claimsIdentity = SetClaims(prmUser);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Issuer = prmIssuer,
                Audience = prmAudience,
                Claims = claims,
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private static ClaimsIdentity SetClaims(User prmUser)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, prmUser.UserName),
                new Claim(ClaimTypes.Sid, prmUser.IdUser.ToString())
            };
            var identity = new ClaimsIdentity(claims);
            return identity;
        }

        ///// <inheritdoc />
        //public async Task<IResponse> SaveSessionTokenAsync(SessionToken sessionToken, CancellationToken cancelationToken)
        //{
        //    try
        //    {
        //        await _context.AddAsync(sessionToken, cancelationToken);
        //        await _context.SaveChangesAsync(cancelationToken);
        //        return new Response<bool>(true, $"{CASLoginAccessMessages.TokenSavedSuccessfully:D}:{CASLoginAccessMessages.TokenSavedSuccessfully.GetDescription()}");
        //    }
        //    catch (Exception)
        //    {
        //        // to do: add to log service

        //        return new Response<bool>($"{CASLoginAccessMessages.SessionTokenSaveFail:D}")
        //        {
        //            Errors = new List<string>() { CASLoginAccessMessages.SessionTokenSaveFail.GetDescription() }
        //        };
        //    }
        //}

        ///// <inheritdoc />
        //public async Task<IResponse> ClearUserSessionAsync(int userId, CancellationToken cancellationToken)
        //{
        //    try
        //    {
        //        var session = await GetUserInSessionAsync(userId, cancellationToken);

        //        if (session != null)
        //        {
        //            _context.Remove(session);
        //            await _context.SaveChangesAsync(cancellationToken);
        //        }

        //        return new Response<bool>(true, $"{CASLoginAccessMessages.SessionClear:D}:{CASLoginAccessMessages.SessionClear.GetDescription()}");
        //    }
        //    catch (Exception)
        //    {
        //        return new Response<bool>($"{CASLoginAccessMessages.ErrorSessionClear:D}:{CASLoginAccessMessages.ErrorSessionClear.GetDescription()}")
        //        {
        //            Errors = new List<string>() { CASLoginAccessMessages.ErrorSessionClear.GetDescription() }
        //        };
        //    }
        //}

        ///// <inheritdoc />
        //public async Task<SessionToken> GetUserInSessionAsync(int userId, CancellationToken cancellationToken) =>
        //    await _context.SessionTokens.FindAsync(new object[] { userId }, cancellationToken);

        ///// <inheritdoc />
        //public async Task<SessionToken> GetUserInSessionByEmailAsync(string email, CancellationToken cancellationToken) =>
        //    await _context.SessionTokens.Where(p => p.Email == email).FirstOrDefaultAsync(cancellationToken);

        ///// <inheritdoc />
        //public async Task<bool> CheckUserInSessionAsync(int userId, CancellationToken cancellationToken) =>
        //    await _context.SessionTokens.AnyAsync(p => p.UserId == userId, cancellationToken: cancellationToken);


        //public async Task<Response> Login(User pUser, string prmSecret, string prmIssuer, string prmAudience)
        //{
        //    Response Response = new();
        //    try
        //    {
        //        Task<User> result = this.GetUserByMail(pUser.Email);
        //        User user = await result;

        //        // User doesn't exist
        //        if (user == null)
        //        {
        //            Response = new Response() { IsSuccessful = true, IsValidation = true, Code = ConstantUserMessages.USER_NOT_FOUND };
        //        }
        //        // User inactive
        //        else if (!((bool)user.IsActive))
        //        {
        //            Response = new Response() { IsSuccessful = true, IsValidation = true, Code = ConstantUserMessages.USER_LOCKED };
        //        }
        //        // Failed Attempt or User blocked
        //        else if (user.FailedAttempts >= 5 || (bool)user.IsLocked)
        //        {
        //            await this.BlockUser(user.IdUser);
        //            Response = new Response() { IsSuccessful = true, IsValidation = true, Code = ConstantUserMessages.USER_LOCKED };
        //        }
        //        // Incorrect password
        //        else if (user.Password != pUser.Password)
        //        {
        //            await this.AddFailedAttempt(user.IdUser);
        //            Response = new Response { IsSuccessful = true, IsValidation = true, Code = ConstantUserMessages.USER_NOT_FOUND };
        //        }
        //        // First time to log in
        //        else if (user.IsChangePassword.Value)
        //        {
        //            await this.ResetFailedAttempts(user.IdUser);
        //            Response = new Response
        //            {
        //                IsSuccessful = true,
        //                IsValidation = true,
        //                Code = ConstantGeneralCodes.SUCCESSFUL_REQUEST,
        //                Data = new { datauser = user },
        //                Token = GenerateToken(prmSecret, prmIssuer, prmAudience, user)
        //            };
        //        }
        //        // successful
        //        else
        //        {
        //            await this.ResetFailedAttempts(user.IdUser);
        //            Response = new Response
        //            {
        //                IsSuccessful = true,
        //                IsValidation = false,
        //                Code = ConstantGeneralCodes.SUCCESSFUL_REQUEST,
        //                Data = new
        //                {
        //                    datauser = user
        //                },
        //                Token = GenerateToken(prmSecret, prmIssuer, prmAudience, user)
        //            };
        //        }
        //        // Response.Message = await _commonService.GetMessageResponseByMenuAndCode(EnumeratorMenu.AUTENTICATION, EnumeratorAction.AUTENTICATION, Response.Code, user);

        //        return Response;
        //    }
        //    catch (Exception ex)
        //    {
        //        Response.Code = ConstantGeneralCodes.ERROR;
        //        Response.Data = ex.InnerException;
        //        return Response;
        //    }
        //}

        //private static void CloseSesion(string pToken)
        //{
        //    var token = new JwtTokenBuilder().GetPrincipalFromExpiredToken(pToken);
        //}
        //public async Task ResetFailedAttempts(int pUserId)
        //{
        //    try
        //    {
        //        await _context.Set<User>().Where(u => u.IdUser == pUserId)
        //                                  .UpdateAsync(r => new User
        //                                  {
        //                                      IdUserUpdate = pUserId,
        //                                      FailedAttempts = 0,
        //                                      DateLastLogin = DateTime.Now
        //                                  });
        //    }
        //    catch (Exception)
        //    {

        //    }
        //}
        //public async Task AddFailedAttempt(int pUserId)
        //{
        //    try
        //    {
        //        User user = await _context.Users.Where(u => u.IdUser == pUserId)
        //                                        .FirstOrDefaultAsync();
        //        user.IdUserUpdate = pUserId;
        //        user.FailedAttempts++;
        //        _context.SaveChanges();

        //    }
        //    catch (Exception)
        //    {

        //    }
        //}
        //public async Task BlockUser(int pUserId)
        //{
        //    try
        //    {
        //        await _context.Set<User>().Where(u => u.IdUser == pUserId)
        //                                  .UpdateAsync(r => new User
        //                                  {
        //                                      IsLocked = true
        //                                  });
        //    }
        //    catch (Exception)
        //    {

        //    }
        //}
    }
}

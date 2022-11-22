using CLN.model.Dto;
using CLN.model.Dto.CAS;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Interfaces.HttpClient;
using CLN.services.Persistence;
using CLN.services.Services;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CLN.api.Attributes;

namespace CLN.api.Controllers.V1
{
    /// <summary>
    /// Operation over CAS
    /// </summary>
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CASController : BaseController
    {
        private readonly ICASService _casService;
        private readonly ICustomCache _cache;
        private readonly IAutenticationService _autenticationService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="casService"></param>
        /// <param name="cache"></param>
        /// <param name="autenticationService"></param>
        public CASController(
            ICASService casService,
            ICustomCache cache,
            IAutenticationService autenticationService)
        {
            _casService = casService;
            _cache = cache;
            _autenticationService = autenticationService;
        }

        /// <summary>
        /// Generate url for login
        /// </summary>
        /// <returns></returns>
        /// 

        [AllowAnonymous]
        [ApiKey]
        [HttpGet("generateUrl")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<UrlHelperLoginResponseDto>))]
        public ActionResult<Response<UrlHelperLoginResponseDto>> GenerateUrl() =>
            Ok(_casService.GenerateUrl());

        // to do
        /// <summary>
        /// Wait for finish login in CAS
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// 

        [AllowAnonymous]
        [ApiKey]
        [HttpPost("waitForLogin/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<LoginResponseDto>))]
        public async Task<ActionResult<Response<LoginResponseDto>>> WaitForLogin(Guid id) =>
            Ok(await _casService.WaitForLogin(id, default));

        /// <summary>
        /// Forgot password
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// 

        [AllowAnonymous]
        [ApiKey]
        [HttpPost("forgotPasword")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<bool>))]
        public async Task<ActionResult<Response<bool>>> ForgotPasword([FromBody] EmailDto dto) =>
            Ok(await _autenticationService.ForgotPasswordAsync(dto.Email, default));

        /// <summary>
        /// Set ticket from CAS
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ticket"></param>
        /// <returns></returns>
        /// 

        [AllowAnonymous]
        //[ApiKey]
        [HttpGet("setTicket/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<bool>))]
        public async Task<ActionResult<Response<bool>>> SetTicket(Guid id, [FromQuery] string ticket) =>
            Ok(await _casService.GetBasicUserInformationAsync(id, ticket, default));

        /// <summary>
        /// Get user profile from CAS
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpGet("getUserProfile")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<UserProfileResponseDto>))]
        public async Task<ActionResult<Response<UserProfileResponseDto>>> GetUserProfile([FromHeader] string token) =>
            Ok(await _casService.GetUserProfileAsync(token, default));

        /// <summary>
        /// Get user company information from CAS
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        [HttpGet("getUserCompanyInformation/{companyId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<CompanyProfileDto>))]
        public async Task<ActionResult<Response<CompanyProfileDto>>> GetUserCompanyInformation(int companyId) =>
            Ok(await _casService.GetUserCompanyInformationAsync(companyId, default));

        /// <summary>
        /// Check ticket in cache
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// 

        [AllowAnonymous]
        [ApiKey]
        [HttpGet("checkTicketFromCache")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<string>))]
        public ActionResult<Response<string>> CheckTicketFromCache(Guid id)
        {
            _cache.TryGetValue($"ticket-{id}", out object ticket);
            return Ok(new Response<string>(data: ticket?.ToString()));
        }

        ///// <summary>
        ///// Set user token from CAS
        ///// </summary>
        ///// <param name="dto"></param>
        ///// <returns></returns>
        //[HttpPost("setUserToken")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<bool>))]
        //public async Task<ActionResult<Response<bool>>> SetUserToken([FromBody] UserTokenDto dto) =>
        //    Ok(await _casService.SetUserTokenAsync(dto.CasToken, default));

        ///// <summary>
        ///// Clear session for a User. Receive the user Id from CAS.
        ///// </summary>
        ///// <param name="userId"></param>
        ///// <returns></returns>
        //[HttpDelete("clearUserSession/{userId}")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<bool>))]
        //public async Task<ActionResult<Response<bool>>> ClearUserSession(int userId) =>
        //    Ok(await _autenticationService.ClearUserSessionAsync(userId, default));

        ///// <summary>
        ///// Check if user is login in CAS. If user is in session return the same model of wait for login with de CLN token. 
        ///// </summary>
        ///// <param name="dto"></param>
        ///// <returns></returns>
        //[HttpPost("CheckUserInSessionAndGetToken")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<LoginResponseDto>))]
        //public async Task<ActionResult<Response<LoginResponseDto>>> CheckUserInSession([FromBody] EmailDto dto) =>
        //    Ok(await _casService.LoginwithUserInSessionAsync(dto.Email, default));    

        //[HttpGet("token")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<string>))]
        //public async Task<ActionResult<Response<string>>> Token()
        //{
        //    var user = await _autenticationService.GetUserByIdAsync(5, default);
        //    var token = AutenticationService.GenerateToken(_settings.Secret, _settings.PdetIssuerJwt, _settings.PdetAudienceJwt, user, "Admin");

        //    return Ok(new Response<string>(token.Value, "ok"));
        //}

        //[HttpGet("checkToken")]
        //[Authorize(Roles = "Admin")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<string>))]
        //public async Task<ActionResult<Response<string>>> CheckToken()
        //{
        //    var id = UserId;
        //    var email = UserEmail;
        //    var ip = Ip;

        //    return Ok(new Response<string>($"{id}-{email}-{ip}", "ok"));
        //}
    }
}

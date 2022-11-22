using CLN.model.Dto.CAS;
using CLN.model.Dto.User;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers.V1
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get companies associate to user from CAS and update companies information
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPut("updateUserCompaniesInformation/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<IEnumerable<CompanyProfileDto>>))]
        public async Task<ActionResult<Response<IEnumerable<CompanyProfileDto>>>> UpdateUserCompaniesInformation(int userId) =>
            Ok(await _userService.UpdateUserCompaniesInformationAsync(userId, default));

        /// <summary>
        /// Get user companies identifier
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("getUserCompaniesIdentifier/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<UserCompaniesIdDto>))]
        public async Task<ActionResult<Response<UserCompaniesIdDto>>> GetUserCompaniesIdentifier(int userId) =>
            Ok(await _userService.GetUserCompaniesIdentifierAsync(userId, default));

        /// <summary>
        /// Get user companies
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("getUserCompanies/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<IEnumerable<CompanyProfileDto>>))]
        public async Task<ActionResult<Response<IEnumerable<CompanyProfileDto>>>> GetUserCompanies(int userId) =>
            Ok(await _userService.GetUserCompaniesAsync(userId, default));

        /// <summary>
        /// Get user companies from CAS
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("getUserCompaniesFromCAS/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<IEnumerable<CompanyProfileDto>>))]
        public async Task<ActionResult<Response<IEnumerable<CompanyProfileDto>>>> GetUserCompaniesFromCAS(int userId) =>
            Ok(await _userService.GetUserCompaniesFromCASAsync(userId, default));

        [HttpGet]
        [Route("GetMenubyUser")]
        public async Task<IActionResult> GetMenubyUser(string idUser)
        {
            try
            {
                //var idUser = UserId;
                var obj = await _userService.GetMenubyUser(idUser);

                if (obj == null)
                    return NotFound();

                return Ok(obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetPermitsbyUserandMenu")]
        public async Task<IActionResult> GetPermitsbyUserandMenu(string UserId)
        {
            try
            {
                var idUser = UserId;
                var obj = await _userService.GetPermitsbyUserandMenu(idUser);

                if (obj == null)
                    return NotFound();

                return Ok(obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetMenusandPermitsbyUser")]
        public async Task<IActionResult> GetMenusandPermitsbyUser(string emailUser)
        {
            try
            {
                var idUser = UserId;
                var obj = await _userService.GetMenusandPermitsbyUser(idUser, emailUser);

                if (obj == null)
                    return NotFound();

                return Ok(obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getUserCompaniestoManage")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUserCompaniestoManage(string emailUser)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));
            var idUser = UserId;

            var result = await _userService.GetUserCompaniestoManage(idUser, emailUser);
            return Ok(result);
        }

        [HttpGet]
        [Route("closeSession")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CloseSession(string urlCLN)
        {
            if (urlCLN == null)
                return BadRequest();
            var result = await _userService.CloseSession(urlCLN);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene usuarios de empresas para citas de negocio virtuales
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetUserCompaniestoAppointments")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUserCompaniestoAppointments(string emailUser)
        {
            var idUser = UserId;

            var schema = await _userService.GetUserCompaniestoAppointments(idUser,emailUser);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }
    }
}

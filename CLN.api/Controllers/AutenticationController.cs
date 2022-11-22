using CLN.api.Attributes;
using CLN.model.APIModels;
using CLN.model.Dto.Login;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AutenticationController : BaseController
    {
        public readonly IAutenticationService _autenticacion;
        private readonly IOptions<AppSettings> _settings;

        public AutenticationController(IAutenticationService pAutenticacion, IOptions<AppSettings> settings)
        {
            _autenticacion = pAutenticacion;
            _settings = settings;
        }

        //[HttpPost]
        //[Route("Login")]
        //public async Task<IActionResult> Login([FromBody] User pUser)
        //{
        //    try
        //    {
        //        Task<Response> result = _autenticacion.Login(pUser, _settings.Value.Secret, _settings.Value.pdetIssuerJwt, _settings.Value.pdetAudienceJwt);

        //        Response Response = await result;

        //        return Ok(Response);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}

        [AllowAnonymous]
        [ApiKey]
        [HttpPost]
        [Route("Token")]
        public async Task<IActionResult> Login()
        {
            try
            {
                var jsonModel = "{\"Id\":\"483761\",\"Token\":\"U0VTUzIwYTYwN2Q1YTRiZjMxNjMyZDgxZjIxNzg3NjQzMWIyfGVQYUZET3dIRW05WlBpUk1qWWhFaVZDbmZTdDJ3c1I5c1lUdnVYR0NuRGN8eDVpQ2g1YzNJY0lzN0FRMlJlYXd4NXNQbkJBRWVJaG4tbnJlMjVkVWJEZw\",\"Username\":\"user70999\",\"FirstName\":\"Carlos\",\"LastName\":\"Salamanca\",\"Companies\":[],\"IsAdmin\":\"false\",\"Email\":\"charlie.salamein@gmail.com\",\"Country\":\"Colombia\",\"CountryCode\":\"CO\"}";
                var obj = JsonConvert.DeserializeObject<CASLoginDto>(jsonModel);
                var Response = await _autenticacion.LoginCASAsync(obj, default);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
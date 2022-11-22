using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CLN.api.Validators;
using CLN.model.APIModels;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CLN.api.Attributes;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CommonController : BaseController
    {
        private readonly ICommonService _commonService;
        private readonly IOptions<AppSettings> _settings;
        private readonly AlertValidator _alertValidator;
        private readonly ICustomCache _cache;

        public CommonController(ICustomCache cache, IOptions<AppSettings> settings, ICommonService commonService
            , AlertValidator alertValidator)
        {
            _settings = settings;
            _commonService = commonService;
            _alertValidator = alertValidator;
        }

        [HttpGet]
        [Route("GetStates")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetStates()
        {

            var result = await _commonService.GetStates();
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getTerritorialentities")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetTerritorialentities()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _commonService.GetTerritorialentities();
            return Ok(result);
        }

        [HttpGet]
        [Route("getTerritorialentitiesInHiringProcess")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetTerritorialentitiesInHiringProcess()
        {

            var result = await _commonService.GetTerritorialentitiesInHiringProcess();
            return Ok(result);
        }

        [HttpGet]
        [Route("getNotificationType")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetNotificationType()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _commonService.GetNotificationType();
            return Ok(result);
        }

        [HttpPost]
        [Route("uploadFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile(IList<IFormFile> files)
        {
            try
            {
                var paths = new Dictionary<string, string>
                {
                    { "directoryBase", _settings.Value.DirectoryBase },
                    { "directoryBaseDocument", _settings.Value.DirectoryBase }
                };

                if (this.UserId == null)
                    return Forbid("Usuario no autenticado");

                var result = "";//await _commonService.SavePlanSupportDocument(paths, files, HttpContext, 2);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }


        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getTittleConsolidados")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetTittleConsolidados()
        {
            var result = await _commonService.GetTittleConsolidados();
            return Ok(result);
        }

        [HttpGet]
        [Route("getMonthList")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetMonthList()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _commonService.GetMonthList();
            return Ok(result);
        }

        [HttpGet]
        [Route("getPersonType")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetPersonType()
        {
            var result = await _commonService.GetPersonType();
            return Ok(result);
        }

        [HttpGet]
        [Route("getCharacterizationList")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetCharacterizationList()
        {
            var result = await _commonService.GetCharacterizationList();
            return Ok(result);
        }

        [HttpGet]
        [Route("getCommercialInfoList")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetCommercialInfoList()
        {
            var result = await _commonService.GetCommercialInfoList();
            return Ok(result);
        }

        [HttpGet]
        [Route("getFrequencyList")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetFrequencyList()
        {
            var result = await _commonService.GetFrequencyList();
            return Ok(result);
        }

        [HttpGet]
        [Route("getSectorsList")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetSectorsList()
        {
            var result = await _commonService.GetSectorsList();
            return Ok(result);
        }

        [HttpGet]
        [Route("getAlerts")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAlerts()
        {
            var result = await _commonService.GetAlerts();
            return Ok(result);
        }

        [HttpGet]
        [Route("getAlertsById")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAlertsById(int id)
        {
            var result = await _commonService.GetAlertsById(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("getAlertsByName")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAlertsByName(string name)
        {
            var result = await _commonService.GetAlertsByName(name);
            return Ok(result);
        }

        /// <summary>
        /// Actualiza una alerta por id
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("putStateAlert")]
        public async Task<IActionResult> PutStateAlert(int idAlert, bool isActive)
        {
            try
            {
                var cts = await _commonService.PutStateAlert(idAlert, isActive);
                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Actualiza una alerta por id
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("deleteAlert")]
        public async Task<IActionResult> DeleteAlert(int idAlert)
        {
            try
            {
                var cts = await _commonService.DeleteAlert(idAlert);
                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("postAlerts")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> PostAlerts(AlertDto alert)
        {
            var validation = _alertValidator.Validate(alert);
            if (!validation.IsValid)
            {
                return BadRequest(validation.Errors);
            }
            var result = await _commonService.PostAlerts(alert);
            return Ok(result);
        }

        [HttpPost]
        [Route("saveImageForAlerts")]
        public async Task<IActionResult> SaveImageForAlerts(IFormFile pFile)
        {
            try
            {
                string directory = _settings.Value.DirectoryMultimediaAlerts;
                var obj = await _commonService.SaveImageForAlerts(pFile, directory);
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getCacheInfo")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetCacheInfo(string key)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            _cache.TryGetValue(key, out object result);
            return Ok(result);
        }

        /*[AllowAnonymous]
        [HttpGet]
        [Route("getApiKeyValue")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetApiKey()
        {
            var apiKey = _settings.Value.ApiKey;
            var apiKeyEncrypt = services.Helpers.Helpers.EncryptSha1(apiKey);
            return Ok(new { apiKey, apiKeyEncrypt });
        }*/
    }
}

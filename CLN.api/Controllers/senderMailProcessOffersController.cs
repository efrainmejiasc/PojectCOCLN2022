using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CLN.api.Attributes;
using CLN.model.APIModels;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Serilog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class senderMailProcessOffersController : BaseController
    {
        private readonly ISenderMailProcessService _senderMailProcessService;
        private readonly IOptions<AppSettings> _settings;
        public senderMailProcessOffersController(IOptions<AppSettings> settings, ISenderMailProcessService senderMailProcessService)
        {
            _settings = settings;
            _senderMailProcessService = senderMailProcessService;
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetMailsProcessOffers")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetMailsProcessOffers()
        {
            var rta = await _senderMailProcessService.SenderMailProcessOfferrsAsync();
            if (rta == null)
                return NotFound();
            return Ok(rta);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getInfoMailSended")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetInfoMailSended(string email)
        {
            var result = await _senderMailProcessService.GetInfoMailSended(email);
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("senderAlertsAsync")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SenderAlertsAsync()
        {
            var rta = await _senderMailProcessService.SenderAlertsAsync();
            if (rta == null)
                return NotFound();
            return Ok(rta);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("SubmitNewCLNContentsAsync")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SubmitNewCLNContentsAsync()
        {
            var rta = await _senderMailProcessService.SubmitNewCLNContentsAsync(default);
            if (rta == null)
                return NotFound();
            return Ok(rta);
        }
    }
}
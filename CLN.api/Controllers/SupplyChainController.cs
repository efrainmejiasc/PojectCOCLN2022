using CLN.model.APIModels;
using CLN.model.ErrorMessages;
using CLN.model.Settings;
using CLN.services.Extensions;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SupplyChainController : BaseController
    {
        private readonly ISupplyChainService _supplyChainService;
        private readonly SupplyChainSettings _supplyChainSettings;
        public SupplyChainController(ISupplyChainService supplyChainService, IOptions<SupplyChainSettings> supplyChainSettings)
        {
            _supplyChainService = supplyChainService;
            _supplyChainSettings = supplyChainSettings.Value;
        }

        [HttpGet]
        [Route("getSupplyElements")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetSupplyElements()
        {
            var result = await _supplyChainService.GetSupplyElements();
            return Ok(result);
        }

        [HttpGet]
        [Route("getSupplyElementTemplates")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetSupplyElementTemplates()
        {
            var result = await _supplyChainService.GetSupplyElementTemplates();
            return Ok(result);
        }

        [HttpGet]
        [Route("getSupplyChainbyCompanyAndUser")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetSupplyChainbyCompanyAndUser(string companyId, string user)
        {
            var result = await _supplyChainService.GetSupplyChainbyCompanyAndUser(companyId, UserEmail, user);
            return Ok(result);
        }

        [HttpPost]
        [Route("createSupplyChain")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateSupplyChain(SupplyChainDto supplyChain)
        {
            var result = await _supplyChainService.CreateSupplyChain(supplyChain, UserEmail);
            return Ok(result);
        }

        [HttpPost]
        [Route("updateSupplyChain")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateSupplyChain (SupplyChainDto supplyChain)
        {
            var result = await _supplyChainService.UpdateSupplyChain(supplyChain, UserEmail);
            return Ok(result);
        }

        [HttpPost]
        [Route("deleteSupplyChainElement")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteSupplyChainElement(SupplyChainElementDto supplyChainElement)
        {
            var result = await _supplyChainService.DeleteSupplyChainElement(supplyChainElement, UserEmail);
            return Ok(result);
        }

        [HttpGet]
        [Route("DownloadSupplyChainbyCompanyAndUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DownloadSupplyChainbyCompanyAndUser(string companyId, string user)
        {
            var result = await _supplyChainService.GetSupplyChainbyCompanyAndUsertoDownload(companyId, UserEmail, user);

            if (result == null)
                return NoContent();

            var fileObj = services.Helpers.Helpers.DownloadFile(result, _supplyChainSettings.FileName);

            return File((MemoryStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
        }
    }
}
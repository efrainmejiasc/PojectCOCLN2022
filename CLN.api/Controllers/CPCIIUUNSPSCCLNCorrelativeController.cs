//using CLN.model.APIModels;
using CLN.api.Attributes;
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
    public class CPCIIUUNSPSCCLNCorrelativeController : BaseController
    {
        private readonly ICPCIIUUNSPSCCLNCorrelativeService _correlativeService;
        private readonly IOptions<AppSettings> _settings;
        private readonly CorrelativeSettings _correlativeSettings;
        public CPCIIUUNSPSCCLNCorrelativeController(IOptions<AppSettings> settings, ICPCIIUUNSPSCCLNCorrelativeService correlativeService
            , IOptions<CorrelativeSettings> correlativeSettings)
        {
            _settings = settings;
            _correlativeService = correlativeService;
            _correlativeSettings = correlativeSettings.Value;
        }

        [HttpPost]
        [Route("validateFile")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ValidateFile(IList<IFormFile> files)
        {
            //if (UserEmail == null)
            //    return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}",true));

            var result = await _correlativeService.ValidateFile(files);
            return Ok(result);
        }

        [HttpGet]
        [Route("getValidationReportFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetValidationReportFile(string fileIdentifier)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = _correlativeService.GetValidationReportFile(fileIdentifier);

                if (result == null)
                    return Ok("No se pudo generar el archivo");

                var fileObj = services.Helpers.Helpers.DownloadFile(result, _correlativeSettings.ValidationRecordFile);

                return File((MemoryStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                            (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                            (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));            
        }

        [HttpPost]
        [Route("uploadCorrelativeRecords")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UploadCorrelativeRecords(string fileIdentifier)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _correlativeService.UploadCorrelativeRecords(fileIdentifier, UserEmail);
            return Ok(result);
        }

        [HttpGet]
        [Route("getCorrelativeTemplateFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetCorrelativeTemplateFile()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var fileLocation = _correlativeSettings.TemplateFile;
            var fileName = _correlativeSettings.TemplateFileName;

            if (fileLocation == null)
                return Ok("No se pudo generar el archivo");

            var fileObj = services.Helpers.Helpers.DownloadFile(fileLocation, fileName);

            return File((FileStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
        }

        [HttpGet]
        [Route("getUploadedCorrelativeRecords")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetUploadedCorrelativeRecords()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _correlativeService.GetUploadedCorrelativeRecords();

            if (result == null)
                return Ok("No se pudo generar el archivo");

            var fileObj = services.Helpers.Helpers.DownloadFile(result, _correlativeSettings.TemplateFileName);

            return File((MemoryStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
        }

        [HttpGet]
        [Route("getCorrelativeFileName")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCorrelativeFileName()
        {
            var result = await _correlativeService.GetCorrelativeFileName();
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getCorrelativeSectorsAndProducts")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetCPCIIUUNSPSCCLNCorrelativeSectorsAndProducts()
        {
            var result = await _correlativeService.GetCPCIIUUNSPSCCLNCorrelativeSectorsAndProducts();
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getCPCIIUUNSPSCCLNCorrelativeProductsSectors")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsSectors(string strPDP, string strCP)
        {
            var result = await _correlativeService.GetCPCIIUUNSPSCCLNCorrelativeProductsSectors( strPDP,  strCP);
            return Ok(result);
        }

        [HttpGet]
        [Route("getCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector(string sector)
        {
            var result = await _correlativeService.GetCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector(sector);
            return Ok(result);
        }

        [HttpGet]
        [Route("getCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup(string grupo)
        {
            var result = await _correlativeService.GetCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup(grupo);
            return Ok(result);
        }

        [HttpGet]
        [Route("setCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment(string segment)
        {
            var result = await _correlativeService.GetCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment(segment);
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily(string family, string strPDP, string strCP)
        {
            var result = await _correlativeService.GetCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily(family, strPDP,  strCP);
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getCPCIIUUNSPSCCLNCorrelativeProductsByClass")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetCPCIIUUNSPSCCLNCorrelativeProductsByClass(string clase, string strPDP, string strCP)
        {
            var result = await _correlativeService.GetCPCIIUUNSPSCCLNCorrelativeProductsByClass(clase, strPDP, strCP);
            return Ok(result);
        }
        //[HttpGet]
        //[Route("ExportarArbolExcel")]
        //[ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        //[ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        //[ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        //public async Task<Object> ExportarArbolExcel(int level, string param)
        //{
        //    var result = await _correlativeService.ExportarArbolExcel(level, param);
        //    return Ok(result);
        //}
    }
}

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
    public class UNSPSCClassifierController : BaseController
    {
        private readonly IUNSPSCClassifierService _classifierService;
        private readonly IOptions<AppSettings> _settings;
        private readonly ClassifierSettings _classifierSettings;
        public UNSPSCClassifierController(IOptions<AppSettings> settings, IUNSPSCClassifierService classifierService
            , IOptions<ClassifierSettings> classifierSettings)
        {
            _settings = settings;
            _classifierService = classifierService;
            _classifierSettings = classifierSettings.Value;
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

            var result = await _classifierService.ValidateFile(files);
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

            var result = _classifierService.GetValidationReportFile(fileIdentifier);

                if (result == null)
                    return Ok("No se pudo generar el archivo");

                var fileObj = services.Helpers.Helpers.DownloadFile(result, _classifierSettings.ValidationRecordFile);

                return File((MemoryStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                            (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                            (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));            
        }

        [HttpPost]
        [Route("uploadClassifierRecords")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UploadClassifierRecords(string fileIdentifier)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _classifierService.UploadClassifierRecords(fileIdentifier, UserEmail);
            return Ok(result);
        }

        [HttpGet]
        [Route("getClassifierTemplateFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> getClassifierTemplateFile()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var fileLocation = _classifierSettings.TemplateFile;
            var fileName = _classifierSettings.TemplateFileName;

            if (fileLocation == null)
                return Ok("No se pudo generar el archivo");

            var fileObj = services.Helpers.Helpers.DownloadFile(fileLocation, fileName);

            //var a  = File((FileStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
            //            (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
            //            (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
            return File((FileStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
        }

        [HttpGet]
        [Route("getUploadedClassifierRecords")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetUploadedClassifierRecords()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _classifierService.GetUploadedClassifierRecords();

            if (result == null)
                return Ok("No se pudo generar el archivo");

            var fileObj = services.Helpers.Helpers.DownloadFile(result, _classifierSettings.TemplateFileName);

            return File((MemoryStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
        }

        [HttpGet]
        [Route("getClassifierFileName")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetClassifierFileName()
        {
            var result = await _classifierService.GetClassifierFileName();
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getClassifiersNodeChildren")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUNSPSCClassifiersNodeChildren(int nodeCode, int level)
        {
            var result = await _classifierService.GetUNSPSCClassifiersNodeChildren(nodeCode, level);
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getProductsUNSPSCZeroLevel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetProductsUNSPSCFirstLevel()
        {
            var result = await _classifierService.GetProductsUNSPSCZeroLevel();
            return Ok(result);
        }


        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getProductsUNSPSCFirstLevel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetProductsUNSPSCFirstLevel(string grupo)
        {
            var result = await _classifierService.GetProductsUNSPSCFirstLevel(grupo);
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getProductsUNSPSCBySegmentCodeSecondLevel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetProductsUNSPSCBySegmentCodeSecondLevel(string segment)
        {
            var result = await _classifierService.GetProductsUNSPSCBySegmentCodeSecondLevel(segment);
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getProductsUNSPSCByFamilyCodeThirdLevel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetProductsUNSPSCByClassCodeThirdLevel(string family)
        {
            var result = await _classifierService.GetProductsUNSPSCByFamilyCodeThirdLevel(family);
            return Ok(result);
        }


        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getProductsUNSPSCByClassCodeFourthLevel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetProductsUNSPSCByClassCodeFourthLevel(string clase)
        {
            var result = await _classifierService.GetProductsUNSPSCByClassCodeFourthLevel(clase);
            return Ok(result);
        }


        [HttpGet]
        [Route("ExportarArbolExcel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> ExportarArbolExcel(int level, string param)
        {
            var result = await _classifierService.ExportarArbolExcel(level, param);
            return Ok(result);
        }
    }
}

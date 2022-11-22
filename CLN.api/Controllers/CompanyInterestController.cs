using CLN.api.Attributes;
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
    public class CompanyInterestController : BaseController
    {
        private readonly ICompanyInterestService _companyInterestService;
        private readonly IOptions<AppSettings> _settings;
        public CompanyInterestController(IOptions<AppSettings> settings, ICompanyInterestService companyInterestService)
        {
            _settings = settings;
            _companyInterestService = companyInterestService;
        }

        [HttpGet]
        [Route("getHiringProcessesStage")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessesStage()
        {
            //_=UserId;_ = CasId;_ = Ip;

            //if (UserEmail == null)
            //    return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.GetHiringProcessesStage();
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getHiringProcessesMode")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessesMode()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.GetHiringProcessesMode();
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("filterCompaniesNameWithHiringProcess")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> FilterCompaniesNameWithHiringProcess(string companyNameFilter)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.FilterCompaniesNameWithHiringProcess(companyNameFilter);
            return Ok(result);
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("filterProcessByObjectWord")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> FilterProcessByObject(string objectFilter)
        {
            var result = await _companyInterestService.FilterProcessByObject(objectFilter);
            return Ok(result);
        }


        [HttpGet]
        [Route("getHiringProcessMaximumValue")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessMaximumValue()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.GetHiringProcessMaximumValue();
            return Ok(result);
        }

        [HttpGet]
        [Route("getCompanyInterest")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetCompanyInterest(int companyId)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.GetCompanyInterest(companyId);
            return Ok(result);
        }

        [HttpPost]
        [Route("createCompanyInterest")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateCompanyInterest(CompanyInterestDto companyInterest)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.CreateCompanyInterest(companyInterest, UserEmail);
            return Ok(result);
        }

        [HttpPost]
        [Route("updateCompanyInterest")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateCompanyInterest(CompanyInterestDto companyInterest)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.UpdateCompanyInterest(companyInterest, UserEmail);
            return Ok(result);
        }

        [HttpGet]
        [Route("getCompanyInterestNotification")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetCompanyInterestNotification(int companyId)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.GetCompanyInterestNotification(companyId);
            return Ok(result);
        }

        [HttpPost]
        [Route("setCompanyInterestNotification")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> SetCompanyInterestNotification(List<CompanyInterestNotificationDto> companyInterestNotification)
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.SetCompanyInterestNotification(companyInterestNotification, UserEmail);
            return Ok(result);
        }

        [HttpGet]
        [Route("getContractModalities")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetContractModalities()
        {
            var result = await _companyInterestService.GetContractModalities();
            return Ok(result);
        }

        [HttpGet]
        [Route("getProcessCompanyByFilter")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetProcessCompanyByFilter([FromQuery]CompanyOffersByFilter filter)
        {
            var result = await _companyInterestService.GetProcessCompanyByFilter(filter);
            return Ok(result);
        }

        [HttpGet]
        [Route("getAcquisitionsCompanyByFilter")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetAcquisitionsCompanyByFilter([FromQuery] CompanyOffersByFilter filter)
        {
            var result = await _companyInterestService.GetAcquisitionsCompanyByFilter(filter);
            return Ok(result);
        }
        [HttpGet]
        [Route("ExportarProcessExcel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> ExportarProcessExcel([FromQuery] CompanyOffersByFilter filter)
        {
            var result = await _companyInterestService.ExportarProcessExcel(filter);
            return Ok(result);
        }
        [HttpGet]
        [Route("ExportarAcquisitionsExcel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> ExportarAcquisitionsExcel([FromQuery] CompanyOffersByFilter filter)
        {
            var result = await _companyInterestService.ExportarAcquisitionsExcel(filter);
            return Ok(result);
        }

        [HttpGet]
        [Route("getCompanies")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetCompanies()
        {
            var result = await _companyInterestService.GetCompanies();
            return Ok(result);
        }

        [HttpGet]
        [Route("getEntitiesByIdCompany")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetEntitiesByIdCompany(int idCompany)
        {
            var result = await _companyInterestService.GetEntitiesByIdCompany(idCompany);
            return Ok(result);
        }

        [HttpGet]
        [Route("getEntitiesByIdCompanyForProcess")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetEntitiesByIdCompanyForProcess(int idCompany)
        {
            var result = await _companyInterestService.GetEntitiesByIdCompanyForProcess(idCompany);
            return Ok(result);
        }

        [HttpGet]
        [Route("geAcquisitionPlanMaximumValue")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAcquisitionPlanMaximumValue()
        {
            //if (UserEmail == null)
            //return Ok(new Response(message: $"{WellKnownErrors.UserNotFound.GetDescription()}", true));

            var result = await _companyInterestService.GetAcquisitionPlanMaximumValue();
            return Ok(result);
        }
    }
}

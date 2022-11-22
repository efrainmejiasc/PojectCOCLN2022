
using CLN.model.APIModels.UIC;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using CLN.api.Attributes;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReportPatagonianController : BaseController
    {
        private readonly IPatagonianReportService _patagonianReportService;
        private readonly IOptions<CASSettings> _settings;
        private readonly IOptions<CASUrlSettings> _settingsUrl;
        public ReportPatagonianController(IPatagonianReportService patagonianReportService, IOptions<CASSettings> settings, IOptions<CASUrlSettings> settingsUrl)
        {
            this._patagonianReportService = patagonianReportService;
            this._settings = settings;
            this._settingsUrl = settingsUrl;
        }

        /// <summary>
        /// Consume API de Patagonian para crear reportes :Cursos, Comunidades, Empresas
        /// </summary>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetDataPatagonian")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> GetDataPatagonian()
        {
            var clientToken = _settings.Value.clientToken;
            var urlBase = _settingsUrl.Value.BaseUrl;
            var userInCourseUrl = _settingsUrl.Value.UserInCourseUrl;
            var companyInCourseUrl = _settingsUrl.Value.CompanyInCourseUrl;
            var communityUrl = _settingsUrl.Value.CommunityUrl;
            var businessOpportunityUrl = _settingsUrl.Value.Business_OpportunityUrl;
            var companyInCommunityUrl = _settingsUrl.Value.CompanyInCommunityUrl;
            var applicationsProductsServicesUrl = _settingsUrl.Value.ApplicationsProductsServicesUrl;


            var resultado = await this._patagonianReportService.SetDataDbPatagonianAsync(clientToken, urlBase, userInCourseUrl, companyInCourseUrl, 
                                                                                         communityUrl, businessOpportunityUrl, companyInCommunityUrl,
                                                                                         applicationsProductsServicesUrl);

            return Ok(resultado);

        }

    }
}

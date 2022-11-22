using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CLN.api.Attributes;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReportTrendsController : BaseController
    {
        private readonly IReportTrendsService _reportTrendsService;

        public ReportTrendsController(IReportTrendsService reportTrendsService)
        {
            this._reportTrendsService = reportTrendsService;
        }

        /// <summary>
        /// Devuelve url para reportes de tendencias CLN 
        /// </summary>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetReportTrendsUrls")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetReportTrendsUrls()
        {

            var gUrls = await _reportTrendsService.GetReportTrendsUrls();
            if (gUrls == null)
                return NotFound();

            return Ok(gUrls);


        }
    }
}

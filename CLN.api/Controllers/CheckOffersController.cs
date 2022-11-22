using CLN.model.Settings;
using CLN.services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CheckOffersController : BaseController
    {
        private readonly IHiringProcessService _hiringProcessService;
        private readonly IOptions<AppSettings> _settings;
        public CheckOffersController(IOptions<AppSettings> settings, IHiringProcessService hiringProcessService)
        {
            _settings = settings;
            _hiringProcessService = hiringProcessService;
        }
        [HttpGet]
        [Route("GetHiringProcessesSecopOne")]
        public async Task<IActionResult> GetHiringProcessesSecopOne()
        {
            
            try
            {
                string strUrl = _settings.Value.SecopOneUrl;
                string strQuery = _settings.Value.QuerySecopOne;
                var cts =  await _hiringProcessService.GetHiringProcessesSecopOne(strUrl, strQuery);

                if (cts == null)
                    return NotFound();

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetHiringProcessesSecopTwo")]
        public async Task<IActionResult> GetHiringProcessesSecopTwo()
        {
            try
            {
                string strUrl = _settings.Value.SecopTwoUrl;
                string strQuery = _settings.Value.QuerySecopTwo;
                var cts = await _hiringProcessService.GetHiringProcessesSecopTwo(strUrl, strQuery);

                if (cts == null)
                    return NotFound();

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

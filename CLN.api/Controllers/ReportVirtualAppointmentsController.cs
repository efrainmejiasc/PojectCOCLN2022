using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReportVirtualAppointmentsController : BaseController
    {
        private readonly IReportVirtualAppointmentsService _reportVirtualAppointmentsService;
        private readonly VirtualAppointmentSettings _appointmentSettings;

        public ReportVirtualAppointmentsController(IReportVirtualAppointmentsService reportVirtualAppointmentsService, IOptions<VirtualAppointmentSettings> appointmentSettings)
        {
            _reportVirtualAppointmentsService = reportVirtualAppointmentsService;
            _appointmentSettings = appointmentSettings.Value;
        }

        /// <summary>
        /// Devuelve url para reportes de citas virtuales CLN 
        /// </summary>
        [HttpGet]
        [Route("GetVirtualAppointmentsReports")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetVirtualAppointmentsReports()
        {
            var result = await _reportVirtualAppointmentsService.GetVirtualAppointmentsReports();
            return Ok(result);
        }

        /// <summary>
        /// Devuelve url para reportes de citas virtuales CLN 
        /// </summary>
        [HttpGet]
        [Route("GetVirtualAppointmentsReportsExcel")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetVirtualAppointmentsReportsExcel(string startDate, string endDate)
        {
            var result = await _reportVirtualAppointmentsService.GetVirtualAppointmentsReportExcel(startDate, endDate, _appointmentSettings.SheetName);

            if (result == null)
                return NoContent();

            var fileObj = services.Helpers.Helpers.DownloadFile(result, _appointmentSettings.FileName);

            return File((MemoryStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
        }
    }
}

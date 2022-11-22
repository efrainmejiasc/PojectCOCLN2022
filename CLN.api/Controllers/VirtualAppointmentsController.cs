using Microsoft.AspNetCore.Mvc;
using CLN.services.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using CLN.model.Models;
using CLN.services.Wrappers;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VirtualAppointmentsController : BaseController
    {
        private readonly IVirtualAppointmentsService _virtualAppointmentsService;

        public VirtualAppointmentsController(IVirtualAppointmentsService virtualAppointmentsService)
        {
            this._virtualAppointmentsService = virtualAppointmentsService;
        }


        /// <summary>
        /// Obtiene el horario disponible de una empresa pora las citas virtuales
        /// </summary>
        /// <param name="nit">Identificador de la empresa</param>
        /// <returns></returns>

        [HttpGet]
        [Route("GetAvailableHoursCompany/{nit}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAvailableHoursCompany(string nit)
        {
            if (string.IsNullOrEmpty(nit))
                return BadRequest("El identificador de la empresa no puede ser vacio");


            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._virtualAppointmentsService.GetAvailableHoursCompany(nit, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Obtiene el horario disponible de una empresa pora las citas virtuales
        /// </summary>
        /// <param name="nit">Identificador de la empresa</param>
        /// <param name="startDate">Fecha inicial de la consulta  yyyy-MM-ddTHH:mm:ss.SSSZ</param>
        /// <param name="endDate">Fecha final de la consulta yyyy-MM-ddTHH:mm:ss.SSSZ</param>
        /// <returns></returns>

        [HttpGet]
        [Route("GetAvailableHoursCompany/{nit}/{startDate}/{endDate}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAvailableHoursCompanyEspecificBetweenDate(string nit, string  startDate, string endDate)
        {
            if (string.IsNullOrEmpty(nit))
                return BadRequest("El identificador de la empresa no puede ser vacio");

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var startDateTime = Convert.ToDateTime(startDate).ToUniversalTime();
            var endDateTime = Convert.ToDateTime(endDate).ToUniversalTime();

            var schema = await this._virtualAppointmentsService.GetAvailableHoursCompanyEspecificBetweenDate(nit, startDateTime,endDateTime);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Actualiza el horario disponible de la empresa para citas virtuales 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPut]
        [Route("UpdateAvailableHoursCompany")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAvailableHoursCompany([FromBody] AvailableHoursCompanyDto model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._virtualAppointmentsService.UpdateAvailableHoursCompany(model,iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Crea Inclusion/Exclusion de fecha especifica de la empresa para citas virtuales 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPost]
        [Route("CreateAvailableHoursCompanyEspecific")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateAvailableHoursCompanyEspecific([FromBody] AvailableHoursCompanyEspecificDto model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._virtualAppointmentsService.UpdateAvailableHoursCompanyEspecific(model, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Actualiza Inclusion/Exclusion de fecha especifica de la empresa para citas virtuales 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPut]
        [Route("UpdateAvailableHoursCompanyEspecific")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAvailableHoursCompanyEspecific([FromBody] AvailableHoursCompanyEspecificDto model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._virtualAppointmentsService.UpdateAvailableHoursCompanyEspecific(model, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }
    }
}

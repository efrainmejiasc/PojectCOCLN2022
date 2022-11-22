using CLN.api.Attributes;
using CLN.model.Models;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ScheduledVirtualAppointmentsController : BaseController
    {
        private readonly IScheduledVirtualAppointmentsService _scheduledVirtualAppointmentsService;

        public ScheduledVirtualAppointmentsController(IScheduledVirtualAppointmentsService scheduledVirtualAppointmentsService, IWebHostEnvironment hostEnvironment)
        {
            this._scheduledVirtualAppointmentsService = scheduledVirtualAppointmentsService;
        }


        /// <summary>
        /// Obtiene listado motivos para citas de negocios virtuales
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [Route("GetReasonVirtualAppointments")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetReasonVirtualAppointments()
        {
            var schema = await this._scheduledVirtualAppointmentsService.GetReasonVirtualAppointments();
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }


        /// <summary>
        /// Obtiene listado motivos para cancelacion de citas de negocios virtuales
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [Route("GetReasonVirtualAppointmentsCancel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetReasonVirtualAppointmentsCancel()
        {
            var schema = await this._scheduledVirtualAppointmentsService.GetReasonVirtualAppointmentsCancel();
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }


        /// <summary>
        /// Obtiene listado motivos para rechazo de citas de negocios virtuales
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [Route("GetReasonVirtualAppointmentsRejection")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetReasonVirtualAppointmentsRejection()
        {
            var schema = await this._scheduledVirtualAppointmentsService.GetReasonVirtualAppointmentsRejection();
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }


        /// <summary>
        /// Obtiene listado de aplicaciones para citas de negocios virtuales
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [Route("GetApplicationVirtualAppointments")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetApplicationVirtualAppointments()
        {
            var schema = await this._scheduledVirtualAppointmentsService.GetApplicationVirtualAppointments();
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }


        /// <summary>
        /// Obtiene listado de citas virtuales activas de una empresa como anfitrion o invitado
        /// </summary>
        /// <param name="nit">Identificador de la empresa</param>
        /// <param name="type">Anfitrion = Host , Invitado = Guest</param>
        /// <returns></returns>

        [HttpGet]
        [Route("GetScheduledVirtualAppointmentsCompany/{nit}/{type}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetScheduledVirtualAppointmentsCompany(string nit,string type)
        {
            if (string.IsNullOrEmpty(nit))
                return BadRequest("El identificador de la empresa no puede ser vacio");

            var schema = await this._scheduledVirtualAppointmentsService.GetScheduledVirtualAppointmentsCompany(nit,type);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Obtiene informacion de una cita de negocios virtual
        /// </summary>
        /// <param name="id">Identificador de la cita</param>
        /// <returns></returns>

        [HttpGet]
        [Route("GetScheduledVirtualAppointmentsCompanyEspecificId/{id}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetScheduledVirtualAppointmentsCompanyEspecificId(int id)
        {
            if (id <= 0)
                return BadRequest("El identificador de la cita debe ser mayor a cero (0)");

            var schema = await this._scheduledVirtualAppointmentsService.GetScheduledVirtualAppointmentsCompanyEspecificId(id);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Crea una nueva cita virtual
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPost]
        [Route("CreateScheduledVirtualAppointment")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateScheduledVirtualAppointment([FromBody] ScheduledVirtualAppointments model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");


            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;
            model.Id = 0;

            var schema = await this._scheduledVirtualAppointmentsService.CreateScheduledVirtualAppointments(model, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Actualiza una cita virtual , CAMPOS = { AppointmentReason, AppointmentDate, StartHour,  EndHour, App,  Link, IdState = { 7, 8 } }
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPut]
        [Route("UpdateScheduledVirtualAppointment")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateScheduledVirtualAppointment([FromBody] ScheduledVirtualAppointments model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            if(model.IdState != 7 && model.IdState != 8)
                return BadRequest("Reprogramacion permitida solo por Anfitrion o Invitado");


            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._scheduledVirtualAppointmentsService.UpdateScheduledVirtualAppointments(model, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

  
        /// <summary>
        /// Actualiza estado de una cita de negocios CAMPOS = {type = Host, Guest} , IdState= {5,6,9,10}, ReasonState = { Motivo Cancelacion o Rechazo } }
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPut]
        [Route("UpdateSheduleVirtualAppointmentsManagement")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateSheduledVirtualAppointmentsManagement([FromBody] ScheduledVirtualAppointments model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            if (model.IdState != 5 && model.IdState != 6 && model.IdState != 9 && model.IdState != 10)
                return BadRequest("Id Estado No Permitido");

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._scheduledVirtualAppointmentsService.UpdateSheduledVirtualAppointmentsManagement(model, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Actualiza horario de una cita de negocios virtual 
        /// Campos = {AppointmentDate, StartHour, EndHour,  IdState = { 7,8 } , Type = { Host , Guest } }
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPut]
        [Route("UpdateSheduleVirtualAppointmentsManagementTime")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateSheduledVirtualAppointmentsManagementTime([FromBody] ScheduledVirtualAppointments model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            if (model.IdState != 7 && model.IdState != 8)
                return BadRequest("Reprogramacion permitida solo por Anfitrion o Invitado");

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._scheduledVirtualAppointmentsService.UpdateSheduledVirtualAppointmentsManagementTime(model, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Actualiza citas virtuales a estado realizado luego de pasar la fecha del cita y no fueron rechazadas,canceladas o se registraran concluciones
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpPut]
        [Route("UpdateScheduledVirtualAppointmentDone")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateScheduledVirtualAppointmentDone()
        {
            var schema = await this._scheduledVirtualAppointmentsService.UpdateScheduledVirtualAppointmentsDone();

            return Ok(schema);
        }

    }
}

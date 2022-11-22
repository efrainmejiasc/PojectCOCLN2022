using CLN.model.Models;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class QuizAnswersController : BaseController
    {
        private readonly IQuizAnswersService _quizAnswersService;

        public QuizAnswersController( IQuizAnswersService quizAnswersService)
        {
            this._quizAnswersService = quizAnswersService;
        }

        /// <summary>
        /// Obtiene respuestas del cuestionario de conclusion de una cita de negocios
        /// </summary>
        /// <param name="idAppointment">Identificador de la cita de negocio virtual</param>
        /// <returns></returns>

        [HttpGet]
        [Route("GetQuizAnswers/{idAppointment}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAvailableHoursCompany(int idAppointment)
        {
            if (idAppointment <= 0)
                return BadRequest("El identificador de la cita debe ser mayor a cero (0)");

            var schema = await this._quizAnswersService.GetQuizAnswers(idAppointment);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Crea registro de respuestas al formulario de conclusiones
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPost]
        [Route("CreateQuizAnswer")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateQuizAnswers([FromBody]QuizAnswersDto model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._quizAnswersService.CreateQuizAnswers(model, iu);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }
    }
}

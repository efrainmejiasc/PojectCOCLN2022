
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
    public class CitationFindingsFormController : BaseController
    {
        private readonly ICitationFindingsFormService _citationFindingsFormService;
        public CitationFindingsFormController(ICitationFindingsFormService citationFindingsFormService)
        {
            this._citationFindingsFormService = citationFindingsFormService;
        }


        /// <summary>
        /// Crea un cuestionario enlazado a un usuario segun su Id de Usuario
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPost]
        [Route("CreateCitationFindingsForm")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateCitationFindingsForm([FromBody] CitationFindingsFormDto model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");


            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._citationFindingsFormService.UpdateCitationFindingsForm(model, iu,"POST");
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Edita un cuestionario guardado enlazado a un usuario segun su Id de Usuario
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPut]
        [Route("UpdateCitationFindingsForm")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCitationFindingsForm([FromBody] CitationFindingsFormDto model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            var questionNumber = model.PropertysCitationFindingsForm.Count;
            if(questionNumber > 10)
                return BadRequest("El numero de preguntas no puede ser mayor a diez (10)");


            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._citationFindingsFormService.UpdateCitationFindingsForm(model, iu, "PUT");
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Edita un cuestionario publicado enlazado a un usuario segun su Id de Usuario
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        [HttpPut]
        [Route("UpdateCitationFindingsFormPublish")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCitationFindingsFormPublish([FromBody] CitationFindingsFormDto model)
        {
            if (model == null)
                return BadRequest("El modelo no puede ser vacio");

            var questionNumber = model.PropertysCitationFindingsForm.Count;
            if (questionNumber > 10)
                return BadRequest("El numero de preguntas no puede ser mayor a diez (10)");

            //var idUser = UserId;
            //_ = int.TryParse(idUser, out int iu);

            var iu = !string.IsNullOrEmpty(UserId) ? Convert.ToInt32(UserId) : 1;

            var schema = await this._citationFindingsFormService.UpdateCitationFindingsFormPublish(model, iu, "PUT");
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }

        /// <summary>
        /// Obtiene questionario de usuario segun su estado
        /// </summary>
        /// <param name="idUser">Identificador de el usuario </param>
        /// <param name="idState">Estados: Guardado = 1  Publicado = 4</param>
        /// <returns></returns>

        [HttpGet]
        [Route("GetCitationFindingsForm/{idUser}/{idState}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCitationFindingsForm (int idUser, int idState)
        {
            if (idUser <= 0)
                return BadRequest("El id del usuario debe ser mayor a cero");
            else if(idState != 1 && idState != 4)
                return BadRequest("El estado del cuestionario debe ser Guardado o Publicado");

            var schema = await this._citationFindingsFormService.GetCitationFindingsForm(idUser, idState);
            if (schema == null)
                return NotFound();

            return Ok(schema);
        }
    }
}

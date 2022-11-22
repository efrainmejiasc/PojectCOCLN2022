using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using CLN.model.APIModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AcquisitionPlansController : BaseController
    {
        private readonly IAcquisitionPlansService _acquisitionPlansService;
        private readonly IOptions<AppSettings> _settings;
        public AcquisitionPlansController(IOptions<AppSettings> settings, IAcquisitionPlansService acquisitionPlansService)
        {
            _settings = settings;
            _acquisitionPlansService = acquisitionPlansService;
        }

        /// <summary>
        /// Obtener planes de adquisicion SECOP I
        /// </summary>
        /// <param name="anio">Año a consultar los Planes de Adquisición</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getAcquisitionPlansSecopOne")]
        public async Task<IActionResult> GetAcquisitionPlansSecopOne(int? anio)
        {
            try
            {
                string strUrl = _settings.Value.SecopOnePaaHeaderUrl;
                string strQuery = _settings.Value.QuerySecopOnePaaHeader;
                string strUrlDetail = _settings.Value.SecopOnePaaDetailUrl;
                string strQueryDetail = _settings.Value.QuerySecopOnePaaDetail;
                var cts = await _acquisitionPlansService.GetAcquisitionPlansSecopOne(strUrl, strQuery, strUrlDetail, strQueryDetail, anio);

                if (cts == null)
                    return NotFound();

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Obtener planes de adquisicion SECOP II
        /// </summary>
        /// <param name="anio">Año a consultar los Planes de Adquisición</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getAcquisitionPlansSecopTwo")]
        public async Task<IActionResult> GetAcquisitionPlansSecopTwo(int? anio)
        {
            try
            {
                string strUrl = _settings.Value.SecopTwoPaaHeaderUrl;
                string strQuery = _settings.Value.QuerySecopTwoPaaHeader;
                string strUrlDetail = _settings.Value.SecopTwoPaaDetailUrl;
                string strQueryDetail = _settings.Value.QuerySecopTwoPaaDetail;
                var cts = await _acquisitionPlansService.GetAcquisitionPlansSecopTwo(strUrl, strQuery, strUrlDetail, strQueryDetail, anio);

                if (cts == null)
                    return NotFound();

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Procesar ofertas para cada empresa de acuerdo a los intereses registrados
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("setAcquisitionPlansCompanyOffers")]
        public async Task<IActionResult> SetAcquisitionPlansCompanyOffers()
        {
            try
            {
                var cts = await _acquisitionPlansService.SetAcquisitionPlansCompanyOffers();

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
        [Route("getAcquisitionPurchaseById")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetAcquisitionPurchaseById(int idAcquisition)
        {
            var result = await _acquisitionPlansService.GetAcquisitionPurchaseById(idAcquisition);
            return Ok(result);
        }

        /// <summary>
        /// Obtener lista de bienes y servicios (clase(s) y/o producto(s))
        /// </summary>
        /// <param name="classProduct">clase y/o producto (SOLO ENVIAR: clase, producto o clase_producto)</param>
        /// <returns>Lista de bienes y servicios (clase(s) y/o producto(s))</returns>
        [HttpGet]
        [Route("getUNSPSCClassProducts")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetUNSPSCClassProducts(string classProduct)
        {
            var result = await _acquisitionPlansService.GetUNSPSCClassProducts(classProduct);
            return Ok(result);
        }

        /// <summary>
        /// Obtener modalidades de planes de adquisicion
        /// </summary>
        /// <returns>Lista de modalidades existentes en los planes de adquisicion</returns>
        [HttpGet]
        [Route("getAcquisitionPlansMode")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAcquisitionPlansMode()
        {
            var result = await _acquisitionPlansService.GetAcquisitionPlansMode();
            return Ok(result);
        }

        /// <summary>
        /// Obtener entidades para campo de autocompletado
        /// </summary>
        /// <param name="companyNameFilter">iniciales de la(s) entidad(es)</param>
        /// <returns>Lista de entidades que coinciden con los criterios filtrados</returns>
        [HttpGet]
        [Route("filterCompaniesNameWithAcquisitionPlans")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> FilterCompaniesNameWithAcquisitionPlans(string companyNameFilter)
        {
            var result = await _acquisitionPlansService.FilterCompaniesNameWithAcquisitionPlans(companyNameFilter);
            return Ok(result);
        }

        /// <summary>
        /// Obtener Planes de adquisicion por filtro dinamico
        /// </summary>
        /// <param name="filter">Filtro dinamico</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getAcquisitionPlansByFilter")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetAcquisitionPlansByFilter([FromQuery] AcquisitionPlansByFilter filter)
        {
            var result = await _acquisitionPlansService.GetAcquisitionPlansByFilter(filter);
            return Ok(result);
        }

        /// <summary>
        /// Exportar Excel con Planes de adquisicion por filtro dinamico
        /// </summary>
        /// <param name="filter">Filtro dinamico</param>
        /// <returns>Arreglo de bytes con la información del archivo</returns>
        [HttpGet]
        [Route("ExportarAcquisitionPlansExcel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> ExportarAcquisitionsExcel([FromQuery] AcquisitionPlansByFilter filter)
        {
            var result = await _acquisitionPlansService.ExportarAcquisitionPlansExcel(filter);
            return Ok(result);
        }

        /// <summary>
        /// Obtener un plan de adquisicion de acuerdo al Id Seleccionado
        /// </summary>
        /// <param name="idAcquisition">Id Seleccionado del Plan de adquisicion</param>
        /// <returns>Registro con datos del plan</returns>
        [HttpGet]
        [Route("getAcquisitionPlanById")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetAcquisitionPlanById(int idAcquisition)
        {
            var result = await _acquisitionPlansService.GetAcquisitionPlanById(idAcquisition);
            return Ok(result);
        }

        /// <summary>
        /// Obtener total de registros de planes de adquisicion
        /// </summary>
        /// <returns>Registro con datos del plan</returns>
        [HttpGet]
        [Route("getAcquisitionPlansTotalCount")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetAcquisitionPlansTotalCount()
        {
            var result = await _acquisitionPlansService.GetAcquisitionPlansTotalCount();
            return Ok(result);
        }

        [HttpGet]
        [Route("getEntitiesByIdCompanyForAcquisition")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetEntitiesByIdCompanyForAcquisition(int idCompany)
        {
            var result = await _acquisitionPlansService.GetEntitiesByIdCompanyForAcquisition(idCompany);
            return Ok(result);
        }


        [HttpGet]
        [Route("getModalitiesByCompanyIdForAcquisition")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetModalitiesByCompanyIdForAcquisition(int idCompany)
        {
            var result = await _acquisitionPlansService.GetModalitiesByCompanyIdForAcquisition(idCompany);
            return Ok(result);
        }
    }
}

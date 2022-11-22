using CLN.api.Attributes;
using CLN.model.APIModels;
using CLN.model.Settings;
using CLN.services.Interfaces;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class HirigProcessController : BaseController
    {
        private readonly IHiringProcessService _hiringProcessService;
        private readonly IOptions<AppSettings> _settings;
        private readonly HirigProcessSettings _hirigProcessSettings;
        public HirigProcessController(IOptions<AppSettings> settings, IHiringProcessService hiringProcessService, IOptions<HirigProcessSettings> hirigProcessSettings)
        {
            _settings = settings;
            _hiringProcessService = hiringProcessService;
            _hirigProcessSettings = hirigProcessSettings.Value;
        }

        /// <summary>
        /// Borra todos los procesos de compras publicas existentes
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("DeleteAllHiringProcesses")]
        public async Task<IActionResult> DeleteAllHiringProcesses()
        {
            var cts = await _hiringProcessService.DeleteAllHiringProcesses();

            return Ok(cts);
        }
        /// <summary>
        /// Consulta secop 1 y obtiene los proceso de compras publicas
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetHiringProcessesSecopOne")]
        public async Task<IActionResult> GetHiringProcessesSecopOne()
        {
            string strUrl = _settings.Value.SecopOneUrl;
            string strQuery = _settings.Value.QuerySecopOne;
            var cts = await _hiringProcessService.GetHiringProcessesSecopOne(strUrl, strQuery);

            return Ok(cts);
        }

        /// <summary>
        /// Consulta secop 2 y obtiene los proceso de compras publicas
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetHiringProcessesSecopTwo")]
        public async Task<IActionResult> GetHiringProcessesSecopTwo()
        {
            string strUrl = _settings.Value.SecopTwoUrl;
            string strQuery = _settings.Value.QuerySecopTwo;
            var cts = await _hiringProcessService.GetHiringProcessesSecopTwo(strUrl, strQuery);

            return Ok(cts);
        }

        /// <summary>
        /// Procesar ofertas para cada empresa de acuerdo a los intereses registrados
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("setHiringProcessCompanyOffers")]
        public async Task<IActionResult> SetHiringProcessCompanyOffers()
        {
            var cts = await _hiringProcessService.SetHiringProcessCompanyOffers();

            return Ok(cts);
        }

        [HttpGet]
        [Route("getProcessPurchaseById")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetProcessPurchaseById(int idProcess)
        {
            var result = await _hiringProcessService.GetProcessPurchaseById(idProcess);
            return Ok(result);
        }

        /// <summary>
        /// obtener la lista de todas los numeros de procesos de procesos de contratación que contengan el dato 
        /// </summary>
        /// <param name="processNumber">numero del proceso</param>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("filterHiringProcessProcessNumber")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> FilterGetHiringProcessProcessNumber(string processNumber)
        {
            var result = await _hiringProcessService.FilterGetHiringProcessProcessNumber(processNumber);
            return Ok(result);
        }

        /// <summary>
        /// obtener la lista de todas los estados o fases que hay actualmente en los procesos de contratación
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getHiringProcessActualStages")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessActualStages()
        {
            var result = await _hiringProcessService.GetHiringProcessActualStages();
            return Ok(result);
        }

        /// <summary>
        /// obtener la lista de todas las modalidades que hay actualmente en los procesos de contratación
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getHiringProcessActualModes")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessActualModes()
        {
            var result = await _hiringProcessService.GetHiringProcessActualModes();
            return Ok(result);
        }

        /// <summary>
        /// obtener cantidad total de registros de proces de contratación
        /// </summary>
        /// <returns></returns>
        /// 
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getHiringProcessTotalCount")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessTotalCount()
        {
            var result = await _hiringProcessService.GetHiringProcessTotalCount();
            return Ok(result);
        }

        /// <summary>
        /// obtener cantidad total de registros de procesos de contratación y la suma
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getHiringProcessTotalCountandSuma")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessTotalCountandSuma()
        {
            var result = await _hiringProcessService.GetHiringProcessTotalCountandSuma();
            return Ok(result);
        }

        /// <summary>
        /// Obtener lista de procesos de contratación por filtro
        /// </summary>
        /// <param name="filter">Filtro dinamico</param>
        /// <returns>Lista de procesos</returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpPost]
        [Route("getHiringProcessesByFilter")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessesByFilter([FromBody] HiringProcessByFilter filter)
        {
            var result = await _hiringProcessService.GetHiringProcessesByFilter(filter);
            return Ok(result);
        }

        /// <summary>
        /// Obtener el detalle de un procesos de contratación por id
        /// </summary>
        /// <param name="idHiringProcess">Id del proceso seleccionado</param>
        /// <returns>Detalle del proceso</returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetHiringProcessesById")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetHiringProcessesById(int idHiringProcess)
        {
            var result = await _hiringProcessService.GetHiringProcessesById(idHiringProcess);
            return Ok(result);
        }

        /// <summary>
        /// Descargar procesos de contratación segun filtro
        /// </summary>
        /// <param name="filter">Filtro</param>
        /// <returns>archivo blob</returns>
        [AllowAnonymous]
        [ApiKey]
        [HttpPost]
        [Route("downloadHiringProcessesFilterExcel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DownloadHiringProcessesFilterExcel([FromBody] HiringProcessByFilter filter)
        {
            var result = await _hiringProcessService.GetHiringProcessesByFilterforDownloadExcel(filter, _hirigProcessSettings.SheetName);

            if (result == null)
                return Ok("No se pudo generar el archivo");

            var filename = $"{_hirigProcessSettings.FileName} {DateTime.Now:dd-MM-yyyy}{_hirigProcessSettings.FileExtension}";
            var fileObj = services.Helpers.Helpers.DownloadFile(result, filename);

            return File((MemoryStream)services.Helpers.Helpers.GetValue(fileObj, "content"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "contentType"),
                        (string)services.Helpers.Helpers.GetValue(fileObj, "fileName"));
        }

        /// <summary>
        /// Descargar procesos de contratación segun filtro, return byte file
        /// </summary>
        /// <param name="filter">Filtro</param>
        /// <returns>archivo blob</returns>
        [HttpPost]
        [Route("downloadHiringProcessesExcel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<object> DownloadHiringProcessesExcel([FromBody] HiringProcessByFilter filter)
        {
            var result = await _hiringProcessService.GetHiringProcessesByFilterforDownloadExcel(filter, _hirigProcessSettings.SheetName);
            return Ok(result);
        }

        [HttpGet]
        [Route("getModalitiesByCompanyIdForProcess")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<Object> GetModalitiesByCompanyIdForProcess(int idCompany)
        {
            var result = await _hiringProcessService.GetModalitiesByCompanyIdForProcess(idCompany);
            return Ok(result);
        }
    }
}

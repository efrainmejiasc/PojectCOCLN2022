using CLN.model.Models;
using CLN.services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using CLN.model.Settings;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CLN.api.Attributes;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FreeMarketController : BaseController
    {
        // 1 lista  2 objeto
        private readonly IFreeMarketService _freeMarketService;
        private readonly IOptions<FreeMarketAPISettings> _settings;
        public FreeMarketController(IFreeMarketService freeMarketService, IOptions<FreeMarketAPISettings> settings)
        {
            this._freeMarketService = freeMarketService;
            this._settings = settings;
        }

        /// <summary>
        /// Devuelve tendencias de Mercado Libre Colombia
        /// </summary>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetFreeMarketTrendsAsync")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> GetFreeMarketTrendsAsync()
        {
            var tokenML = _settings.Value.TokenML;
            var urlTrends = _settings.Value.UrlTrendsColombia;
            var lstTrends = await _freeMarketService.GetFreeMarketTrendsAsync(tokenML, urlTrends);

            if (lstTrends == null)
                return BadRequest("Error en la solicitud");

            return Ok(lstTrends);

        }

        /// <summary>
        /// Devuelve tendencias de Mercado Libre Colombia de una categoria especifica
        /// </summary>
        /// <param name="categorieId">codigo de la categoria</param>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetFreeMarketTrendsCategorieAsync/{categorieId}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetFreeMarketTrendsCategorieAsync(string categorieId)
        {

            if (string.IsNullOrEmpty(categorieId))
                return BadRequest("La categoria no puede ser vacia");

            var tokenML = _settings.Value.TokenML;
            var urlTrends = _settings.Value.UrlTrendsColombia;
            var lstTrends = await _freeMarketService.GetFreeMarketTrendsCategorieAsync(tokenML, urlTrends, categorieId);

            if (lstTrends == null)
                return BadRequest("Error en la solicitud");

            return Ok(lstTrends);

        }


        /// <summary>
        /// Devuelve todas las categorias
        /// </summary>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetFreeMarketCategoriesAsync")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> GetFreeMarketCategoriesAsync()
        {
            var tokenML = _settings.Value.TokenML;
            var urlCategories = _settings.Value.UrlCategoriesColombia;
            var lstCategories = await _freeMarketService.GetFreeMarketCategoriesAsync(tokenML, urlCategories);

            if (lstCategories == null)
                return BadRequest("Error en la solicitud");

            return Ok(lstCategories);

        }


        /// <summary>
        /// Devuelve sub categorias
        /// </summary>
        /// <param name="categorieId">codigo de la categoria</param>
        [HttpGet]
        [Route("GetFreeMarketEspecificCategorieAsync/{categorieId}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetFreeMarketEspecificCategorieAsync(string categorieId)
        {

            if (string.IsNullOrEmpty(categorieId))
                return BadRequest("El id cateogoria no puede ser vacio");

            var tokenML = _settings.Value.TokenML;
            var urlSubCategories = _settings.Value.UrlSubCategoriesColombia;
            var categorie = await _freeMarketService.GetFreeMarketEspecificCategorieAsync(categorieId, tokenML, urlSubCategories);

            if (categorie == null)
                return BadRequest("Error en la solicitud");

            return Ok(categorie);

        }

        /// <summary>
        /// Devuelve datos de un producto por palabra clave
        /// </summary>
        /// <param name="keyWord">codigo de la categoria</param>
        [HttpGet]
        [Route("GetFreeMarketProductAsync/{keyWord}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetFreeMarketProductAsync(string keyWord)
        {
            if (string.IsNullOrEmpty(keyWord))
                return BadRequest("La palabra clave no puede ser vacia");

            var tokenML = _settings.Value.TokenML;
            var urlProduct = _settings.Value.UrlSearchProduct;
            var product = await _freeMarketService.GetFreeMarketProductAsync(keyWord, tokenML, urlProduct);

            if (product == null)
                return BadRequest("Error en la solicitud");
            else if (string.IsNullOrEmpty(keyWord))
                return NotFound();

            return Ok(product);

        }

    }
}

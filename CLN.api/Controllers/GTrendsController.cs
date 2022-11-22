using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CLN.services.Interfaces;
using System.Threading.Tasks;
using System.Net;
using System.Collections.Generic;
using CLN.model.APIModels;
using System;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CLN.api.Attributes;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GTrendsController : BaseController
    {
        private readonly IGTrendsService _gTrendsService;

        public GTrendsController (IGTrendsService gTrendsService)
        {
            this._gTrendsService = gTrendsService;
        }

        /// <summary>
        /// Devuelve json para  Google Trends 
        /// </summary>
        /// <param name="keyWord">palabra clave de busqueda</param>
        [HttpGet]
        [Route("GetGoogleTrendsJsonModel/{keyWord}")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]


        public async Task<IActionResult>  GetGoogleTrendsJsonModel(string keyWord)
        {

            if (string.IsNullOrEmpty(keyWord))
                return BadRequest("La palabra clave no puede ser vacia");

            var gUrls = await _gTrendsService.GetGoogleTrendsJsonModel(keyWord);
            if (gUrls == null)
                return NotFound();

            return Ok(gUrls);


        }

        /// <summary>
        /// Devuelve json para  Google Trends 
        /// </summary>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetGoogleTrendsJsonModel")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]


        public async Task<IActionResult> GetGoogleTrendsJsonModel()
        {
            var gUrls = await _gTrendsService.GetGoogleTrendsJsonModel();
            if (gUrls == null)
                return NotFound();

            return Ok(gUrls);


        }

        /// <summary>
        /// Devuelve caracteristicas para redes sociales 
        /// </summary>
        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("GetSocialFeatures")]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(IResponse), StatusCodes.Status400BadRequest)]


        public async Task<IActionResult> GetSocialFeatures()
        {
            var socialFeeature = await _gTrendsService.GetSocialFeatures();
            if (socialFeeature == null)
                return NotFound();

            return Ok(socialFeeature);


        }
    }
}

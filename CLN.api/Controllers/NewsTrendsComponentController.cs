using CLN.model.APIModels;
using CLN.model.Settings;
using CLN.services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CLN.api.Attributes;

namespace CLN.api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class NewsTrendsComponentController : BaseController
    {
        private readonly INewsTrendsComponentService _newsTrendsComponentService;
        private readonly IOptions<AppSettings> _settings;
        public NewsTrendsComponentController(INewsTrendsComponentService newsTrendsComponentService, IOptions<AppSettings> settings)
        {
            _newsTrendsComponentService = newsTrendsComponentService;
            _settings = settings;
        }
        [HttpGet]
        [Route("getComponents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetComponents()
        {
            try
            {
                var cts = await _newsTrendsComponentService.GetComponents(null);

                if (cts == null)
                    return NotFound();

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [ApiKey]
        [HttpGet]
        [Route("getPublishedComponents")]
        public async Task<IActionResult> GetPublishedComponents()
        {
            try
            {
                var cts = await _newsTrendsComponentService.GetPublishedComponents();

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
        [Route("getComponentDetail")]
        public async Task<IActionResult> GetComponentDetail(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                    throw new Exception(/*AppSettings.Values["MsjDataInvalida"]*/);

                var ct = await _newsTrendsComponentService.GetComponentDetail(id);

                if (ct == null)
                    return NotFound();

                return Ok(ct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("createComponents")]
        public async Task<IActionResult> CreateComponents([FromBody] List<HomeComponentDto> entity)
        {
            try
            {
                if (entity == null || entity.Count == 0)
                    throw new Exception(/*AppSettings.Values["MsjDataInvalida"]*/);

                var idUser = UserId;
                var cts = await _newsTrendsComponentService.CreateComponents(entity, idUser);

                if (cts == null)
                    return NotFound();

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateComponents")]
        public async Task<IActionResult> UpdateComponents([FromBody] List<HomeComponentDto> entity)
        {
            try
            {
                if (entity == null || entity.Count == 0)
                    throw new Exception(/*AppSettings.Values["MsjDataInvalida"]*/);

                var idUser = UserId;
                var cts = await _newsTrendsComponentService.EditComponents(entity, idUser);

                if (cts == null)
                    return NotFound();

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteComponent")]
        public async Task<IActionResult> DeleteComponent(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                    throw new Exception(/*AppSettings.Values["MsjDataInvalida"]*/);

                var idUser = UserId;
                var ct = await _newsTrendsComponentService.DeleteComponent(id, idUser);

                if (ct == null)
                    return NotFound();

                return Ok(ct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("publishComponentsHome")]
        public async Task<IActionResult> PublishComponentsHome()
        {
            try
            {
                var idUser = UserId;
                var cts = await _newsTrendsComponentService.PublishComponents(idUser, _settings.Value.DirectoryMultimediaNewsTrendsComponentPublished);

                return Ok(cts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("saveMultimediaComponent")]
        public async Task<IActionResult> SaveMultimediaComponent(IFormFile pFile)
        {
            try
            {
                string directory = _settings.Value.DirectoryMultimediaNewsTrendsComponent;
                var obj = await _newsTrendsComponentService.SaveMultimediaComponent(pFile, directory);
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

       /* [HttpGet]
        [Route("getUTCServerDate/")]
        public IActionResult GetUTCServerDate()
        {
            try
            {
                return Ok(DateTime.UtcNow);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }*/
    }
}

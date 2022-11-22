using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CLN.api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        public string UserId
        {
            get
            {
                try { return HttpContext.User.FindFirstValue(ClaimTypes.Sid); } catch { return string.Empty; }
            }
        }
        public string UserEmail
        {
            get
            {
                try { return HttpContext.User.FindFirstValue(ClaimTypes.Email); } catch { return null; }
            }
        }

        public string CasId
        {
            get
            {
                try { return HttpContext.User.FindFirstValue("uid"); } catch { return string.Empty; }
            }
        }

        public string Ip
        {
            get
            {
                try
                {
                    return HttpContext.User.FindFirstValue("ip");
                }
                catch
                {
                    try
                    {
                        var ip = HttpContext.Request.Headers["X-Forwarded-For"];
                        if (string.IsNullOrEmpty(ip))
                        {
                            ip = HttpContext.Connection.RemoteIpAddress.ToString();
                        }
                        return ip;
                    }
                    catch { return null; }
                }                
            }
        }
    }
}

using CLN.model.ErrorMessages;
using CLN.model.Settings;
using CLN.services.Exceptions;
using CLN.services.Extensions;
using CLN.services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CLN.api.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context, IAutenticationService autenticationService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                ValidateTokenAsync(context, autenticationService, token);

            await _next(context);
        }

        private void ValidateTokenAsync(HttpContext context, IAutenticationService autenticationService, string token)
        {
            var exception = new UnauthorizedException($"{GeneralErrorsMessages.InvalidToken:D}:{GeneralErrorsMessages.InvalidToken.GetDescription()}");

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = _appSettings.ClnIssuerJwt,
                    ValidateAudience = true,
                    ValidAudience = _appSettings.ClnAudienceJwt,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                }, out SecurityToken validatedToken);

                if (validatedToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw exception;

                //var userId = int.Parse(jwtSecurityToken.Claims.First(x => x.Type == "uid").Value);
                //var userInSession = await autenticationService.CheckUserInSessionAsync(userId, default);
                //if (!userInSession) throw exception;

                context.User.AddIdentity(new ClaimsIdentity(jwtSecurityToken.Claims));
            }
            catch (Exception ex)
            {
                throw exception;
            }
        }
    }
}

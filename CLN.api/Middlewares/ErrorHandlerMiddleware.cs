using CLN.services.Exceptions;
using CLN.services.Extensions;
using CLN.services.Wrappers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace CLN.api.WepAPI.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                var errors = exception.GetAllMessages();

                var response = context.Response;
                response.ContentType = "application/json";
                var responseModel = new Response<string>()
                {
                    Succeeded = false,
                    Message = String.Join(Environment.NewLine, errors),
                    Errors = errors.ToList()
                };

                response.StatusCode = exception switch
                {
                    // custom application error
                    BusinessException => (int)HttpStatusCode.BadRequest,
                    // not found error
                    KeyNotFoundException => (int)HttpStatusCode.NotFound,
                    // unauthorized
                    UnauthorizedException => (int)HttpStatusCode.Unauthorized,
                    // unhandled error
                    _ => (int)HttpStatusCode.InternalServerError
                };

                var result = JsonSerializer.Serialize(responseModel);

                await response.WriteAsync(result);
            }
        }
    }
}

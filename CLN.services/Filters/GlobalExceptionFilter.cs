//using CLN.model.APIModels;
//using CLN.model.ErrorMessages;
//using CLN.services.Exceptions;
//using CLN.services.Extensions;
//using CLN.services.Helpers.Constant;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;
//using Microsoft.Data.SqlClient;
//using System.Collections.Generic;
//using System.Net;

//namespace CLN.services.Filters
//{
//    public class GlobalExceptionFilter : IExceptionFilter
//    {
//        public void OnException(ExceptionContext context)
//        {
//            Response Response = new()
//            {
//                IsSuccessful = false,
//                IsValidation = false,
//                IsException = true,
//                Code = ConstantGeneralCodes.ERROR,
//                Data = context.Exception
//            };

//            if (context.Exception is BusinessException exception)
//            {
//                Response.Message = string.Concat($"{WellKnownErrors.MenssageBussines.GetDescription()}: ", exception.Message);
//                Response.Code = $"{HttpStatusCode.InternalServerError:D}";
//            }
//            else if (context.Exception is KeyNotFoundException notFoundException)
//            {
//                Response.Message = string.Concat($"{WellKnownErrors.NotFound.GetDescription()}: ", notFoundException.Message);
//                Response.Code = $"{HttpStatusCode.NotFound:D}";
//            }
//            else
//                Response.Message = context.Exception.Message;

//            context.Result = new BadRequestObjectResult(Response);
//            context.HttpContext.Response.ContentType = "application/json";
//            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
//            context.ExceptionHandled = true;
//        }
//    }


//}

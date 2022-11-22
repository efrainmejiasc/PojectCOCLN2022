
using AuthorizationTest.JwtHelpers;

namespace CLN.model.APIModels
{
    public class Response
    {
        public bool IsSuccessful { get; set; }
        public bool IsValidation { get; set; }
        public bool IsException { get; set; }
        public string Code { get; set; }
        public string Message { get; set; } 
        public JwtToken Token { get; set; }
        public object Data { get; set; }
        
        /// <summary>
        /// Custom response
        /// </summary>
        public Response()
        { }

        /// <summary>
        /// Simple response
        /// </summary>
        /// <param name="data"></param>
        /// <param name="message"></param>
        public Response(object data, string message = null, bool isSuccessful = true, bool isValidation = false, bool isException = false)
        {
            IsSuccessful = isSuccessful;
            IsValidation = isValidation;
            IsException = isException;
            Message = message;
            Data = data;
        }

        public Response(string message = null, bool isSuccessful = false, bool isValidation = false, bool isException = false)
        {
            IsSuccessful = isSuccessful;
            IsValidation = isValidation;
            IsException = isException;
            Message = message;
        }

        public Response(string message = null, bool isValidation = false)
        {
            IsSuccessful = false;
            IsValidation = isValidation;
            IsException = false;
            Message = message;
        }
    }
}
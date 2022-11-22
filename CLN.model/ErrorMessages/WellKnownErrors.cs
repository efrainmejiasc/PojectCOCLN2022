using System.ComponentModel;

namespace CLN.model.ErrorMessages
{
    /// <summary>
    /// Custom errors for the API
    /// </summary>
    public enum WellKnownErrors
    {
        /// <summary>
        /// Forbidden
        /// </summary>
        Forbidden = 1,
        /// <summary>
        /// Unauthorized
        /// </summary>
        Unauthorized = 2,
        /// <summary>
        /// Not found
        /// </summary>
        [Description("Not found")]
        NotFound = 3,
        /// <summary>
        /// Menssage bussines
        /// </summary>
        [Description("Menssage bussines")]
        MenssageBussines = 4,
        /// <summary>
        /// Data base exception
        /// </summary>
        [Description("Data base exception")]
        ExceptionDataBase = 5,
        /// <summary>
        /// User not found
        /// </summary>
        [Description("User not found")]
        UserNotFound = 6,
    }
}

using System.Collections.Generic;

namespace CLN.services.Wrappers
{
    public interface IResponse
    {
        /// <summary>
        /// Response status
        /// </summary>
        bool Succeeded { get; }

        /// <summary>
        /// Custom message
        /// </summary>
        string Message { get; }

        /// <summary>
        /// Error list
        /// </summary>
        List<string> Errors { get; }

        /// <summary>
        /// Response data
        /// </summary>
        object Data { get; }
    }
}

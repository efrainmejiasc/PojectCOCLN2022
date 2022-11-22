using System;

namespace CLN.services.Interfaces
{
    public interface ISequentialGuidGenerator
    {
        /// <summary>
        /// Genarate a sequential for sql server database
        /// </summary>
        /// <returns></returns>
        Guid SQLServerSequentialGuid();
    }
}

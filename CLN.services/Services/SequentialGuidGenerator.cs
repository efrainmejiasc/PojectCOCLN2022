using CLN.services.Interfaces;
using System;
using Zaabee.SequentialGuid;

namespace CLN.services.Services
{
    /// <summary>
    /// Generate sequential guid relational database
    /// </summary>
    public class SequentialGuidGenerator : ISequentialGuidGenerator
    {
        /// <inheritdoc />
        public Guid SQLServerSequentialGuid()
            => SequentialGuidHelper.GenerateComb(SequentialGuidType.SequentialAtEnd);
    }
}

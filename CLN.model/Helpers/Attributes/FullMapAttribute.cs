using System;

namespace CLN.model.Helpers.Attributes
{
    /// <summary>
    /// 
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class FullMapAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="destination"></param>
        public FullMapAttribute(Type destination)
        {
            Destination = destination;
        }

        /// <summary>
        /// Destination type.
        /// </summary>
        public Type Destination { get; set; }

        /// <summary>
        /// Destination type.
        /// </summary>
        public bool ReverseMap { get; set; } = false;
    }
}

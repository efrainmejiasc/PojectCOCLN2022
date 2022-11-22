using System;

namespace CLN.model.Helpers.Attributes
{
    /// <summary>
    /// 
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class CustomMapAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="destination"></param>
        public CustomMapAttribute(Type destination, Type converter)
        {
            Destination = destination;
            Converter = converter;
        }

        /// <summary>
        /// Destination type.
        /// </summary>
        public Type Destination { get; set; }

        /// <summary>
        /// Converter type.
        /// </summary>
        public Type Converter { get; set; }
    }
}

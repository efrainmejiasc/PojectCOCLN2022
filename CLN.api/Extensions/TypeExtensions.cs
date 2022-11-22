using System;
using System.Linq;
using System.Reflection;

namespace CLN.api.Extensions
{
    /// <summary>
    /// Get concrete types from assembly
    /// </summary>
    public static class TypeExtensions
    {
        /// <summary>
        /// Get concrete types
        /// </summary>
        /// <param name="type"></param>
        /// <param name="assembly"></param>
        /// <returns></returns>
        public static Type[] GetConcreteTypes(this Type type, Assembly assembly = null)
        {
            var assemblyTypes = assembly != null ? assembly.GetTypes() : type.Assembly.GetTypes();
            var types = !(type.IsGenericType && type.IsTypeDefinition) ?
                assemblyTypes.Where(t => t.IsClass && !t.IsAbstract && t.GetInterfaces().Contains(type)) :
                assemblyTypes.Where(t => t.IsClass && !t.IsAbstract && t.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == type));

            return types.ToArray();
        }
    }
}

using AutoMapper;
using CLN.model.ErrorMessages;
using CLN.model.Helpers.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CLN.api.Helpers
{
    /// <summary>
    /// Map configuration for auto mapper.
    /// </summary>
    public sealed class MappingProfile : Profile
    {
        public MappingProfile()
        {
            var values = FindValuesToMap(new Assembly[] { typeof(WellKnownErrors).Assembly });

            foreach (var value in values)
            {
                CreateMap(value.Item1, value.Item2);
                if (value.Item3)
                    CreateMap(value.Item2, value.Item1);
            }

        }

        private static IEnumerable<(Type, Type, bool)> FindValuesToMap(IEnumerable<Assembly> assemblies)
        {
            TypeInfo[] typeInfos = FindAttributeInAssemblies<FullMapAttribute>(assemblies);

            var result = typeInfos.Select(t =>
            {
                var attribute = t.GetCustomAttribute<FullMapAttribute>();
                return (t.AsType(), attribute.Destination, attribute.ReverseMap);
            }).ToArray();

            return result;
        }

        public static IEnumerable<(Type, Type, Type)> FindValuesToCustomMap(IEnumerable<Assembly> assemblies)
        {
            var result = new List<(Type, Type, Type)>();
            var typeInfos = FindWithDuplicateAttributeInAssemblies<CustomMapAttribute>(assemblies);

            result.AddRange(from item in typeInfos
                            let attributes = item.GetCustomAttributes<CustomMapAttribute>()
                            from attribute in attributes
                            select (item.AsType(), attribute.Destination, attribute.Converter));

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TAttribute"></typeparam>
        /// <param name="assemblies"></param>
        private static TypeInfo[] FindAttributeInAssemblies<TAttribute>(IEnumerable<Assembly> assemblies)
            where TAttribute : Attribute =>
                assemblies.Where(a => !a.IsDynamic)
                    .SelectMany(a => a.DefinedTypes.Where(t => (t.IsPublic || t.IsNestedPublic) && t.GetCustomAttribute<TAttribute>() != null))
                    .ToArray();


        private static IEnumerable<TypeInfo> FindWithDuplicateAttributeInAssemblies<TAttribute>(IEnumerable<Assembly> assemblies) where TAttribute : Attribute
        {
            return (from assembly in assemblies
                    where !assembly.IsDynamic
                    from subAssembly in assembly.DefinedTypes
                    where (subAssembly.IsPublic || subAssembly.IsNestedPublic) && subAssembly.GetCustomAttributes<TAttribute>().Any()

                    from attribute in subAssembly.GetCustomAttributes<TAttribute>()
                    select subAssembly).Distinct().ToList();
        }
    }
}

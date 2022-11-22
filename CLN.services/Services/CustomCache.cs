using CLN.services.Interfaces;
using System.Runtime.Caching;
using System;

namespace CLN.services.Services
{
    public class CustomCache : ICustomCache
    {
        private readonly MemoryCache _cache;

        public CustomCache()
        {
            _cache = MemoryCache.Default;
        }

        /// <inheritdoc />
        public void Set(string key, object value, int seconds = 300)
        {
            _cache.Set(key, value, DateTimeOffset.UtcNow.AddSeconds(seconds));
        }

        /// <inheritdoc />
        public bool TryGetValue(string key, out object value)
        {
            var result = _cache.Get(key);
            value = result;
            return result != null;
        }

        /// <inheritdoc />
        public void Remove(string key) => _cache.Remove(key);

        /// <inheritdoc />
        public bool Contains(string key) => _cache.Contains(key);
    }
}

using System;

namespace CLN.services.Interfaces
{
    public interface ICustomCache
    {
        /// <summary>
        /// Add a key-value pair to cache
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="seconds"></param>
        void Set(string key, object value, int seconds = 300);

        /// <summary>
        /// Try get value from cache
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        bool TryGetValue(string key, out object value);

        /// <summary>
        /// Check is contains key
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        bool Contains(string key);

        /// <summary>
        /// Remove a entry
        /// </summary>
        /// <param name="key"></param>
        void Remove(string key);
    }
}

namespace CLN.model.Settings
{
    /// <summary>
    /// 
    /// </summary>
    public class LoginCacheSettings
    {
        /// <summary>
        /// Identifier expiration time for login
        /// </summary>
        public int IdExpirationTime { get; set; }
        /// <summary>
        /// Total time for wait for login
        /// </summary>
        public int WaitForLoginExpirationTime { get; set; }
        /// <summary>
        /// Wait time between cache lookups
        /// </summary>
        public int ThreadSleepTime { get; set; }
    }
}
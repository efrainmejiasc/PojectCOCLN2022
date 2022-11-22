namespace CLN.model.Dto.CAS
{
    public class LoginResponseDto
    {
        /// <summary>
        /// CLN identifier
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Indicates if the user is an administrator
        /// </summary>
        public bool IsAdmin { get; set; }
        /// <summary>
        /// CAS identifier
        /// </summary>
        public int? CASId { get; set; }
        /// <summary>
        /// User email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// CLN access token
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// CAS access token
        /// </summary>
        public string CASToken { get; set; }
        /// <summary>
        /// Country
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Country iso code
        /// </summary>
        public string CountryCode { get; set; }
        /// <summary>
        /// Full name
        /// </summary>
        public string FullName { get; set; }
    }
}

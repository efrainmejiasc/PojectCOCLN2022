using System.ComponentModel;

namespace CLN.model.ErrorMessages
{
    public enum CASLoginAccessMessages
    {
        /// <summary>
        /// Login failed
        /// </summary>
        [Description("Login failed")]
        LoginFailed = 0,
        /// <summary>
        /// User data obtained from CAS
        /// </summary>
        [Description("User data obtained from CAS")]
        DataObtained = 1,
        /// <summary>
        /// Error getting user data from CAS
        /// </summary>
        [Description("Error getting user data from CAS")]
        ErrorGettingData = 2,
        /// <summary>
        /// Timeout to fetch data from CAS
        /// </summary>
        [Description("Timeout to fetch data from CAS")]
        TimeoutToFetchData = 3,
        /// <summary>
        /// Wait for login expired
        /// </summary>
        [Description("Wait for login expired")]
        WaitForLoginExpired = 4,
        /// <summary>
        /// Error getting profile data
        /// </summary>
        [Description("Error getting profile data")]
        ErrorGettingProfile = 5,
        /// <summary>
        /// Email not found in profile
        /// </summary>
        [Description("Email not found in profile")]
        EmailNotFoundInProfile = 6,
        /// <summary>
        /// Token saved successfully
        /// </summary>
        [Description("Token saved successfully")]
        TokenSavedSuccessfully = 7,
        /// <summary>
        /// Error getting profile data
        /// </summary>
        [Description("Error getting profile data")]
        ErrorGettingCompany = 9,
        /// <summary>
        /// Error changing password
        /// </summary>
        [Description("Error changing password")]
        ErrorForgotPassword = 10,
        /// <summary>
        /// Password changed successfully
        /// </summary>
        [Description("Password changed successfully")]
        ForgotPasswordOk = 11,
        /// <summary>
        /// Error changing password, invalid user
        /// </summary>
        [Description("Error changing password, invalid user")]
        ErrorForgotPasswordInvalidUser = 12,
        /// <summary>
        /// Error getting cln events data
        /// </summary>
        [Description("Error getting cln events data")]
        ErrorGettingEvents = 13,
        /// <summary>
        /// Error getting cln services data
        /// </summary>
        [Description("Error getting cln services data")]
        ErrorGettingServices = 14,
        /// <summary>
        /// Error getting cln communities data
        /// </summary>
        [Description("Error getting cln communities data")]
        ErrorGettingCommunities = 15,
        /// <summary>
        /// Error getting cln business opportunities data
        /// </summary>
        [Description("Error getting cln business opportunities data")]
        ErrorGettingBusinessOpportunities = 16,
    }
}

using CLN.model.Dto.CAS;

namespace CLN.model.Dto.Login
{
    public class CASLoginDto
    {
        public int? Id { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public CompanyToSaveDto[] Companies { get; set; }
        public bool IsAdmin { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
    }
}

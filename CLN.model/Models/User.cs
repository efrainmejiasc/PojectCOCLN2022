using CLN.model.Dto.CAS;
using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class User
    {
        public User()
        {
            UserCompanyProfiles = new HashSet<UserCompanyProfile>();
        }

        public int IdUser { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string FirstSurname { get; set; }
        public string SecondSurname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? IsActive { get; set; }
        public int? FailedAttempts { get; set; }
        public DateTime? DateLastLogin { get; set; }
        public bool? IsChangePassword { get; set; }
        public bool IsLocked { get; set; }
        public DateTime? DateChangePassword { get; set; }
        public DateTime? DateExpired { get; set; }
        public int? IdUserCreate { get; set; }
        public DateTime? DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }
        public int IdRol { get; set; }
        public string UserName { get; set; }
        public CompanyToSaveDto[] Companies { get; set; }
        public int? CasId { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }

        public virtual ICollection<UserCompanyProfile> UserCompanyProfiles { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyProfile
    {
        public CompanyProfile()
        {
            AcquisitionPlansCompanyOffers = new HashSet<AcquisitionPlansCompanyOffer>();
            CompanyInterests = new HashSet<CompanyInterest>();
            HiringProcessCompanyOffers = new HashSet<HiringProcessCompanyOffer>();
            UserCompanyProfiles = new HashSet<UserCompanyProfile>();
        }

        /// <summary>
        /// entity identifier
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Corresponds to the unique identifier of each company within CLN
        /// </summary>
        public int CompanyId { get; set; }

        /// <summary>
        /// Company name
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// Tax Identification Number (NIT or CC)
        /// </summary>
        public string NumberId { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Phone number
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Country
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// City
        /// </summary>
        public string City { get; set; }
        /// <summary>
        /// Can manage company
        /// </summary>
        public bool? IsOwner { get; set; }
        /// <summary>
        /// Industry / Main sector of the company
        /// </summary>
        public KeyValuePair<string, string>[] IndustryMainSector { get; set; }

        /// <summary>
        /// Foreign key to user
        /// </summary>
        public int? IdUser { get; set; }
        public bool? MicroBusiness { get; set; }
        public string Idtype { get; set; }
        public string Characterization { get; set; }
        public string CommercialInformation { get; set; }

        public string Women_President { get; set; }
        public string Women51p { get; set; }

        public virtual ICollection<AcquisitionPlansCompanyOffer> AcquisitionPlansCompanyOffers { get; set; }
        public virtual ICollection<CompanyInterest> CompanyInterests { get; set; }
        public virtual ICollection<HiringProcessCompanyOffer> HiringProcessCompanyOffers { get; set; }
        public virtual ICollection<UserCompanyProfile> UserCompanyProfiles { get; set; }
    }
}

using CLN.model.Helpers.Attributes;
using CLN.model.Models;
using System.Collections.Generic;

namespace CLN.model.Dto.CAS
{
    [FullMap(typeof(CompanyProfile), ReverseMap = true)]
    public class CompanyProfileDto
    {
        /// <summary>
        /// Corresponds to the unique identifier of each company within CLN
        /// </summary>
        public int? CompanyId { get; set; }
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
        public bool IsOwner { get; set; }
        /// <summary>
        /// Industry / Main sector of the company
        /// </summary>
        public KeyValuePair<string, string>[] IndustryMainSector { get; set; }

        /// <summary>
        /// Foreign key to user
        /// </summary>
        public int? IdUser { get; set; }
        /// <summary>
        /// Company is micro business
        /// </summary>
        public bool? MicroBusiness { get; set; }
        /// <summary>
        /// company identification type
        /// </summary>
        public string IDType { get; set; }
        /// <summary>
        /// Company Characterizations
        /// </summary>
        public string Characterization { get; set; }
        /// <summary>
        /// Company Commercial Information
        /// </summary>
        public string CommercialInformation { get; set; }

        public string Women_President { get; set; }        
        public string Women51p { get; set; }
    }
}

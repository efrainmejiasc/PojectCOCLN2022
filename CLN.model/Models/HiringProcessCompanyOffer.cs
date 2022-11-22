using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class HiringProcessCompanyOffer
    {
        public int IdHiringProcessCompanyOffers { get; set; }
        public int IdCompanyProfile { get; set; }
        public string EntityName { get; set; }
        public string ProcessNumber { get; set; }
        public string DetailObjectToHired { get; set; }
        public string Phase { get; set; }
        public DateTime? DateLoadSecop { get; set; }
        public DateTime? LastPublicationDate { get; set; }
        public string BasePrice { get; set; }
        public string ContractingModality { get; set; }
        public string Duration { get; set; }
        public string UnitDuration { get; set; }
        public DateTime? DateReceiptResponses { get; set; }
        public string Department { get; set; }
        public string MainCategoryCode { get; set; }
        public string TypeContract { get; set; }
        public string UrlProcess { get; set; }
        public bool? IsSecopOne { get; set; }
        public string City { get; set; }
        public string Uid { get; set; }
        public string AdditionalCategories { get; set; }
        public DateTime UploadDate { get; set; }

        public virtual CompanyProfile IdCompanyProfileNavigation { get; set; }
    }
}

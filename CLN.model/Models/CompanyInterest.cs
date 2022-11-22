using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyInterest
    {
        public CompanyInterest()
        {
            CompanyInterestDepartments = new HashSet<CompanyInterestDepartment>();
            CompanyInterestModes = new HashSet<CompanyInterestMode>();
            CompanyInterestMunicipalities = new HashSet<CompanyInterestMunicipality>();
            CompanyInterestStages = new HashSet<CompanyInterestStage>();
            CompanyInterestUnspscclassifiers = new HashSet<CompanyInterestUnspscclassifier>();
        }

        public int IdCompanyInterest { get; set; }
        public int IdCompanyProfile { get; set; }
        public string InterestType { get; set; }
        public bool AllDepartements { get; set; }
        public bool AllMunicipalities { get; set; }
        public bool AllStage { get; set; }
        public string Companies { get; set; }
        public bool AllMode { get; set; }
        public bool AllValues { get; set; }
        public int? MinimumValues { get; set; }
        public decimal? MaximumValues { get; set; }
        public bool IncludeValues { get; set; }
        public int IdState { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual CompanyProfile IdCompanyProfileNavigation { get; set; }
        public virtual State IdStateNavigation { get; set; }
        public virtual ICollection<CompanyInterestDepartment> CompanyInterestDepartments { get; set; }
        public virtual ICollection<CompanyInterestMode> CompanyInterestModes { get; set; }
        public virtual ICollection<CompanyInterestMunicipality> CompanyInterestMunicipalities { get; set; }
        public virtual ICollection<CompanyInterestStage> CompanyInterestStages { get; set; }
        public virtual ICollection<CompanyInterestUnspscclassifier> CompanyInterestUnspscclassifiers { get; set; }
    }
}

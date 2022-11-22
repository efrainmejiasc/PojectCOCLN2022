using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyInterestMunicipality
    {
        public int IdCompanyInterestMunicipality { get; set; }
        public int IdCompanyInterest { get; set; }
        public string MunicipalityDaneCode { get; set; }

        public virtual CompanyInterest IdCompanyInterestNavigation { get; set; }
        public virtual TerritorialEntity MunicipalityDaneCodeNavigation { get; set; }
    }
}

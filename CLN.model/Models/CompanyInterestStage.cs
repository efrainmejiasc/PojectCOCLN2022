using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyInterestStage
    {
        public int IdCompanyInterestStage { get; set; }
        public int IdCompanyInterest { get; set; }
        public int Stage { get; set; }

        public virtual CompanyInterest IdCompanyInterestNavigation { get; set; }
    }
}

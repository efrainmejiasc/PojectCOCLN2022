using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyInterestMode
    {
        public int IdCompanyInterestMode { get; set; }
        public int IdCompanyInterest { get; set; }
        public int Mode { get; set; }

        public virtual CompanyInterest IdCompanyInterestNavigation { get; set; }
    }
}

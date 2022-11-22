using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyInterestUnspscclassifier
    {
        public int IdCompanyInterestClassifier { get; set; }
        public int IdCompanyInterest { get; set; }
        public int ClassifierCode { get; set; }

        public virtual CompanyInterest IdCompanyInterestNavigation { get; set; }
    }
}

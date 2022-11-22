using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class UserCompanyProfile
    {
        public int IdUserCompanyProfile { get; set; }
        public int IdUser { get; set; }
        public int IdCompanyProfile { get; set; }

        public virtual CompanyProfile IdCompanyProfileNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyInterestDepartment
    {
        public int IdCompanyInterestDepartment { get; set; }
        public int IdCompanyInterest { get; set; }
        public string DepartmentDaneCode { get; set; }

        public virtual TerritorialEntity DepartmentDaneCodeNavigation { get; set; }
        public virtual CompanyInterest IdCompanyInterestNavigation { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class TerritorialEntity
    {
        public TerritorialEntity()
        {
            CompanyInterestDepartments = new HashSet<CompanyInterestDepartment>();
            CompanyInterestMunicipalities = new HashSet<CompanyInterestMunicipality>();
        }

        public int IdTerritorialEntity { get; set; }
        public string DaneCode { get; set; }
        public string TerritorialEntity1 { get; set; }
        public string DaneCodeFather { get; set; }

        public virtual ICollection<CompanyInterestDepartment> CompanyInterestDepartments { get; set; }
        public virtual ICollection<CompanyInterestMunicipality> CompanyInterestMunicipalities { get; set; }
    }
}

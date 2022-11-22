using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class Domain
    {
        public int IdDomain { get; set; }
        public int IdDomainType { get; set; }
        public int Enumerator { get; set; }
        public string Name { get; set; }
        public string Translation { get; set; }
        public decimal? Value { get; set; }
        public bool? IsActive { get; set; }
        public int? IdUserCreate { get; set; }
        public DateTime? DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }
        public bool? IsSystemDomain { get; set; }

        public virtual DomainType IdDomainTypeNavigation { get; set; }
    }
}

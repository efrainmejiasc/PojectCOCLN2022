using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class DomainType
    {
        public DomainType()
        {
            Domains = new HashSet<Domain>();
        }

        public int IdDomainType { get; set; }
        public int Enumerator { get; set; }
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public int? IdUserCreate { get; set; }
        public DateTime? DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }
        public string Translation { get; set; }

        public virtual ICollection<Domain> Domains { get; set; }
    }
}

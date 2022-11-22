using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class Template
    {
        public Template()
        {
            HomeComponents = new HashSet<HomeComponent>();
        }

        public int IdTemplate { get; set; }
        public string Body { get; set; }
        public string Subject { get; set; }
        public int IdDomainType { get; set; }
        public int Enumerator { get; set; }
        public int IdState { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual State IdStateNavigation { get; set; }
        public virtual ICollection<HomeComponent> HomeComponents { get; set; }
    }
}

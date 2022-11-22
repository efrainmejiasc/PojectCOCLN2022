using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class HomeComponent
    {
        public HomeComponent()
        {
            HomeComponentAttributes = new HashSet<HomeComponentAttribute>();
        }

        public int IdHomeComponent { get; set; }
        public string Name { get; set; }
        public int IdTemplate { get; set; }
        public int IdState { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual State IdStateNavigation { get; set; }
        public virtual Template IdTemplateNavigation { get; set; }
        public virtual ICollection<HomeComponentAttribute> HomeComponentAttributes { get; set; }
    }
}

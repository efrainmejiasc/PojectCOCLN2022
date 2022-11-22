using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class State
    {
        public State()
        {
            CompanyInterests = new HashSet<CompanyInterest>();
            CpCiiuUnspscClnCorrelatives = new HashSet<CpCiiuUnspscClnCorrelative>();
            HomeComponents = new HashSet<HomeComponent>();
            Menus = new HashSet<Menu>();
            Permits = new HashSet<Permit>();
            Rols = new HashSet<Rol>();
            Templates = new HashSet<Template>();
            UnspscClassifiers = new HashSet<UnspscClassifier>();
        }

        public int IdState { get; set; }
        public string Name { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual ICollection<CompanyInterest> CompanyInterests { get; set; }
        public virtual ICollection<CpCiiuUnspscClnCorrelative> CpCiiuUnspscClnCorrelatives { get; set; }
        public virtual ICollection<HomeComponent> HomeComponents { get; set; }
        public virtual ICollection<Menu> Menus { get; set; }
        public virtual ICollection<Permit> Permits { get; set; }
        public virtual ICollection<Rol> Rols { get; set; }
        public virtual ICollection<Template> Templates { get; set; }
        public virtual ICollection<UnspscClassifier> UnspscClassifiers { get; set; }
    }
}

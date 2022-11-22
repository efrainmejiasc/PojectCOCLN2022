using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class Menu
    {
        public Menu()
        {
            MenuRolPermits = new HashSet<MenuRolPermit>();
            MenuRols = new HashSet<MenuRol>();
        }

        public int IdMenu { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Tooltip { get; set; }
        public string Logo { get; set; }
        public int? IdFatherMenu { get; set; }
        public int IdState { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual State IdStateNavigation { get; set; }
        public virtual ICollection<MenuRolPermit> MenuRolPermits { get; set; }
        public virtual ICollection<MenuRol> MenuRols { get; set; }
    }
}

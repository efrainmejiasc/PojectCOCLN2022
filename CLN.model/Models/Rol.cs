using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class Rol
    {
        public Rol()
        {
            MenuRolPermits = new HashSet<MenuRolPermit>();
            MenuRols = new HashSet<MenuRol>();
            RolPermits = new HashSet<RolPermit>();
        }

        public int IdRol { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int IdState { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }

        public virtual State IdStateNavigation { get; set; }
        public virtual ICollection<MenuRolPermit> MenuRolPermits { get; set; }
        public virtual ICollection<MenuRol> MenuRols { get; set; }
        public virtual ICollection<RolPermit> RolPermits { get; set; }
    }
}

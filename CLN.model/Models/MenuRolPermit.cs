using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class MenuRolPermit
    {
        public int IdMenuRolPermit { get; set; }
        public int IdMenu { get; set; }
        public int IdRol { get; set; }
        public int IdPermit { get; set; }

        public virtual Menu IdMenuNavigation { get; set; }
        public virtual Permit IdPermitNavigation { get; set; }
        public virtual Rol IdRolNavigation { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class RolPermit
    {
        public int IdRolPermit { get; set; }
        public int IdRol { get; set; }
        public int IdPermit { get; set; }

        public virtual Permit IdPermitNavigation { get; set; }
        public virtual Rol IdRolNavigation { get; set; }
    }
}

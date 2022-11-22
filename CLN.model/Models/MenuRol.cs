using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class MenuRol
    {
        public int IdMenuRol { get; set; }
        public int IdMenu { get; set; }
        public int IdRol { get; set; }
        public int? Orden { get; set; }

        public virtual Menu IdMenuNavigation { get; set; }
        public virtual Rol IdRolNavigation { get; set; }
    }
}

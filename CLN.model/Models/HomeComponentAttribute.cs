using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class HomeComponentAttribute
    {
        public int IdHomeComponentAttribute { get; set; }
        public int IdHomeComponent { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public virtual HomeComponent IdHomeComponentNavigation { get; set; }
    }
}

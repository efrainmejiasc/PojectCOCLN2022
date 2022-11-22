using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class Audit
    {
        public int IdAudit { get; set; }
        public int IdAction { get; set; }
        public int IdMessageResponse { get; set; }
        public int? IdUser { get; set; }
        public DateTime Date { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class ViewAudit
    {
        public int IdAudit { get; set; }
        public string Email { get; set; }
        public string NameAction { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}

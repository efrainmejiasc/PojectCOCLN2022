using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class ProcesoxMail
    {
        public decimal IdProcesoxMail { get; set; }
        public decimal IdEmailSending { get; set; }
        public decimal IdHiringProcessCompanyOffers { get; set; }
        public decimal CompanyId { get; set; }
        public DateTime? Date { get; set; }
    }
}

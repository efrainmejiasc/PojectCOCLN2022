using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class CompanyInterestNotification
    {
        public int IdCompanyInterestNotification { get; set; }
        public int IdCompanyInterest { get; set; }
        public int Notification { get; set; }
        public string NotificationFrequency { get; set; }
    }
}

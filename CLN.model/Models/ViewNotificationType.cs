using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class ViewNotificationType
    {
        public int Enumerator { get; set; }
        public string Notification { get; set; }
        public string NotificationFrequency { get; set; }
        public long? Tmp { get; set; }
    }
}

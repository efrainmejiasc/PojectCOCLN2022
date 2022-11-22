using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class NotificationTypeDto
    {
        public int Enumerator { get; set; }
        public string Notification { get; set; }
        public string NotificationFrequency { get; set; }
        public bool isActive { get; set; }
    }
}

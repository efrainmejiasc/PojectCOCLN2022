using CLN.model.APIModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class ScheduledVirtualAppointmentsNotify
    {
        public string Type { get; set; }
        public string TypeState { get; set; }
        public string Host { get; set; }
        public string Guest { get; set; }
        public string EmailHost {get;set;}
        public string EmailGuest { get; set; }
        public string WeekDay { get; set; }
        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartHour { get; set; }
        public TimeSpan EndHour { get; set; }
        public List<IndustryDto> IndustriesHost { get; set; }
        public List<IndustryDto> IndustriesGuest{ get; set; }
        public string Link { get; set; }
        public string Reason { get; set; }
        public string NumberIdGuest {get;set;}
        public string NumberIdHost { get; set; }
        public string ReasonState { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class ScheduledVirtualAppointments
    {
        public int Id { get; set; }
        public string NumberId { get; set; }
        public string GuestIdNumber { get; set; }
        public string WeekDay { get; set; }
        public string AppointmentReason { get; set; }
        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartHour { get; set; }
        public TimeSpan EndHour { get; set; }
        public string App{ get; set; }
        public string Link { get; set; }
        public DateTime DateCreate{ get; set; }
        public DateTime DateUpdate { get; set; }
        public int IdUserCreate { get; set; }
        public int IdUserUpdate { get; set; }
        public int IdState { get; set; }
        public int IdStateGuest { get; set; }
        public int IdStateHost { get; set; }

        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string CompanyNameHost { get; set; }
        public string EmailHost { get; set; }
        public string PhoneNumberHost { get; set; }
        public string CompanyIdHost { get; set; }

        public string CompanyNameGuest { get; set; }
        public string EmailGuest { get; set; }
        public string PhoneNumberGuest { get; set; }
        public string CompanyIdGuest{ get; set; }

        public string Type { get; set; }

        public string ReasonState { get; set; }
        public string CancellationReason { get; set; }
        public string RejectionReason { get; set; }

    }
}

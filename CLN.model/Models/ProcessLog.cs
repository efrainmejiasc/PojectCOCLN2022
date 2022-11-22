using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class ProcessLog
    {
        public int IdProcessLog { get; set; }
        public string Process { get; set; }
        public string Ip { get; set; }
        public DateTime ProcessStartDate { get; set; }
        public DateTime ProcesseEndDate { get; set; }
        public string ProcessResult { get; set; }
        public bool Success { get; set; }
        public int Attempts { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }
    }
}

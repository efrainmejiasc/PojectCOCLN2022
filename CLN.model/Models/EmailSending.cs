using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class EmailSending
    {
        public int IdEmailSending { get; set; }
        public string Subject { get; set; }
        public string Email { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Cc { get; set; }
        public DateTime EmailDate { get; set; }
        public DateTime? EmailSendingDate { get; set; }
        public int Attempts { get; set; }
        public bool Success { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateCreate { get; set; }
        public int? IdUserUpdate { get; set; }
        public DateTime? DateUpdate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace CLN.Services.Email
{
    public class EmailData
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Cc { get; set; }
        public string EmailDate { get; set; }
        public string EmailSendingDate { get; set; }
        public int Attempts { get; set; }
        public bool Success { get; set; }

        public EmailData(string Subject, string Body, string To, string EmailDate, int Attempts) {
            this.Subject = Subject;
            this.Body = Body;
            this.To = To;
            this.EmailDate = EmailDate;
            this.Attempts = Attempts;
        }

        public EmailData()
        {
        }
    }
}

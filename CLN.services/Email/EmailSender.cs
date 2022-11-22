using CLN.model.APIModels;
using CLN.model.Settings;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace CLN.Services.Email
{
    public class EmailSender
    {
        private readonly IEmailService _emailService;

        public EmailSender(IEmailService emailService)
        {
            _emailService = emailService;
        }

        internal static void SetMailProperties(SendEmailDetails emailDetail, MailMessage mm)
        {
            if (emailDetail.To != null && emailDetail.To.Length > 0)
            {
                foreach (var e in emailDetail.To)
                { 
                    if(!string.IsNullOrEmpty(e))
                        mm.To.Add(new MailAddress(e.Trim()));
                }
            }
            //else { mm.To.Add(new MailAddress(emailDetail.ToEmail, emailDetail.ToName)); }
                       
            mm.Priority = MailPriority.High;
            mm.Subject = emailDetail.Subject.Trim();
            mm.BodyEncoding = Encoding.Default;
            mm.Body = emailDetail.Body;
            mm.IsBodyHtml = true;
        }

        internal static bool SendSmtpEmailAsync(MailMessage mm, AppSettings _settings)
        {
            try
            {
                var basicCredential = new NetworkCredential(_settings.Sender,_settings.Password);
                SmtpClient client = new()
                {
                    Host = _settings.MailServer,
                    Port = _settings.MailPort,
                    EnableSsl = _settings.EnableSSL,

                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = basicCredential
                };

                mm.From = new MailAddress(_settings.Sender, _settings.SenderName);
                var bcc = _settings.BccEmail;
                if (!string.IsNullOrEmpty(bcc))
                {
                    var lbcc = bcc.Split(';').ToList();
                    foreach (var b in lbcc)
                    {
                        if (!string.IsNullOrEmpty(b))
                            mm.Bcc.Add(new MailAddress(b.Trim()));
                    }
                }

                client.Send(mm);
                client.SendCompleted += (s, e) => {
                    client.Dispose();           
                };
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}

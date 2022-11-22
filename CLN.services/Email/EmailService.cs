using CLN.model.APIModels;
using CLN.model.Settings;
using CLN.services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace CLN.Services.Email
{ 
    public class EmailService : IEmailService
    {
        private readonly ICommonService _commonService;
        private readonly AppSettings _settings;

        public EmailService(ICommonService commonService, IOptions<AppSettings> settings)
        {
            _commonService = commonService;
            _settings = settings.Value;
        }

        public async Task<StoreProcedureLiteResponse> SetEmailSending(EmailData emailData, string user)
        {
            var edJson = JsonConvert.SerializeObject(emailData);
            edJson = edJson.Replace("'", "''");
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@emailDataJson", edJson),
                new SqlParameter("@user", user)
            };
            var response = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetEmailSending", parameterList, 2);
            return response;
        }

        public async Task<StoreProcedureLiteResponse> SetSMSSending(EmailData emailData, string user)
        {
            var edJson = JsonConvert.SerializeObject(emailData);
            edJson = edJson.Replace("'", "''");
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@emailDataJson", edJson),
                new SqlParameter("@user", user)
            };
            var response = (StoreProcedureLiteResponse)await _commonService.ExcuteSqlStoredProcedure<StoreProcedureLiteResponse>("SetEmailSending", parameterList, 2);
            return response;
        }

        public async Task<EmailTemplateDto> GetEmailTemplate(int enumerator)
        {
            SqlParameter[] parameterList = new SqlParameter[]
            {
                new SqlParameter("@enumerator", enumerator)
            };
            var emailTemplate = (EmailTemplateDto)await _commonService.ExcuteSqlStoredProcedure<EmailTemplateDto>("GetEmailTemplate", parameterList, 2);
            return emailTemplate;
        }

        public async Task<object> SendEmail(SendEmailDetails emailDetail)
        {
            bool rta = false;
            StoreProcedureLiteResponse ses = new();
            try 
            {
                using (MailMessage mm = new())
                {
                    EmailSender.SetMailProperties(emailDetail, mm);

                    var emailData = new EmailData(mm.Subject, mm.Body, mm.To.ToString(), DateTime.Now.ToString("dd/MM/yyy HH:mm:ss"), 1);

                    rta = EmailSender.SendSmtpEmailAsync(mm, _settings);

                    emailData.From = mm.From.Address.ToString();
                    emailData.Cc = mm.Bcc.ToString();
                    emailData.EmailSendingDate = DateTime.Now.ToString("dd/MM/yyy HH:mm:ss");
                    emailData.Success = rta;
                    ses = await SetEmailSending(emailData, "");
                }
                return new { Result = rta, ses.Message };
            }
            catch (Exception ex)
            {
                var exc = ex.Message;
                return new { Result = rta, Message = exc };
            }          
        }

        public async Task<object> Mail360(SendEmailDetails emailDetail)
        {
            bool rta = false;
            try
            {
                emailDetail.ReplyTo = _settings.mail360ReplyTo.ToLower();
                emailDetail.FromEmail = _settings.mail360from.ToLower();
                emailDetail.FromName = _settings.mail360FromName.ToLower();
                var emailData = new EmailData(emailDetail.Subject, emailDetail.Body, string.Join(",",emailDetail.To), DateTime.Now.ToString("dd/MM/yyy HH:mm:ss"), 1);
                var json = JsonConvert.SerializeObject(emailDetail);
                var data = new StringContent(json, Encoding.UTF8, "application/json");
                var url = _settings.mail360Url;
                using var client = new HttpClient();
                client.DefaultRequestHeaders.Add("Authorization", "Basic " + _settings.mail360Key);
                var response = await client.PostAsync(url, data);
                string result = response.Content.ReadAsStringAsync().Result;
                if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
                {
                    rta = true;
                }
                emailData.From = emailDetail.FromEmail;
                emailData.EmailSendingDate = DateTime.Now.ToString("dd/MM/yyy HH:mm:ss");
                emailData.Success = rta;
                var ses = await SetEmailSending(emailData, "");
                return new { Result = rta, ses.Message };
            }
            catch (Exception ex)
            {
                var exc = ex.Message;
                return new { Result = rta, Message = exc };
            }
        }

        public async Task<object> SMS360(SendSMSDetails smsDetail)
        {
            bool rta = false;
            try
            {
                smsDetail.From = _settings.SMS360From;
                var smsData = new EmailData("SMS", smsDetail.Message, string.Join(",", smsDetail.To), DateTime.Now.ToString("dd/MM/yyy HH:mm:ss"), 1);
                var json = JsonConvert.SerializeObject(smsDetail);
                var data = new StringContent(json, Encoding.UTF8, "application/json");
                var url = _settings.SMS360Url;
                using var client = new HttpClient();
                client.DefaultRequestHeaders.Add("Authorization", "Basic " + _settings.SMS360Key);
                var response = await client.PostAsync(url, data);
                string result = response.Content.ReadAsStringAsync().Result;
                if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
                {
                    rta = true;
                }
                smsData.From = smsDetail.From;
                smsData.EmailSendingDate = DateTime.Now.ToString("dd/MM/yyy HH:mm:ss");
                smsData.Success = rta;
                var sms = await SetSMSSending(smsData, "");
                return new { Result = rta, sms.Message };
            }
            catch (Exception ex)
            {
                var exc = ex.Message;
                return new { Result = rta, Message = exc };
            }
        }
    }
}



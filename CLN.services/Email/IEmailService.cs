using System.Collections.Generic;
using System.Threading.Tasks;
using CLN.model.APIModels;

namespace CLN.Services.Email
{
    public interface IEmailService
    {
        Task<StoreProcedureLiteResponse> SetEmailSending(EmailData emailData, string user);

        Task<EmailTemplateDto> GetEmailTemplate(int enumerator);

        Task<object> SendEmail(SendEmailDetails emailDetail);

        Task<object> Mail360(SendEmailDetails emailDetail);
        Task<object> SMS360(SendSMSDetails smsDetail);
    }
}
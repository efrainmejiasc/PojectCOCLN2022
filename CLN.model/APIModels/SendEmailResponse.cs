using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    /// <summary>
    /// A response from a SendEmail call for any <see cref="IEmailSender"/> implementation
    /// </summary>
    public class SendEmailResponse
    {
        /// <summary>
        /// True if the email was sent successfully
        /// </summary>
        public bool Successful => !(Errors?.Count > 0);

        /// <summary>
        /// The error message if the sending failed
        /// </summary>
        public List<string> Errors { get; set; }
    }
}

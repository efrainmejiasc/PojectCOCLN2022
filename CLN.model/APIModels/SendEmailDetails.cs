using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace CLN.model.APIModels
{
    /// <summary>
    /// The details about the email to send
    /// </summary>
    public class SendEmailDetails
    {
        /// <summary>
        /// The name of the sender
        /// </summary>
        [JsonProperty("fromName")]
        public string FromName { get; set; }

        /// <summary>
        /// The email of the sender
        /// </summary>
        [JsonProperty("fromEmail")]
        public string FromEmail { get; set; }

        /// <summary>
        /// The name of the receiver
        /// </summary>
        //public string ToName { get; set; }

        ///// <summary>
        ///// The email of the receiver
        ///// </summary>
        //public string ToEmail { get; set; }

        /// <summary>
        /// The email of the receiver
        /// </summary>
        [JsonProperty("to")]
        public string[] To{ get; set; }

        /// <summary>
        /// The email subject
        /// </summary>
        [JsonProperty("subject")]
        public string Subject { get; set; }

        /// <summary>
        /// The email body content
        /// </summary>
        [JsonProperty("body")]
        public string Body { get; set; }

        /// <summary>
        /// Indicates if the contents is a HTML email
        /// </summary>
        //public bool IsHTML { get; set; }

        /// <summary>
        /// The replyTo
        /// </summary>
        [JsonProperty("replyTo")]
        public string ReplyTo { get; set; }
    }
}

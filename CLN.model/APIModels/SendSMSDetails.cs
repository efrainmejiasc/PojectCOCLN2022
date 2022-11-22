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
    public class SendSMSDetails
    {
        /// <summary>
        /// The name of the sender
        /// </summary>
        [JsonProperty("from")]
        public string From { get; set; }

        /// <summary>
        /// The email of the sender
        /// </summary>
        [JsonProperty("message")]
        public string Message { get; set; }

        /// <summary>
        /// The email of the receiver
        /// </summary>
        [JsonProperty("to")]
        public string[] To{ get; set; }
    }
}

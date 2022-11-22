using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class EmailTemplateDto
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<AdditionalBody> AdditionalBody { get; set; }
    }
    public class AdditionalBody
    {
        public string Html { get; set; }
    }
}

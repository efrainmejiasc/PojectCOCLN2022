using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class SupplyElementTemplateDto
    {
        [JsonProperty("enumerator")]
        public int Enumerator { get; set; }

        [JsonProperty("templateName")]
        public string TemplateName { get; set; }

        [JsonProperty("templateInfo")]
        public List<SupplyChainElementDto> TemplateInfo { get; set; }
    }
}

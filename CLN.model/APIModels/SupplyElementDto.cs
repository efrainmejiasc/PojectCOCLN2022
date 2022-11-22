using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class AdditionalInfo
    {
        [JsonProperty("tooltip")]
        public string Tooltip { get; set; }

        [JsonProperty("logo")]
        public string Logo { get; set; }
    }

    public class SupplyElementDto
    {
        [JsonProperty("enumerator")]
        public int Enumerator { get; set; }

        [JsonProperty("supplyElement")]
        public string SupplyElement { get; set; }

        [JsonProperty("additionalInfo")]
        public List<AdditionalInfo> AdditionalInfo { get; set; }
    }
}

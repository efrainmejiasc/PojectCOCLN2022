using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class SupplyChainDto
    {
        [JsonProperty("idSupplyChain")]
        public int IdSupplyChain { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("billingCost")]
        public decimal? BillingCost { get; set; }

        [JsonProperty("totalCost")]
        public decimal? TotalCost { get; set; }

        [JsonProperty("sharePercentage")]
        public decimal? SharePercentage { get; set; }

        [JsonProperty("supplyChainElements")]
        public List<SupplyChainElementDto> SupplyChainElements { get; set; }
    }

    public class SupplyChainElementDto
    {
        [JsonProperty("idSupplyChainElement")]
        public int IdSupplyChainElement { get; set; }

        [JsonProperty("idSupplyChain")]
        public int IdSupplyChain { get; set; }

        [JsonProperty("supplyElement")]
        public int SupplyElement { get; set; }

        [JsonProperty("chargePerson")]
        public string ChargePerson { get; set; }

        [JsonProperty("activities")]
        public string Activities { get; set; }

        [JsonProperty("measurementUnit")]
        public string MeasurementUnit { get; set; }

        [JsonProperty("quantity")]
        public int? Quantity { get; set; }

        [JsonProperty("cost")]
        public decimal? Cost { get; set; }

        [JsonProperty("position")]
        public int Position { get; set; }
    }
}

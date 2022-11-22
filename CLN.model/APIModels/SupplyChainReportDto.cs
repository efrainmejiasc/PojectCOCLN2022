using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CLN.model.APIModels
{
    public class SupplyChainReportDto
    {
        [JsonProperty("idSupplyChain")]
        public int IdSupplyChain { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; }

        [JsonProperty("companyIndustry")]
        public string CompanyIndustry { get; set; }

        [JsonProperty("billingCost")]
        public decimal? BillingCost { get; set; }

        [JsonProperty("totalCost")]
        public decimal? TotalCost { get; set; }

        [JsonProperty("sharePercentage")]
        public decimal? SharePercentage { get; set; }

        [JsonProperty("lastUpdateDate")]
        public DateTime LastUpdateDate { get; set; }

        [JsonProperty("supplyChainElements")]
        public List<SupplyChainElementReportDto> SupplyChainElements { get; set; }
    }

    public class SupplyChainElementReportDto
    {
        [JsonProperty("idSupplyChainElement")]
        public int IdSupplyChainElement { get; set; }

        [JsonProperty("idSupplyChain")]
        public int IdSupplyChain { get; set; }

        [JsonProperty("supplyElementEnumerator")]
        public int SupplyElementEnumerator { get; set; }

        [JsonProperty("supplyElementName")]
        public string SupplyElementName { get; set; }

        [JsonProperty("supplyElementLogo")]
        public string SupplyElementLogo { get; set; }

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

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class AvailableHoursCompanyDto
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("NumberId")]
        public string NumberId { get; set; }

        [JsonProperty("CompanyName")]
        public string CompanyName { get; set; }

        [JsonProperty("Email")]
        public string Email { get; set; }

        [JsonProperty("Phonenumber")]
        public string Phonenumber { get; set; }

        [JsonProperty("IndustryMainSector")]
        public List<Dictionary<string,string>> IndustryMainSector { get; set; }

        [JsonProperty("Status")]
        public int Status { get; set; }

        [JsonProperty("DateCreate")]
        public DateTime DateCreate { get; set; }

        [JsonProperty("IdUserCreate")]
        public int IdUserCreate { get; set; }

        [JsonProperty("DateUpdate")]
        public DateTime DateUpdate { get; set; }

        [JsonProperty("IdUserUpdate")]
        public int IdUserUpdate { get; set; }

        [JsonProperty("Monday")]
        public AvailableHoursCompanyDetail Monday { get; set; }

        [JsonProperty("Tuesday")]
        public AvailableHoursCompanyDetail Tuesday { get; set; }

        [JsonProperty("Wednesday")]
        public AvailableHoursCompanyDetail Wednesday { get; set; }

        [JsonProperty("Thursday")]
        public AvailableHoursCompanyDetail Thursday { get; set; }

        [JsonProperty("Friday")]
        public AvailableHoursCompanyDetail Friday { get; set; }

        [JsonProperty("Saturday")]
        public AvailableHoursCompanyDetail Saturday { get; set; }

        [JsonProperty("Sunday")]
        public AvailableHoursCompanyDetail Sunday { get; set; }

    }

    public class AvailableHoursCompanyDetail
    {
        [JsonProperty("IdDetail")]
        public int IdDetail { get; set; }
        
        [JsonProperty("NumberIdDetail")]
        public string NumberIdDetail { get; set; }
       
        [JsonProperty("WeekDay")]
        public string WeekDay { get; set; }
      
        [JsonProperty("S_05_06")]
        public bool S_05_06 { get; set; }

        [JsonProperty("V_05_06")]
        public bool V_05_06 { get; set; }

        [JsonProperty("S_06_07")]
        public bool S_06_07 { get; set; }

        [JsonProperty("V_06_07")]
        public bool V_06_07 { get; set; }

        [JsonProperty("S_07_08")]
        public bool S_07_08 { get; set; }

        [JsonProperty("V_07_08")]
        public bool V_07_08 { get; set; }

        [JsonProperty("S_08_09")]
        public bool S_08_09 { get; set; }

        [JsonProperty("V_08_09")]
        public bool V_08_09 { get; set; }

        [JsonProperty("S_09_10")]
        public bool S_09_10 { get; set; }

        [JsonProperty("V_09_10")]
        public bool V_09_10 { get; set; }

        [JsonProperty("S_10_11")]
        public bool S_10_11 { get; set; }

        [JsonProperty("V_10_11")]
        public bool V_10_11 { get; set; }

        [JsonProperty("S_11_12")]
        public bool S_11_12 { get; set; }

        [JsonProperty("V_11_12")]
        public bool V_11_12 { get; set; }

        [JsonProperty("S_12_13")]
        public bool S_12_13 { get; set; }

        [JsonProperty("V_12_13")]
        public bool V_12_13 { get; set; }

        [JsonProperty("S_13_14")]
        public bool S_13_14 { get; set; }

        [JsonProperty("V_13_14")]
        public bool V_13_14 { get; set; }

        [JsonProperty("S_14_15")]
        public bool S_14_15 { get; set; }

        [JsonProperty("V_14_15")]
        public bool V_14_15 { get; set; }

        [JsonProperty("S_15_16")]
        public bool S_15_16 { get; set; }

        [JsonProperty("V_15_16")]
        public bool V_15_16 { get; set; }

        [JsonProperty("S_16_17")]
        public bool S_16_17 { get; set; }

        [JsonProperty("V_16_17")]
        public bool V_16_17 { get; set; }

        [JsonProperty("S_17_18")]
        public bool S_17_18 { get; set; }

        [JsonProperty("V_17_18")]
        public bool V_17_18 { get; set; }

        [JsonProperty("S_18_19")]
        public bool S_18_19 { get; set; }

        [JsonProperty("V_18_19")]
        public bool V_18_19 { get; set; }

        [JsonProperty("S_19_20")]
        public bool S_19_20 { get; set; }

        [JsonProperty("V_19_20")]
        public bool V_19_20 { get; set; }

        [JsonProperty("SelectedDay")]
        public bool SelectedDay { get; set; }

    }
}

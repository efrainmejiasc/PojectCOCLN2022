using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public  class AvailableHoursCompany
    {
        public int Id { get; set; }
        public string NumberId { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Phonenumber { get; set; }
        public string IndustryMainSector { get; set; }
        public int Status { get; set; }
        public bool IncludeExclude { get; set; }
        public DateTime EspecificDate{ get; set; }
        public DateTime DateCreate { get; set; }
        public int IdUserCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public int IdUserUpdate { get; set; }
        public int IdDetail { get; set; }
        public string NumberIdDetail { get; set; }
        public string WeekDay { get; set; }
        public bool S_05_06 { get; set; }
        public bool V_05_06 { get; set; }
        public bool S_06_07 { get; set; }
        public bool V_06_07 { get; set; }
        public bool S_07_08 { get; set; }
        public bool V_07_08 { get; set; }
        public bool S_08_09 { get; set; }
        public bool V_08_09 { get; set; }
        public bool S_09_10 { get; set; }
        public bool V_09_10 { get; set; }
        public bool S_10_11 { get; set; }
        public bool V_10_11 { get; set; }
        public bool S_11_12 { get; set; }
        public bool V_11_12 { get; set; }
        public bool S_12_13 { get; set; }
        public bool V_12_13 { get; set; }
        public bool S_13_14 { get; set; }
        public bool V_13_14 { get; set; }
        public bool S_14_15 { get; set; }
        public bool V_14_15 { get; set; }
        public bool S_15_16 { get; set; }
        public bool V_15_16 { get; set; }
        public bool S_16_17 { get; set; }
        public bool V_16_17 { get; set; }
        public bool S_17_18 { get; set; }
        public bool V_17_18 { get; set; }
        public bool S_18_19 { get; set; }
        public bool V_18_19 { get; set; }
        public bool S_19_20 { get; set; }
        public bool V_19_20 { get; set; }
        public bool SelectedDay { get; set; }

    }
}

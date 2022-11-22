using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class HiringProcessByFilter
    {
        public string ProcessNumber { get; set; }
        public string UNSPSCCodes { get; set; }
        public string Entities { get; set; }
        public string ObjectDescription { get; set; }
        public string Stages { get; set; }
        public string Modes { get; set; }
        public decimal? MinValue { get; set; }
        public decimal? MaxValue { get; set; }
        public string Departments { get; set; }
        public string Municipalities { get; set; }
        public bool? SecopOne { get; set; }
    }
}

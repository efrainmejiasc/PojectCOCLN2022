using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class AcquisitionPlan
    {
        public int IdAcquisitionPlans { get; set; }
        public string IdPaa { get; set; }
        public string EntityName { get; set; }
        public string Year { get; set; }
        public string CreatedDate { get; set; }
        public string LastEditDate { get; set; }
        public string Department { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public string ContactInfo { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public string Description { get; set; }
        public string AcquisitionValue { get; set; }
        public string CategoriesCodes { get; set; }
        public string InitDate { get; set; }
        public string Modality { get; set; }
        public string Uid { get; set; }
        public bool? IsSecopOne { get; set; }
        public DateTime UploadDate { get; set; }
    }
}

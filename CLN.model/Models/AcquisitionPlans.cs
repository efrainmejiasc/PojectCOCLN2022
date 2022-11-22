using CLN.model.APIModels;
using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class AcquisitionPlans
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
        public string Duration { get; set; }
        public string Uid { get; set; }
        public bool? IsSecopOne { get; set; }
        public DateTime UploadDate { get; set; }

        public static explicit operator AcquisitionPlans(AcquisitionPlansSecopOneDto acquisition)
        {
            AcquisitionPlans acquisitionPlans = new();
            acquisitionPlans.IdPaa = acquisition.IdPaa;
            acquisitionPlans.Uid = acquisition.Uid;
            acquisitionPlans.EntityName = acquisition.EntityName;
            acquisitionPlans.Year = acquisition.Year;
            acquisitionPlans.CreatedDate = acquisition.CreatedDate;
            acquisitionPlans.LastEditDate = acquisition.LastEditDate;
            acquisitionPlans.Department = acquisition.Department;
            acquisitionPlans.City = acquisition.City;
            acquisitionPlans.Location = acquisition.Location;
            acquisitionPlans.ContactInfo = acquisition.ContactInfo;
            acquisitionPlans.ContactEmail = acquisition.ContactEmail;
            acquisitionPlans.ContactPhone = acquisition.ContactPhone;
            acquisitionPlans.Description = acquisition.Description;
            acquisitionPlans.AcquisitionValue = acquisition.AcquisitionValue;
            acquisitionPlans.CategoriesCodes = acquisition.CategoriesCodes;
            acquisitionPlans.InitDate = acquisition.InitDate;
            acquisitionPlans.Modality = acquisition.Modality;
            acquisitionPlans.Duration = acquisition.Duration;
            acquisitionPlans.IsSecopOne = true;
            return acquisitionPlans;
        }
        public static explicit operator AcquisitionPlans(AcquisitionPlansSecopTwoDto acquisition)
        {
            AcquisitionPlans acquisitionPlans = new();
            acquisitionPlans.IdPaa = acquisition.IdPaa;
            acquisitionPlans.Uid = acquisition.Uid;
            acquisitionPlans.EntityName = acquisition.EntityName;
            acquisitionPlans.Year = acquisition.Year;
            acquisitionPlans.CreatedDate = acquisition.CreatedDate;
            acquisitionPlans.LastEditDate = acquisition.LastEditDate;
            acquisitionPlans.Department = acquisition.Department;
            acquisitionPlans.City = acquisition.City;
            acquisitionPlans.Location = acquisition.Location;
            acquisitionPlans.ContactInfo = acquisition.ContactInfo;
            acquisitionPlans.ContactEmail = acquisition.ContactEmail;
            acquisitionPlans.ContactPhone = acquisition.ContactPhone;
            acquisitionPlans.Description = acquisition.Description;
            acquisitionPlans.AcquisitionValue = acquisition.AcquisitionValue;
            acquisitionPlans.CategoriesCodes = acquisition.CategoriesCodes;
            acquisitionPlans.InitDate = acquisition.InitDate;
            acquisitionPlans.Modality = acquisition.Modality;
            acquisitionPlans.Duration = acquisition.Duration;
            acquisitionPlans.IsSecopOne = false;
            return acquisitionPlans;
        }
    }
}

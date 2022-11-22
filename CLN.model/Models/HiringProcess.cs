using CLN.model.APIModels;
using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class HiringProcess
    {
        public int IdHiringProcess { get; set; }
        public string EntityName { get; set; }
        public string ProcessNumber { get; set; }
        public string CertificateNumber { get; set; }
        public string DetailObjectToHired { get; set; }
        public string Phase { get; set; }
        public DateTime? DateLoadSecop { get; set; }
        public DateTime? LastPublicationDate { get; set; }
        public string BasePrice { get; set; }
        public string ContractingModality { get; set; }
        public string Duration { get; set; }
        public string UnitDuration { get; set; }
        public DateTime? DateReceiptResponses { get; set; }
        public string Department { get; set; }
        public string StateProcess { get; set; }
        public string MainCategoryCode { get; set; }
        public string TypeContract { get; set; }
        public string UrlProcess { get; set; }
        public bool? IsSecopOne { get; set; }
        public string City { get; set; }
        public string Uid { get; set; }
        public string AdditionalCategories { get; set; }
        public DateTime UploadDate { get; set; }

        public static explicit operator HiringProcess(HiringProcessSecopOneDto hiring)
        {
            HiringProcess hiringProcess = new();
            hiringProcess.Uid = hiring.Uid;
            hiringProcess.EntityName = hiring.EntityName;
            hiringProcess.ProcessNumber = hiring.ProcessNumber;
            hiringProcess.CertificateNumber = hiring.CertificateNumber;
            hiringProcess.DetailObjectToHired = hiring.DetailObjectToHired;
            hiringProcess.Phase = hiring.Phase;
            hiringProcess.DateLoadSecop = hiring.DateLoadSecop;
            hiringProcess.LastPublicationDate = hiring.LastPublicationDate;
            hiringProcess.BasePrice = hiring.BasePrice;
            hiringProcess.ContractingModality = hiring.ContractingModality;
            hiringProcess.Duration = hiring.Duration;
            hiringProcess.UnitDuration = hiring.UnitDuration;
            hiringProcess.DateReceiptResponses = hiring.DateReceiptResponses;
            hiringProcess.Department = hiring.Department;
            hiringProcess.City = hiring.City;
            hiringProcess.StateProcess = hiring.StateProcess;
            hiringProcess.MainCategoryCode = hiring.MainCategoryCode;
            hiringProcess.TypeContract = hiring.TypeContract;
            hiringProcess.UrlProcess = hiring.UrlProcess.url;
            hiringProcess.IsSecopOne = true;
            hiringProcess.AdditionalCategories = hiring.additionalCategories;
            return hiringProcess;
        }
        public static explicit operator HiringProcess(HiringProcessSecopTwoDto hiring)
        {
            HiringProcess hiringProcess = new();
            hiringProcess.Uid = hiring.Uid;
            hiringProcess.EntityName = hiring.EntityName;
            hiringProcess.ProcessNumber = hiring.ProcessNumber;
            hiringProcess.CertificateNumber = hiring.CertificateNumber;
            hiringProcess.DetailObjectToHired = hiring.DetailObjectToHired;
            hiringProcess.Phase = hiring.Phase;
            hiringProcess.DateLoadSecop = hiring.DateLoadSecop;
            hiringProcess.LastPublicationDate = hiring.LastPublicationDate;
            hiringProcess.BasePrice = hiring.BasePrice;
            hiringProcess.ContractingModality = hiring.ContractingModality;
            hiringProcess.Duration = hiring.Duration;
            hiringProcess.UnitDuration = hiring.UnitDuration;
            hiringProcess.DateReceiptResponses = hiring.DateReceiptResponses;
            hiringProcess.Department = hiring.Department;
            hiringProcess.City = hiring.City;
            hiringProcess.StateProcess = hiring.StateProcess;
            hiringProcess.MainCategoryCode = hiring.MainCategoryCode;
            hiringProcess.TypeContract = hiring.TypeContract;
            hiringProcess.UrlProcess = hiring.UrlProcess.url;
            hiringProcess.IsSecopOne = false;
            hiringProcess.AdditionalCategories = hiring.AdditionalCategories;
            return hiringProcess;
        }
    }
}

using CLN.model.APIModels;
using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.PartialModels
{
    public partial class HiringProcess: CLN.model.Models.HiringProcess
    {
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
            hiringProcess.IsSecopOne = hiring.Phase != null;
            return hiringProcess;
        }
    }
}

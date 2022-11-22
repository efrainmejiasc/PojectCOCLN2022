using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class CompanyInterestDto
    {
        public int IdCompanyInterest { get; set; }
        public int IdCompanyProfile { get; set; }
        public string InterestType { get; set; }
        public bool AllDepartements { get; set; }
        public bool AllMunicipalities { get; set; }
        public bool AllStage { get; set; }
        public string Companies { get; set; }
        public bool AllMode { get; set; }
        public bool AllValues { get; set; }
        public decimal MinimumValues { get; set; }
        public decimal MaximumValues { get; set; }
        public bool IncludeValues { get; set; }
        public bool AllMonths { get; set; }
        public List<CompanyInterestDepartmentDto> Departments { get; set; }
        public List<CompanyInterestMunicipalityDto> Municipalities { get; set; }
        public List<CompanyInterestStageDto> Stages { get; set; }
        public List<CompanyInterestModeDto> Modes { get; set; }
        public List<CompanyInterestClassifierDto> Classifiers { get; set; }
        public List<CompanyInterestMonthDto> Months { get; set; }

    }

    public class CompanyInterestDepartmentDto
    {
        public int IdCompanyInterestDepartment { get; set; }
        public int IdCompanyInterest { get; set; }
        public string DepartmentDaneCode { get; set; }
    }

    public class CompanyInterestMunicipalityDto
    {
        public int IdCompanyInterestMunicipality { get; set; }
        public int IdCompanyInterest { get; set; }
        public string MunicipalityDaneCode { get; set; }
    }

    public class CompanyInterestStageDto
    {
        public int IdCompanyInterestStage { get; set; }
        public int IdCompanyInterest { get; set; }
        public int Stage { get; set; }
    }

    public class CompanyInterestModeDto
    {
        public int IdCompanyInterestMode { get; set; }
        public int IdCompanyInterest { get; set; }
        public int Mode { get; set; }
    }

    public class CompanyInterestClassifierDto
    {
        public int IdCompanyInterestClassifier { get; set; }
        public int IdCompanyInterest { get; set; }
        public int ClassifierCode { get; set; }
        public string ClassifierName { get; set; }
    }

    public class CompanyInterestNotificationDto
    {
        public int IdCompanyInterestNotification { get; set; }
        public int IdCompanyProfile { get; set; }
        public int Notification { get; set; }
        public string NotificationFrequency { get; set; }
    }

    public class CompanyInterestMonthDto
    {
        public int IdCompanyInterestMonth { get; set; }
        public int IdCompanyInterest { get; set; }
        public int Month { get; set; }
    }

    public class CompanyInterestLiteDto
    {
        public int IdCompanyInterest { get; set; }
        public int IdCompanyProfile { get; set; }
        public string InterestType { get; set; }
        public bool AllDepartements { get; set; }
        public bool AllMunicipalities { get; set; }
        public bool AllStage { get; set; }
        public string Companies { get; set; }
        public bool AllMode { get; set; }
        public bool AllValues { get; set; }
        public decimal MinimumValues { get; set; }
        public decimal MaximumValues { get; set; }
        public bool IncludeValues { get; set; }
        public bool AllMonths { get; set; }

        public static explicit operator CompanyInterestLiteDto(CompanyInterestDto ci)
        {
            CompanyInterestLiteDto cil = new();
            cil.IdCompanyInterest = ci.IdCompanyInterest;
            cil.IdCompanyProfile = ci.IdCompanyProfile;
            cil.InterestType = ci.InterestType;
            cil.AllDepartements = ci.AllDepartements;
            cil.AllMunicipalities = ci.AllMunicipalities;
            cil.AllStage = ci.AllStage;
            cil.Companies = ci.Companies;
            cil.AllMode = ci.AllMode;
            cil.AllValues = ci.AllValues;
            cil.MinimumValues = ci.MinimumValues;
            cil.MaximumValues = ci.MaximumValues;
            cil.IncludeValues = ci.IncludeValues;
            cil.AllMonths = ci.AllMonths;
            return cil;
        }
    }
}

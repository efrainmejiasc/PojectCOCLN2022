using CLN.model.CustomMappers;
using CLN.model.Helpers.Attributes;
using CLN.model.Models;
using System;

namespace CLN.model.Dto.CAS
{
    [CustomMap(typeof(CompanyProfileDto), typeof(CasCompanyProfileToCompanyProfileDto))]
    [CustomMap(typeof(CompanyProfile), typeof(CasCompanyProfileToCompanyProfile))]
    public class UserCompanyInformationResponseDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string country { get; set; }
        public string industry { get; set; }
        public string photo_url { get; set; }
        public string verified { get; set; }
        public string type { get; set; }
        public string public_url { get; set; }
        public string is_women_company { get; set; }
        public string bussiness_objetives { get; set; }
        public string bussiness_description { get; set; }
        public string employees_number { get; set; }
        public RatingModel rating { get; set; }
        public string phone_number { get; set; }
        public string address { get; set; }
        public string address_line2 { get; set; }
        public string city { get; set; }
        public string email { get; set; }
        public string website { get; set; }
        public string year_established { get; set; }
        public SocialWebsitesModel[] social_websites { get; set; }
        public string major_customer { get; set; }
        public EmployeesModel[] employees { get; set; }
        public string province_state_department { get; set; }
        public string other_lines_of_business { get; set; }
        public string company_target_countries { get; set; }
        public string company_presence_countries { get; set; }
        public CatalogModel[] catalog { get; set; }
        public string country_id { get; set; }
        public string certifications { get; set; }
        public string affiliations { get; set; }
        public AttachedFilesModel[] attached_files { get; set; }
        public string women_president { get; set; }
        public string women51p { get; set; }
        public string is_orange { get; set; }
        public string is_microbusiness { get; set; }
        public string is_vulnerable { get; set; }
        public string is_victim { get; set; }
        public string victim_code { get; set; }
        public string is_bic { get; set; }
        public string whatsapp { get; set; }
        public string ecommerce { get; set; }
        public string tax_id { get; set; }
        public string company_investments { get; set; }
        public string company_investors { get; set; }
        public string company_export { get; set; }
        public string company_export_target { get; set; }
        public string company_import { get; set; }
        public string company_import_target { get; set; }
        public EmbeddedModel _embedded { get; set; }

        [Serializable]
        public class RatingModel
        {
            public int user_rating { get; set; }
            public float average_rating { get; set; }
            public int votes { get; set; }
        }

        [Serializable]
        public class SocialWebsitesModel
        {
            public string site { get; set; }
            public string url { get; set; }
        }

        [Serializable]
        public class EmployeesModel
        {
            public string uid { get; set; }
            public string hierarchy_level { get; set; }
            public string role { get; set; }
            public string name { get; set; }
            public string last_name { get; set; }
            public ProfileModel profile { get; set; }

        }

        [Serializable]
        public class ProfileModel
        {
            public string picture { get; set; }
        }

        [Serializable]
        public class CatalogModel
        {
            public string industry_id { get; set; }
            public string language { get; set; }
            public string name { get; set; }
            public bool main_industry { get; set; }
            public string display_order { get; set; }
            public ProductsServicesModel[] products_services { get; set; }
        }

        [Serializable]
        public class ProductsServicesModel
        {
            public string id { get; set; }
            public string product_alias_id { get; set; }
            public string product_id { get; set; }
            public string industry_id { get; set; }
            public string product_alias_name { get; set; }
            public string description { get; set; }
            public string display_order { get; set; }
        }

        [Serializable]
        public class AttachedFilesModel
        {
            public string title { get; set; }
            public string file { get; set; }
            public string type { get; set; }
            public string thumbnail { get; set; }
        }

        [Serializable]
        public class EmbeddedModel
        {
            public RatingModel rating { get; set; }
        }

    }
}

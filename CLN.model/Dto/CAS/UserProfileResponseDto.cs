using System;

namespace CLN.model.Dto.CAS
{
    public class UserProfileResponseDto
    {
        public string id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string language { get; set; }
        public string gender { get; set; }
        public string picture { get; set; }
        public string country { get; set; }
        public string country_code { get; set; }
        public string country_name { get; set; }
        public ChargesModel[] charges { get; set; }
        public SocialWebsitesModel[] social_websites { get; set; }
        public string profession { get; set; }
        public string educational_level { get; set; }
        public string more_about { get; set; }
        public string profile_completed { get; set; }
        public bool can_use_private_messages { get; set; }
        public string pm4r_certificated_user { get; set; }
        public string communities { get; set; }
        public string favorite_projects { get; set; }
        public string afdb_additional_info { get; set; }
        public bool enabled_push_notifications { get; set; }
        public bool enabled_push_notifications_bta { get; set; }
        public int bta_emails_frequency { get; set; }
        public bool has_logged_on_ca { get; set; }
        public string is_admin { get; set; }
        public string is_reports_admin { get; set; }
        public string[] likes { get; set; }


        [Serializable]
        public class ChargesModel
        {
            public string nid { get; set; }
            public string isIndependent { get; set; }
            public string role { get; set; }
            public string productsAndServices { get; set; }
            public string industry { get; set; }
            public HierarchyModel hierarchy { get; set; }
            public bool approvalPending { get; set; }
            public bool isOwner { get; set; }
            public string position { get; set; }
            public CompanyModel company { get; set; }
            public bool user_is_admin { get; set; }
        }

        [Serializable]
        public class HierarchyModel
        {
            public string name { get; set; }
            public string tid { get; set; }
        }

        [Serializable]
        public class CompanyModel
        {
            public SelectedModel selected { get; set; }
        }

        [Serializable]
        public class SelectedModel
        {
            public string name { get; set; }
            public int id { get; set; }
            public CountryModel country { get; set; }
            public int peopleCount { get; set; }
            public CountryModel[] presenceCountries { get; set; }
            public CountryModel[] targetCountries { get; set; }
            public IndustriesModel[] industries { get; set; }
            public string picture { get; set; }
            public bool isVerified { get; set; }
            public bool womanOwner { get; set; }
            public string city { get; set; }
        }

        [Serializable]
        public class CountryModel
        {
            public int tid { get; set; }
            public string name { get; set; }
        }

        [Serializable]
        public class IndustriesModel
        {
            public int tid { get; set; }
            public string name { get; set; }
        }

        [Serializable]
        public class SocialWebsitesModel
        {
            public string site { get; set; }
            public string url { get; set; }
        }
    }
}

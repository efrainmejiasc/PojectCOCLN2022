using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels.BO
{
    public class PatagonianBusinessOpportunity
    {
        public Embedded _embedded { get; set; }
        public int total_items { get; set; }
    }

    public class Author
    {
        public string id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public string link { get; set; }
        public bool link_is_external { get; set; }
    }

    public class BusinessOpportunity
    {
        public string id { get; set; }
        public string title { get; set; }
        public string url { get; set; }
        public string description { get; set; }
        public string short_description { get; set; }
        public string country { get; set; }
        public string industry { get; set; }
        public string publish_date { get; set; }
        public string finish_date { get; set; }
        public string contact_name { get; set; }
        public string contact_email { get; set; }
        public object contact_telephone { get; set; }
        public object author_name { get; set; }
        public object author_image { get; set; }
        public object attachments { get; set; }
        public object requirements { get; set; }
        public object idb_project_link { get; set; }
        public object idb_project_name { get; set; }
        public string keywords { get; set; }
        public string countries { get; set; }
        public string country_code { get; set; }
        public string countries_code { get; set; }
        public Author author { get; set; }
        public string country_id { get; set; }
        public string industry_id { get; set; }
        public object external_enabled { get; set; }
        public object external_access_button_text { get; set; }
        public object external_url { get; set; }
        public string form_variant { get; set; }
        public string form_variant_url { get; set; }
        public string created { get; set; }
    }

    public class Embedded
    {
        public List<BusinessOpportunity> business_opportunity { get; set; }
    }
}

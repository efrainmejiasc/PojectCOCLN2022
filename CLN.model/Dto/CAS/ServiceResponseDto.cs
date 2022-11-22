using CLN.model.CustomMappers;
using CLN.model.Helpers.Attributes;
using CLN.model.Models;
using System;
using System.Collections.Generic;

namespace CLN.model.Dto.CAS
{
    public class AddCampaign
    {
        public string title { get; set; }
        public string position { get; set; }
    }

    public class Author
    {
        public string name { get; set; }
        public string image { get; set; }
        public string link { get; set; }
        public bool link_is_external { get; set; }
    }

    public class Embedded<T>
    {
        public List<T> list { get; set; }
    }

    public class ServiceResponseDto
    {
        public Embedded<Service> _embedded { get; set; }
        public int total_items { get; set; }
    }

    public class Service
    {
        public Author author { get; set; }
        public string content_category { get; set; }
        public string industry { get; set; }
        public string image { get; set; }
        public List<AddCampaign> add_campaigns { get; set; }
        public string id { get; set; }
        public string title { get; set; }
        public object provider { get; set; }
        public string country { get; set; }
        public string keywords { get; set; }
        public string additional_info { get; set; }
        public string description { get; set; }
        public string created { get; set; }
    }

}

using CLN.model.CustomMappers;
using CLN.model.Helpers.Attributes;
using CLN.model.Models;
using System;
using System.Collections.Generic;

namespace CLN.model.Dto.CAS
{
    public class Document
    {
        public string label { get; set; }
        public string uri { get; set; }
    }

    public class Event
    {
        public string country_tx { get; set; }
        public string country { get; set; }
        public string link { get; set; }
        public string link_title { get; set; }
        public string benefits { get; set; }
        public string legal_information { get; set; }
        public string industry { get; set; }
        public object schedule { get; set; }
        public string id { get; set; }
        public string title { get; set; }
        public string init_date { get; set; }
        public string end_date { get; set; }
        public string location { get; set; }
        public string description { get; set; }
        public string afiche { get; set; }
        public List<Document> documents { get; set; }
        public List<Speaker> speakers { get; set; }
        public List<Supporter> supporters { get; set; }
        public string created { get; set; }
    }

    public class EventResponseDto
    {
        public Embedded<Event> _embedded { get; set; }
        public int total_items { get; set; }
    }

    public class Self
    {
        public string href { get; set; }
    }

    public class Speaker
    {
        public string name { get; set; }
        public string photo { get; set; }
        public string position { get; set; }
    }

    public class Supporter
    {
        public string tooltip { get; set; }
        public string logo { get; set; }
        public string website { get; set; }
    }


}

using CLN.model.CustomMappers;
using CLN.model.Helpers.Attributes;
using CLN.model.Models;
using System;
using System.Collections.Generic;

namespace CLN.model.Dto.CAS
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Community
    {
        public object user_relationship_status { get; set; }
        public object is_private { get; set; }
        public object user_is_member { get; set; }
        public string members_number { get; set; }
        public string photo_url { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string category { get; set; }
    }

    public class CommunityResponseDto
    {
        public Embedded<Community> _embedded { get; set; }
        public int total_items { get; set; }
    }
}

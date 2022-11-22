using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels.UIC
{
    public class PatagonianUserCommunity
    {
        public Embedded _embedded { get; set; }
        public int total_items { get; set; }
    }
    public class Community
    {
        public string id { get; set; }
        public string name { get; set; }
        public bool user_is_member { get; set; }
        public object user_relationship_status { get; set; }
        public bool is_private { get; set; }
        public string category { get; set; }
        public string about { get; set; }
        public string photo_url { get; set; }
        public int members_number { get; set; }
        public string keywords { get; set; }
    }

    public class Embedded
    {
        public List<Community> community { get; set; }
    }
}

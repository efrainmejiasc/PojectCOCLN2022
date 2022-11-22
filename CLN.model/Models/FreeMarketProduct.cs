using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class FreeMarketProduct
    {
        public string Keywords { get; set; }
        public Paging Paging { get; set; }
        public List<Result> Results { get; set; }
    }

    public class Paging
    {
        public int Total { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
    }

    public class Setting
    {
        public string Listing_Strategy { get; set; }
    }

    public class Attributes
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Value_Id { get; set; }
        public string vValue_Name { get; set; }
    }

    public class Picture
    {
        public string Id { get; set; }
        public string Url { get; set; }
    }

    public class Result
    {
        public string Id { get; set; }
        public string Status { get; set; }
        public string Domain_Id { get; set; }
        public Setting Settings { get; set; }
        public string Name { get; set; }
        public List<object> Main_Features { get; set; }
        public List<Attributes> Attributes { get; set; }
        public List<Picture> Pictures { get; set; }
        public string Parent_Id { get; set; }
        public List<object> Children_Ids { get; set; }
    }

}

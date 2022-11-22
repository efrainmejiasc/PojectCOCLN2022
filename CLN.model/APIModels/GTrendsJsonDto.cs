using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public  class GTrendsJsonDto
    {
        public string moreTrendsUrl { get; set; }
        public string type { get; set; }
        public int category { get; set; }
        public string property { get; set; }
        public string exploreQuery { get; set; }
        public string guestPath { get; set; }
        public List<ComparisonItem> comparisonItem { get; set; }
    }
    public class ComparisonItem
    {
        public string keyword { get; set; }
        public string geo { get; set; }
        public string time { get; set; }
    }
}

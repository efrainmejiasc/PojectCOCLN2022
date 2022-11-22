using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public  class GSocialFeatures
    {
        public Propertys Youtube { get; set; }
        public Propertys Flickr { get; set; }
        public Propertys Instagram { get; set; }
        public Propertys Facebook { get; set; }
        public Propertys Twitter { get; set; }
    }

    public class Propertys
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public string Url { get; set; }
    }
}

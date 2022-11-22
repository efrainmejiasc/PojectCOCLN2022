using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class HomeComponentDto
    {
        public int? id { get; set; }
        public string name { get; set; }
        public int idTemplate { get; set; }
        public int idState { get; set; }
        public string state { get; set; }
        public IEnumerable<AttributeDto> attributes { get; set; }
    }

    public class AttributeDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string value { get; set; }
    }
}

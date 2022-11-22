using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class UpdateComponentResponse
    {
        public int id { get; set; }
        public string homeComponent { get; set; }
        public string upgrade { get; set; }
        public string changeState { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class PermitDto
    {
        public string name { get; set; }
        public int index { get; set; }
    }

    public class UsersMenuDto
    {
        public int idMenu { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public string logo { get; set; }
        public object tooltip { get; set; }
        public object orden { get; set; }
        public object songs { get; set; }
        public List<PermitDto> permits { get; set; }
    }
}

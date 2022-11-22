using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class TerritorialEntityDto
    {
        public string DaneCode { get; set; }
        public string TerritorialEntity { get; set; }
        public IEnumerable<TerritorialEntityDto> Municipalities { get; set; }
    }
}

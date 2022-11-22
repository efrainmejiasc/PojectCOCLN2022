using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class CompanyFiltered
    {
        public string entityName { get; set; }
        public string processNumber { get; set; }
        public string detailObjectToHired { get; set; }
        public string dateLoadSecop { get; set; }
        public string basePrice { get; set; }
        public string TerritorialEntity { get; set; }
        public string contractingModality { get; set; }

    }
}

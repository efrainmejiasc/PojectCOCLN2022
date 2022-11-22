using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class CompanyOffersByFilter
    {
        public string entity { get; set; }

        public string dept { get; set; }

        public string munic { get; set; }

        public string processNumber { get; set; }
        public string dateInicial { get; set; }

        public string dateFin { get; set; }

        public string minValue { get; set; }

        public string maxValue { get; set; }

        public string objContratar { get; set; }

        public string modality { get; set; }
        public string company { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class AcquisitionPlansByFilter
    {
        /// <summary>
        /// Codigo(s) UNSPSC. Si es mas de 1 deben enviarse separados por , (coma)
        /// </summary>
        public string UNSPSCCodes { get; set; }

        /// <summary>
        /// Modalidad(es). Si es mas de 1 deben enviarse separados por , (coma)
        /// </summary>
        public string modality { get; set; }

        /// <summary>
        /// Valor minimo
        /// </summary>
        public string minValue { get; set; }

        /// <summary>
        /// Valor maximo
        /// </summary>
        public string maxValue { get; set; }

        /// <summary>
        /// Fecha inicial
        /// </summary>
        public string dateInicial { get; set; }

        /// <summary>
        /// Entidad. Iniciales o nombre completo de la entidad
        /// </summary>
        public string entity { get; set; }

        /// <summary>
        /// Departamento
        /// </summary>
        public string dept { get; set; }

        /// <summary>
        /// Municipio
        /// </summary>
        public string munic { get; set; }
    }
}

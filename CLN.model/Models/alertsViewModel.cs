using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class alertsViewModel
    {
        public string fechaInicio { get; set; }
        public string fechaCierre { get; set; }
        public string proyecto { get; set; }
        public string ofertaDeVenta { get; set; }
        public string tituloServicio { get; set; }
        public string Url { get; set; }
        public decimal idAlerta { get; set; }
        public string tipoNotificacion { get; set; }
        public int tipoPlantilla { get; set; }
        public bool SMS { get; set; }
        //public decimal idCompany { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLN.model.Models
{
    public class MailOffersViewModel
    {
        public string Entidad { get; set; }
        public string ObjContratar { get; set; }
        public string Valor { get; set; }
        public string Url { get; set; }
        public string Email { get; set; }
        public string Frecuencia { get; set; }
        public string Notificacion { get; set; }
        public string Modalidad { get; set; }
        public string Fecha { get; set; }
        public int IdProceso { get; set; }
        public int IdCompany { get; set; }
        public int Tipo { get; set; }
        public int TotalOfertas { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace CLN.model.Models
{
    public partial class MailMensual
    {
        public string Entidad { get; set; }
        public string ObjetoAContratar { get; set; }
        public string Valor { get; set; }
        public DateTime? FechaPublicacion { get; set; }
        public string Url { get; set; }
        public string Email { get; set; }
        public string Modalidad { get; set; }
        public string Frecuencia { get; set; }
        public string Notificacion { get; set; }
        public int IdProceso { get; set; }
        public int IdCompany { get; set; }
        public int Tipo { get; set; }
    }
}

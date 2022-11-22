using Microsoft.AspNetCore.Http;

namespace CLN.model.APIModels
{
    public class AlertDto
    {
        public int idAlert { get; set; }
        public string nombre { get; set; }
        public string tipoNotificacion { get; set; }
        public int tipoPlantilla { get; set; }
        public bool isActive { get; set; }
        public string frecuencia { get; set; }
        public bool sendAll { get; set; }
        public bool sendPimes { get; set; }
        public string tipoPersona { get; set; }
        public string sectores { get; set; }
        public string characterization { get; set; }
        public string infoComercial { get; set; }
        public string desde { get; set; }
        public string hasta { get; set; }
        public string dias { get; set; }
        public string fechaUltimoEnvio { get; set; }
        public string hora { get; set; }
        public bool sms { get; set; }
        public string image { get; set; }
        public string enlace { get; set; }
        public string primerTexto { get; set; }
        public string segundoTexto { get; set; }
        public string tercerTexto { get; set; }
        public bool sended { get; set; }
        public int idUsuario { get; set; }
    }
}
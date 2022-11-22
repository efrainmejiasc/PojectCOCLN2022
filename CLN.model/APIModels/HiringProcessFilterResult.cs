using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class HiringProcessFilterResult
    {
        public string IdHiringProcess { get; set; }
        public string EntityName { get; set; }
        public string ProcessNumber { get; set; }
        public string ProcessObject { get; set; }
        public string DateLoad { get; set; }
        public string BasePrice { get; set; }
        public string ProcessMode { get; set; }
        public string ProcessLocation { get; set; }
    }

    public class HiringProcessFilterResultDetail
    {
        [JsonPropertyName("N°")]
        public int Row { get; set; }
        public string IdHiringProcess { get; set; }
        [JsonPropertyName("Entidad")]
        public string EntityName { get; set; }
        [JsonPropertyName("Número de Proceso")]
        public string ProcessNumber { get; set; }
        [JsonPropertyName("Objeto del proceso")]
        public string ProcessObject { get; set; }
        [JsonPropertyName("Fase/Estado")]
        public string ProcessStage { get; set; }
        [JsonPropertyName("Fecha de publicación del proceso")]
        public string DateLoad { get; set; }
        public string LastDateLoad { get; set; }
        
        [JsonPropertyName("Cuantía del proceso")]
        public string BasePrice { get; set; }
        [JsonPropertyName("Modalidad de contratación")]
        public string ProcessMode { get; set; }
        [JsonPropertyName("Duración")]
        public string ProcessDuration { get; set; }
        [JsonPropertyName("Fecha de recepción de respuestas")]
        public string ApplicationsDeadline { get; set; }//
        [JsonPropertyName("Ciudad unidad de contratación")]
        public string ProcessLocation { get; set; }
        [JsonPropertyName("Producto o servicio asociado")]
        public string ProcessMainCategory { get; set; }//
        [JsonPropertyName("Producto o servicio adicional asociado")]
        public string ProcessAdditionalCategory { get; set; }// 
        [JsonPropertyName("Tipo de contrato")]
        public string ProcessContractType { get; set; }//     
        [JsonPropertyName("URL proceso")]
        public string ProcessUrl { get; set; }//

    }
}

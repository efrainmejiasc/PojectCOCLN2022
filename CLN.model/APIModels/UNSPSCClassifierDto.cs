using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class UNSPSCClassifierDto
    {
        [JsonPropertyName("Generación de valor")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string ValueGeneration { get; set; }

        [JsonPropertyName("Código Segmento")]
        [Required(ErrorMessage = "Campo vacío.")]
        [RegularExpression("^([0-9]{2})$", ErrorMessage = "Campo Código Segmento invalido. El campo exige dos caracteres numéricos obligatoriamente.")]
        public string SegmentCode { get; set; }

        [JsonPropertyName("Nombre Segmento")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string SegmentName { get; set; }

        [JsonPropertyName("Código Familia")]
        [Required(ErrorMessage = "Campo vacío.")]
        [RegularExpression("^([0-9]{4})$", ErrorMessage = "Campo Código Familia invalido. El campo exige cuatro caracteres numéricos obligatoriamente.")]
        public string FamilyCode { get; set; }

        [JsonPropertyName("Nombre Familia")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string FamilyName { get; set; }

        [JsonPropertyName("Código Clase")]
        [Required(ErrorMessage = "Campo vacío.")]
        [RegularExpression("^([0-9]{6})$", ErrorMessage = "Campo Código Clase invalido. El campo exige seis caracteres numéricos obligatoriamente.")]
        public string ClassCode { get; set; }

        [JsonPropertyName("Nombre Clase")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string ClassName { get; set; }

        [JsonPropertyName("Código Producto")]
        [Required(ErrorMessage = "Campo vacío.")]
        [RegularExpression("^([0-9]{8})$", ErrorMessage = "Campo Código Producto invalido. El campo exige ocho caracteres numéricos obligatoriamente.")]
        public string ProductCode { get; set; }

        [JsonPropertyName("Nombre Producto")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string ProductName { get; set; }

        [JsonPropertyName("Reporte de errores")]
        public string ErrorReport { get; set; }
    }
}

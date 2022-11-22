using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class CPCIIUUNSPSCCLNCorrelativeDto
    {
        [JsonPropertyName("Sector")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string CPSector { get; set; }

        [JsonPropertyName("Subsector")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string CPSubsector { get; set; }

        [JsonPropertyName("Política de Desarrollo Productivo (PDP)")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string PDP { get; set; }

        [JsonPropertyName("Colombia Productiva")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string CP { get; set; }

        [JsonPropertyName("CIIU")]
        [Required(ErrorMessage = "Campo vacío.")]
        [RegularExpression("^([0-9]{4})$", ErrorMessage = "Campo CIIU invalido. El campo exige cuatro caracteres numéricos obligatoriamente.")]
        public string CIIUCode { get; set; }

        [JsonPropertyName("Descripción CIIU")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string CIIUDescription { get; set; }

        [JsonPropertyName("Código Producto UNSPSC")]
        [Required(ErrorMessage = "Campo vacío.")]
        [RegularExpression("^([0-9]{8})$", ErrorMessage = "Campo Código Producto UNSPSC invalido. El campo exige ocho  caracteres numéricos obligatoriamente.")]
        public string UNSPSCProductCode { get; set; }

        [JsonPropertyName("Nombre Producto UNSPSC")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string UNSPSCProductName { get; set; }

        [JsonPropertyName("ID Sector (Industria) Compra Lo Nuestro")]
        [Required(ErrorMessage = "Campo vacío.")]
        [RegularExpression("^([0-9]{4})$", ErrorMessage = "Campo Código Clase invalido. El campo exige cuatro caracteres numéricos obligatoriamente.")]
        public string CLNSector { get; set; }

        [JsonPropertyName("Sector (Industria) Compra Lo Nuestro EN")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string CLNSectorEN { get; set; }

        [JsonPropertyName("Sector (Industria) Compra Lo Nuestro ES")]
        [Required(ErrorMessage = "Campo vacío.")]
        public string CLNSectorES { get; set; }

        [JsonPropertyName("Reporte de errores")]
        public string ErrorReport { get; set; }
    }
}

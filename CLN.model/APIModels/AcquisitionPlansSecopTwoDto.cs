using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace CLN.model.APIModels
{
    public class AcquisitionPlansSecopTwoDto
    {
        //campos tomados del Encabezado:
        [JsonPropertyName("identificador_unico_paa")]
        public string IdPaa { get; set; }//Identificador Unico PAA

        [JsonPropertyName("nombre_entidad")]
        public string EntityName { get; set; } //Nombre de la Entidad

        [JsonPropertyName("anno")]
        public string Year { get; set; } //Año

        [JsonPropertyName("fecha_creacion")]
        public string CreatedDate { get; set; }//Fecha de creación

        [JsonPropertyName("fecha_modificacion")]
        public string LastEditDate { get; set; }//Fecha de modificación

        [JsonPropertyName("ubicaci_n")]
        public string Location { get; set; }//Ubicación

        private string _Department;
        public string Department {
            get
            {
                _Department = (!string.IsNullOrEmpty(Location) && Location.Contains(",")) ? Location.Split(",")[0].Trim(): null;
                return _Department;
            }
        }//Departmento PAA

        private string _City;
        public string City { 
            get
            {
                _City = (!string.IsNullOrEmpty(Location) && Location.Contains(",")) ? Location.Split(",")[1].Trim(): null;
                return _City;
            }
        }//Municipio PAA

        public string ContactInfo { get; set; }//No existe en secop II

        public string ContactEmail { get; set; }//No existe en secop II

        public string ContactPhone { get; set; }//No existe en secop II

        //campos tomados del Detalle:
        [JsonPropertyName("descripci_n_proceso")]
        public string Description { get; set; }//Descripción

        [JsonPropertyName("valor_estimado_vig_actual")]
        public string AcquisitionValue { get; set; }//Valor adquisición

        [JsonPropertyName("categor_as")]
        public string CategoriesCodes { get; set; }//Código UNSPSC; conjunto de códigos de naciones unidas por cada adquisición de cada plan.

        [JsonPropertyName("fecha_esperada_de_inicio")]
        public string InitDate { get; set; }//Fecha inicio

        [JsonPropertyName("modalidad")]
        public string Modality { get; set; }//Modalidad

        [JsonPropertyName("duraci_n_esperada")]
        public string ExpectedDuration { get; set; }

        [JsonPropertyName("unidad_duraci_n_esperada")]
        public string ExpectedUnitDuration { get; set; }
        
        private string _Duration;
        public string Duration { 
            get
            {
                _Duration = String.Format("{0} {1}", ExpectedDuration, ExpectedUnitDuration).Trim();
                return _Duration;
            }
         }//Duracion estimada

        [JsonPropertyName("identificador_detalle_paa")]
        public string Uid { get; set; }//Identificador Único Detalle

        public bool? IsSecopOne { get; set; }//Identificador de que ambiente viene el proceso
    }
}

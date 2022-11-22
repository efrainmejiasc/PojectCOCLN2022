using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class AcquisitionPlansSecopOneDto
    {
        //campos tomados del Encabezado:
        [JsonPropertyName("identificador_paa")]
        public string IdPaa { get; set; }//Identificador Unico PAA

        [JsonPropertyName("nombre_entidad")]
        public string EntityName { get; set; }//Entidad

        [JsonPropertyName("anno_paa")]
        public string Year { get; set; }//Año

        [JsonPropertyName("fecha_cargue")]
        public string CreatedDate { get; set; }//Fecha de creación

        [JsonPropertyName("fecha_ultima_actualizacion")]
        public string LastEditDate { get; set; }//Fecha de modificación

        [JsonPropertyName("departamento_paa")]
        public string Department { get; set; }//Departmento PAA

        [JsonPropertyName("municipio_paa")]
        public string City { get; set; }//Municipio PAA

        [JsonPropertyName("info_contacto")]
        public string ContactInfo { get; set; }//Nombre contacto

        public string ContactEmail { get; set; }//No existe en secop I

        [JsonPropertyName("telefono_entidad")]
        public string ContactPhone { get; set; }//Teléfono contacto

        //campos tomados del Detalle:
        [JsonPropertyName("descripcio_item")]
        public string Description { get; set; }//Descripción

        [JsonPropertyName("valor_vigencia_actual")]
        public string AcquisitionValue { get; set; }//Valor adquisición

        [JsonPropertyName("codigo_unspsc")]
        public string CategoriesCodes { get; set; }//Código UNSPSC; se debe traer el conjunto de códigos de naciones unidas de cada adquisición.

        [JsonPropertyName("fecha_inicio")]
        public string InitDate { get; set; }//Fecha inicio Proceso de Contratación

        [JsonPropertyName("modalidad")]
        public string Modality { get; set; }//Modalidad

        [JsonPropertyName("duracion_estimada")]
        public string Duration { get; set; }//Duracion estimada

        [JsonPropertyName("id")]
        public string Uid { get; set; }//identificador_unico_paa

        private string _Location;
        public string Location
        {
            get
            {
                _Location = String.Format("{0}, {1}", Department, City);
                return _Location;
            }
        }//Ubicación: concatenar los campos Municipio PAA y Departamento PAA

        public bool? IsSecopOne { get; set; }//Identificador de que ambiente viene el proceso
    }
}

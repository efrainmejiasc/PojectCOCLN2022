using System;
using Newtonsoft.Json;

namespace CLN.model.APIModels
{
    public class HiringProcessSecopTwoDto
    {
        //public int IdHiringProcess { get; set; }
        [JsonProperty("entidad")]
        public string EntityName { get; set; } //Nombre de la Entidad que publica el proceso de compra pública 
        [JsonProperty("referencia_del_proceso")]
        public string ProcessNumber { get; set; } //Identificador del Proceso, valor generado por la Entidad
        [JsonProperty("id_del_portafolio")]
        public string CertificateNumber { get; set; } //Identificador del Portafolio al cual corresponde el proceso de compra
        [JsonProperty("descripci_n_del_procedimiento")]
        public string DetailObjectToHired { get; set; }//Primera definición de las características principales del proceso 
        [JsonProperty("fase")]
        public string Phase { get; set; }//Fase en la que actualmente se encuentra el proceso 
        [JsonProperty("fecha_de_publicacion_del")]
        public DateTime? DateLoadSecop { get; set; } //Fecha de la publicación inicial del proceso de compra 
        [JsonProperty("fecha_de_ultima_publicaci")]
        public DateTime? LastPublicationDate { get; set; }//Fecha de la última publicación hecha para el proceso de compra 
        [JsonProperty("precio_base")]
        public string BasePrice { get; set; }//Precio Base, proyectado, del proceso de Compra 
        [JsonProperty("modalidad_de_contratacion")]
        public string ContractingModality { get; set; }//Modalidad de selección bajo la cual se desarrolla el proceso de Compra 
        [JsonProperty("duracion")]
        public string Duration { get; set; }//Valor de la Duración estimada del proceso de compra pública 
        [JsonProperty("unidad_de_duracion")]
        public string UnitDuration { get; set; }//Unidad que aplica a la Duración estimada del proceso de compra pública 
        [JsonProperty("fecha_de_recepcion_de")]
        public DateTime? DateReceiptResponses { get; set; }//Fecha de Recepcion de Respuestas
        [JsonProperty("ciudad_entidad")]
        public string City { get; set; }//Ciudad en la cual está registrada la entidad
        [JsonProperty("departamento_entidad")]
        public string Department { get; set; }//Departamento en el cual está registrada la entidad 
        [JsonProperty("estado_del_procedimiento")]
        public string StateProcess { get; set; }//Estado actual de desarrollo del procedimiento de compra pública 
        //[JsonProperty("codigo_principal_de_categoria")]
        //public string MainCategoryCode { get; set; }
        private string _MainCategoryCode;

        [JsonProperty("codigo_principal_de_categoria")]
        public string MainCategoryCode //Codigo UNSPSC de la categoría principal del producto o servicio adquirido en proceso de compra
        {
            get
            {
                return _MainCategoryCode;
            }

            set
            {
                _MainCategoryCode = value.Replace("V1.", "").Replace("V1", "");
            }
        }

        [JsonProperty("tipo_de_contrato")]
        public string TypeContract { get; set; }//Tipo de Contrato definido para el proceso de compra 
        [JsonProperty("urlproceso")]
        public Route_process UrlProcess { get; set; }//URL, en la plataforma, en la que se puede consultar el proceso de compra 
        //[JsonProperty("categorias_adicionales")]
        //public string additionalCategories { get; set; }// 
        private string _additionalCategories;

        [JsonProperty("categorias_adicionales")]
        public string AdditionalCategories //Identificador de las categorías UNSPSC adicionales, incluidas en el producto o servicio adquirido en proceso de compra
        {
            get
            {
                return _additionalCategories;
            }

            set
            {
                _additionalCategories = value.Replace("V1.", "").Replace("V1", "");
            }
        }
        [JsonProperty("id_del_proceso")]
        public string Uid { get; set; }//Identificador Único del Proceso, valor generado por la plataforma 

        public bool? IsSecopOne { get; set; }//Identificador de que ambiente viene el proceso
        public class Route_process
        {
            public string url { get; set; }
        }
    }
}

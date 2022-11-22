using Newtonsoft.Json;
using System;

namespace CLN.model.APIModels
{
    public class HiringProcessSecopOneDto
    {
        //public int IdHiringProcess { get; set; }
        [JsonProperty("nombre_de_la_entidad")]
        public string EntityName { get; set; }//Nombre de la Entidad del estado a la que corresponde el proceso 
        [JsonProperty("numero_de_proceso")]
        public string ProcessNumber { get; set; }//Identificador del proceso, de acuerdo a la nomenclatura de la entidad 
        [JsonProperty("numero_de_constancia")]
        public string CertificateNumber { get; set; }//Identificador del proceso de compra, generado por SECOP I 
        [JsonProperty("detalle_del_objeto_a_contratar")]
        public string DetailObjectToHired { get; set; }//Adicional al código que define el objeto del contrato, se registra un detalle de la definición del bien o servicio que se adquirirá dentro del proceso
        public string Phase { get; set; }//No existe en secop I
        [JsonProperty("fecha_de_cargue_en_el_secop")]
        public DateTime? DateLoadSecop { get; set; }//Fecha en la que se hizo el registro en la plataforma 
        public DateTime? LastPublicationDate { get; set; }//No existe en secop I?
        [JsonProperty("cuantia_proceso")]
        public string BasePrice { get; set; }//Valor por el cual se lanza el proceso de compra 
        [JsonProperty("tipo_de_proceso")]
        public string ContractingModality { get; set; }//El ID y Tipo de Proceso describen la modalidad a través de la cual se desarrolló el proceso de compra 
        [JsonProperty("plazo_de_ejec_del_contrato")]
        public string Duration { get; set; }//Valor y unidad en la que se mide el tiempo de ejecución del contrato, sean días o meses 
        //[JsonProperty("rango_de_ejec_del_contrato")]
        //public string UnitDuration { get; set ; }
        private string _UnitDuration;

        [JsonProperty("rango_de_ejec_del_contrato")]
        public string UnitDuration //Valor y unidad en la que se mide el tiempo de ejecución del contrato, sean días o meses 
        {
            get
            {
                return _UnitDuration;
            }

            set
            {
                if (value.Equals("D"))
                {
                    _UnitDuration = "Dias";
                }
                else
                if (value.Equals("M"))
                {
                    _UnitDuration = "Meses";
                }
                else
                if (value.Equals("N"))
                {
                    _UnitDuration = "ND";
                }
                else
                {
                    _UnitDuration = value;
                }
            }
        }

        public DateTime? DateReceiptResponses { get; set; }//No existe en secop I
        [JsonProperty("municipio_entidad")]
        public string City { get; set; }//Municipio en el que se encuentra registrada la entidad estatal compradora 
        [JsonProperty("departamento_entidad")]
        public string Department { get; set; }//Departamento en el que se encuentra registrada la entidad estatal compradora 
        [JsonProperty("estado_del_proceso")]
        public string StateProcess { get; set; }//El Estado del proceso a la fecha de publicación 
        [JsonProperty("id_clase")]
        public string MainCategoryCode { get; set; }//Tercer nivel de detalle dentro de la caracterización del bien o servicio 
        [JsonProperty("tipo_de_contrato")]
        public string TypeContract { get; set; }//Tipo de Contrato que se realizará, ejemplos: Fiducia, Obra, entre otros. 
        [JsonProperty("ruta_proceso_en_secop_i")]
        public Route_process UrlProcess { get; set; }//Ruta del proceso de compra en SECOP, para hacer consulta de la información detallada 
        public string additionalCategories { get; set; }//No existe en secop I
        [JsonProperty("uid")]
        public string Uid { get; set; }//Valor compuesto para identificar de manera individual cada registro 

        public bool? IsSecopOne { get; set; }//Identificador de que ambiente viene el proceso

        public class Route_process
        {
            public string url { get; set; }
        }
    }
}

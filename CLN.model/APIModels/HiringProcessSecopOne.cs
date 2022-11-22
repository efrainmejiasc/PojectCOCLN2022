using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CLN.model.APIModels
{
    public class HiringProcessSecopOne
    {
        
        public string uid { get; set; }
        public string anno_cargue_secop { get; set; }
        public string anno_firma_del_contrato { get; set; }
        public string nivel_entidad { get; set; }
        public string orden_entidad { get; set; }
        public string nombre_de_la_entidad { get; set; }
        public string nit_de_la_entidad { get; set; }
        public string c_digo_de_la_entidad { get; set; }
        public string id_tipo_de_proceso { get; set; }
        public string tipo_de_proceso { get; set; }
        public string estado_del_proceso { get; set; }
        public string causal_de_otras_formas_de { get; set; }
        public string id_regimen_de_contratacion { get; set; }
        public string regimen_de_contratacion { get; set; }
        public string id_objeto_a_contratar { get; set; }
        public string objeto_a_contratar { get; set; }
        public string detalle_del_objeto_a_contratar { get; set; }
        public string tipo_de_contrato { get; set; }
        public string municipio_obtencion { get; set; }
        public string municipio_entrega { get; set; }
        public string municipios_ejecucion { get; set; }
        public string fecha_de_cargue_en_el_secop { get; set; }
        public string numero_de_constancia { get; set; }
        public string numero_de_proceso { get; set; }
        public string numero_del_contrato { get; set; }
        public string cuantia_proceso { get; set; }
        public string id_grupo { get; set; }
        public string nombre_grupo { get; set; }
        public string id_familia { get; set; }
        public string nombre_familia { get; set; }
        public string id_clase { get; set; }
        public string nombre_clase { get; set; }
        public string id_ajudicacion { get; set; }
        public string tipo_identifi_del_contratista { get; set; }
        public string identificacion_del_contratista { get; set; }
        public string nom_raz_social_contratista { get; set; }
        public string dpto_y_muni_contratista { get; set; }
        public string tipo_doc_representante_legal { get; set; }
        public string identific_del_represen_legal { get; set; }
        public string nombre_del_represen_legal { get; set; }
        public string fecha_de_firma_del_contrato { get; set; }
        public string fecha_ini_ejec_contrato { get; set; }
        public string plazo_de_ejec_del_contrato { get; set; }
        public string rango_de_ejec_del_contrato { get; set; }
        public string tiempo_adiciones_en_dias { get; set; }
        public string tiempo_adiciones_en_meses { get; set; }
        public string fecha_fin_ejec_contrato { get; set; }
        public string compromiso_presupuestal { get; set; }
        public string cuantia_contrato { get; set; }
        public string valor_total_de_adiciones { get; set; }
        public string valor_contrato_con_adiciones { get; set; }
        public string objeto_del_contrato_a_la { get; set; }
        public string id_origen_de_los_recursos { get; set; }
        public string origen_de_los_recursos { get; set; }
        public string codigo_bpin { get; set; }
        public string proponentes_seleccionados { get; set; }
        public string calificacion_definitiva { get; set; }
        public string id_sub_unidad_ejecutora { get; set; }
        public string nombre_sub_unidad_ejecutora { get; set; }
        public Ruta_Proceso_En_Secop_I ruta_proceso_en_secop_i { get; set; }
        public string moneda { get; set; }
        public string espostconflicto { get; set; }
        public string marcacion_adiciones { get; set; }
        public string posicion_rubro { get; set; }
        public string nombre_rubro { get; set; }
        public string valor_rubro { get; set; }
        public string sexo_replegal_entidad { get; set; }
        public string pilar_acuerdo_paz { get; set; }
        public string punto_acuerdo_paz { get; set; }
        public string municipio_entidad { get; set; }
        public string departamento_entidad { get; set; }
        public string ultima_actualizacion { get; set; }
    }

    public class Ruta_Proceso_En_Secop_I
    {
        public string url { get; set; }
    }
}

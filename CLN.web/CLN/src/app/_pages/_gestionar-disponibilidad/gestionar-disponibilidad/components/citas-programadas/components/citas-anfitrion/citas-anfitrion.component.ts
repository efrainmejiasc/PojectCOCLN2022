import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdministrarFormularioService } from 'src/app/_services/_administrar-formulario/administrar-formulario.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionarInvitacionCitasService } from 'src/app/_services/_gestionar-invitacion-cita/gestionar-invitacion-citas.service';

// export interface ConclusionsForm {
//   id: number;
//   isToShow: boolean;
//   name: string;
//   questionType: QuestionType;
//   answersOptions: AnswersOption[];
//   isRequiredDiligence: boolean;
//   condition: Condition;
// }

// export interface AnswersOption {
//   id: number;
//   name: string;
// }

// export interface Condition {
//   isCondition: boolean;
//   conditionQuestion: number;
//   conditionResponseOption: number;
// }

// export interface QuestionType {
//   id: number;
//   name: string;
// }

export interface ManageConclusionsForm {
  id: number;
  idUser: number;
  firstName: string;
  firstSurName: string;
  email: string;
  idState: number;
  propertysCitationFindingsForm: ConclusionsForm[];
}

export interface ConclusionsForm {
  id: number;
  idState: number;
  isToShow: boolean;
  name: string;
  questionType: QuestionType;
  answersOptions: AnswersOption[];
  isRequiredDiligence: boolean;
  condition: Condition;
  selected?: boolean;
}

export interface AnswersOption {
  id: number;
  name: string;
  questionNumber: number;
  position: number;
  selected: boolean;
}

export interface QuestionType {
  id: number;
  name: string;
  position: number;
}

export interface Condition {
  isConditionQuestion: boolean;
  isConditionAnswer: boolean;
  idConditionQuestion: number;
  idConditionAnswer: number;
}

export interface IdName {
  id: number;
  name: string;
}

@Component({
  selector: 'app-citas-anfitrion',
  templateUrl: './citas-anfitrion.component.html',
  styleUrls: ['./citas-anfitrion.component.scss']
})
export class CitasAnfitrionComponent implements OnInit {

  @Input() nitEmpresa: number = 0;
  @Input() nameEmpresa: string = "";

  linkTo = "/reschedule-appointments-host";
  // citas: any[]=[];
  citas: Observable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  showAlerta = false;
  showConfirmAlerta = false;
  notificationMessage = '';
  notificationConfirmMessage = '';
  alertaSeleccionada: any;
  opcion = '';

  isPopupCambios: boolean = false;
  mensajePopupCambios: string = "";
  ejecutar: any;

  isPopupConfirmacion: boolean = false;
  mensajePopupConfirmacion: string = "";

  formulariosConclusiones: ConclusionsForm[] = [];
   

  respuestas: any[] = [];

  citaSeleccionada: any;

  estados = [
    { 
      stateId: 1, 
      name: 'Activa'
    },
    { 
      stateId: 2, 
      name: 'Inactiva'
    },
    { 
      stateId: 3, 
      name: 'Eliminada'
    },
    { 
      stateId: 4, 
      name: 'Publicada'
    },
    { 
      stateId: 5, 
      name: 'Programada'
    },
    { 
      stateId: 6, 
      name: 'Confirmada'
    },
    { 
      stateId: 7, 
      name: 'Reprogramada por Anfitrión'
    },
    { 
      stateId: 8, 
      name: 'Reprogramada por Invitado'
    },
    { 
      stateId: 9, 
      name: 'Cancelada'
    },
    { 
      stateId: 10, 
      name: 'Rechazada'
    },
    { 
      stateId: 11, 
      name: 'Realizada'
    },
    { 
      stateId: 12, 
      name: 'Sin conclusiones registradas'
    },
    { 
      stateId: 13, 
      name: 'Conclusiones registradas'
    },
  ];

  isRechazarCancelar = false;
  mensajeRechazarCancelar = {
    title: '',
    body: ''
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private layoutService: LayoutService,
    private _gestionarInvitacionCitas: GestionarInvitacionCitasService,
    private router: Router,
    private dialog: MatDialog,
    private _administrarFormularioService: AdministrarFormularioService) {

  }

  ngOnInit() {
    this.consultarCitas();
    this.agregarAtributoBoleanoRespuestas();
    this.obtenerFormularioPublicado();
    this.listadoMotivosCancelacion();
  }

  motivoCancelacionCita = ''
  motivosCancelacionCita = []
  listadoMotivosCancelacion(){

    this._gestionarInvitacionCitas.motivosCancelacion().subscribe(
      ({ data }) => {
        this.motivosCancelacionCita = data;
        
      }
    );
    (error: any) => {
      this.layoutService.closeLoading();
    };

  }

  consolidado: any = []

  openPopupRechazarCancelar(item: any, templateRef: any){

    if(item.idState === 9) {
      this.mensajeRechazarCancelar.title = `¿Cuál es el motivo de la cancelación de la cita?`;
      this.mensajeRechazarCancelar.body = item.cancellationReason
    }
    else if(item.idState === 10) {
      this.mensajeRechazarCancelar.title = `¿Cuál es el motivo del rechazo de la cita?`;
      this.mensajeRechazarCancelar.body = item.rejectionReason
    }

    this.dialog.open(templateRef, {
      width: '800px',
    });
    
  }

  itemActual: any;

  verRespuestas(item: any, templateRef: any){
    this.itemActual = item;
    
    this.dialog.open(templateRef, {
      width: '800px',
      height: '90%'
    });
    
  }

  obtenerConsolidado(){
    this.layoutService.showLoading();
  
    this._gestionarInvitacionCitas.getConsolidado().subscribe(
      ({ data }) => {

        this.consolidado = data;

        this.consolidado.propertysCitationFindingsForm.map( pregunta => {

          pregunta.answersOptions.map( r => {
            r.selected = false;
          } )

        } )
        
        
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  conclusiones = false;

  listaCitas = [];

  consultarCitas() {

    if(!this.nitEmpresa) return;

    this.layoutService.showLoading();
  
    this._gestionarInvitacionCitas.getScheduledVirtualAppointmentsCompany(this.nitEmpresa.toString(), "Host").subscribe(
      ({ data }) => {

        this.listaCitas = data;

        data.map( d => {
          if(d.idState >= 5 && d.idState <= 8){ // programada, confirmada, reprogramada por anfitrio o invitado

            d.reprogramar = true;
            d.rechazar = false;
            d.confirmar = false;
            d.cancelar = true;
            d.detalles = false;
            d.saveconclusiones = false;
            d.conclusiones = false;

          }else if(d.idState == 9 || d.idState == 10){ // cancelada o rechazada
            
            d.reprogramar = false;
            d.rechazar = false;
            d.confirmar = false;
            d.cancelar = false;
            d.detalles = true;
            d.saveconclusiones = false;
            d.conclusiones = false;

          }
          else if(d.idState == 13){ // conclusiones registradas
            
            d.reprogramar = false;
            d.rechazar = false;
            d.confirmar = false;
            d.cancelar = false;
            d.detalles = false;
            d.saveconclusiones = false;
            d.conclusiones = true;

          }

          if(this.horaConclusiones(d)){ // conclusiones no registradas
            
            d.reprogramar = false;
            d.rechazar = false;
            d.confirmar = false;
            d.cancelar = false;
            d.detalles = false;
            d.saveconclusiones = true;
            d.conclusiones = false;

          }

          this._gestionarInvitacionCitas.getRespuestaCitaVirtual(d.id).subscribe(({data}) => {
            
            if( data.quizAnswersDetail.length > 0 ) {
              d.respuestas = data.quizAnswersDetail;
            }
            else {
              d.respuestas = []
            };
          });
          (error: any) => {
            console.log(error);
            this.layoutService.closeLoading();
          };

        });

        this.dataSource = new MatTableDataSource<any>(data);

        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;

        this.dataSource.paginator._intl.firstPageLabel = 'Ir al inicio';
        this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
        this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
        this.dataSource.paginator._intl.lastPageLabel = 'Ir al final';

        this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          if (length == 0 || pageSize == 0) { return `0 de ${length}`; }

          length = Math.max(length, 0);
          const startIndex = page * pageSize;
          const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

          return `${startIndex + 1} - ${endIndex} de ${length} elementos | Página ${Math.ceil(endIndex / 3)} de ${Math.ceil(length / 3)}`;
        }
        this.citas = this.dataSource.connect();
        
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  convertirStateId(stateId: number){

    const encontrado = this.estados.find(state => state.stateId === stateId);
    return encontrado ? encontrado.name : '';

}

  formatoDeFecha(fechaISO: string) {
    const fecha: Date = new Date(fechaISO);
    const fechaFormateada = parseInt(fecha.getDate().toString(), 10) + '/' + parseInt((fecha.getMonth()+1).toString(), 10) + '/' + fecha.getUTCFullYear();
    if (fechaFormateada)
      return fechaFormateada;
    return fechaISO;
  }

  formatoHora(horaDate: string) {
    let horaArray = horaDate.split(":")
    return horaArray[0] + ':' + horaArray[1]
  }

  reprogramarCita(item: any) {

    if(this.horaConclusiones(item)){
      item.idState = 12;
      this.mensajePopupConfirmacion = 'Imposible realizar la acción, la cita de negocios virtual ha finalizado, por favor registre las conclusiones.';
      this.isPopupConfirmacion = true;
      return;
    }

    this.router.navigate([this.linkTo], { queryParams: { appointmentId: item.id } });
  }

  eliminar(alerta: any) {
    this.alertaSeleccionada = alerta;
    this.notificationMessage = '¿Deseas eliminar definitivamente la alerta seleccionada?';
    this.showAlerta = true;
    this.opcion = 'eliminar';
  }

  gestion(value: boolean) {

    if (this.opcion === 'eliminar') {

      if (value) {
        // this.alertasService.eliminarAlerta(this.alertaSeleccionada.idAlert).subscribe((data: any) => {
        //   this.notificationConfirmMessage = 'Se ha eliminado exitosamente la alerta';
        //   this.showConfirmAlerta = true;
        //   this.consultarAlertas();
        // }, error => {
        //   console.error(error)
        // });
      }

    } else if (this.opcion === 'editar') {

      if (value) {
        console.log(this.alertaSeleccionada);
      }

    } else if (this.opcion === 'activar') {

      if (value) {
        // this.alertasService.cambiarEstadoAlerta(this.alertaSeleccionada.idAlert, true).subscribe((data: any) => {
        //   this.notificationConfirmMessage = 'Se ha reactivado exitosamente la  programación de la alerta';
        //   this.showConfirmAlerta = true;
        //   this.consultarAlertas();
        // }, error => {
        //   console.error(error)
        // });
      }

    }
    this.showAlerta = false;
  }

  closePopup(value: any) {
    this.showConfirmAlerta = false;
  }

  citaParaConsolidado: any;

  abrirDialogTemplate(item, templateRef: any) {
    this.citaParaConsolidado = item;
    this.obtenerConsolidado();

    this.formulariosConclusiones.map( (f: any) => {
      f.answersOptions.map( r => r.selected = false);
    });
    
    this.dialog.open(templateRef, {
      width: '800px',
      height: '90%'
    });
  }


  abrirConclusiones(item: any){
    this.citaParaConsolidado = item;
    this.conclusiones = true;
  }

  cerrarDialogTemplate() {
    this.dialog.closeAll();
  }

  closePopupCambios(event: boolean) {
    this.isPopupCambios = false;
    if (event) {
      switch (this.ejecutar.name) {
        case "cancelarCita":
          if (this.ejecutar.dialogTemplate) {

            // this.ejecutar = {
            //   name: "cancelarCita",
            //   index: this.ejecutar.id,
            //   dialogTemplate: this.ejecutar.dialogTemplate
            // }
            // this.motivoCancelacionCita = {
            //   id: null,
            //   name: ""
            // }
            this.abrirDialogTemplate(this.citaParaConsolidado, this.ejecutar.dialogTemplate);
          }
          break;

        case "citaEliminada":
          // this.listaRespuestas.splice(this.ejecutar.index, 1);

          this.mensajePopupConfirmacion = "La opción de respuesta ha sido eliminada exitosamente";
          this.isPopupConfirmacion = true;
          break;

        default:

          break;
      }
      this.ejecutar = null;
    }
  }

  closePopupConfimacion(event: boolean) {
    this.isPopupConfirmacion = false;
  }
  
  cancelarCita(item: any, dialogTemplateCancelar: any) {

    if(this.horaConclusiones(item)){
      item.idState = 12;
      this.mensajePopupConfirmacion = 'Imposible realizar la acción, la cita de negocios virtual ha finalizado, por favor registre las conclusiones.';
      this.isPopupConfirmacion = true;
      return;
    }

    this.citaSeleccionada = item;
    this.ejecutar = {
      name: "cancelarCita",
      index: item.id,
      dialogTemplate: dialogTemplateCancelar
    }
    this.mensajePopupCambios = "¿Estás seguro que deseas cancelar tu cita de negocios virtual?";
    this.isPopupCambios = true;
  }

  // motivoCancelacionCita: any = {
  //   id: null,
  //   name: ""
  // };
  guardarCancelarCita() {
    this.cerrarDialogTemplate();

    this.citaSeleccionada.idState = 9;
    this.citaSeleccionada.type = "Host";
    this.citaSeleccionada.reasonState = this.motivoCancelacionCita;
    this.citaSeleccionada.idStateHost = 9;

    this.layoutService.showLoading();
    this._gestionarInvitacionCitas.actualizarInformacionCitaVirtualPorTipo(this.citaSeleccionada).subscribe(
      ({ data }) => {
        this.mensajePopupConfirmacion = 'Tu cita de negocios virtual ha sido cancelada exitosamente.';
        this.isPopupConfirmacion = true;
        this.consultarCitas();
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      this.layoutService.closeLoading();
    };
  }

  horaConclusiones(item: any){
    
    if(item.idState == 9 || item.idState == 10) return false;

    if(item.respuestas && item.respuestas.length > 0) return false;

    const fecha = item.appointmentDate.split('T')[0];
    const hora = item.endHour

    const time = new Date(`${fecha}T${hora}`);
    
    if(new Date().getTime() >= time.getTime()){

      item.reprogramar = false;
      item.rechazar = false;
      item.confirmar = false;
      item.cancelar = false;
      item.detalles = false;
      item.saveconclusiones = true;
      item.conclusiones = false;

      item.idState = 12;

      return true;
    }else{
      return false;
    }
    
  }

  disabledBtnGuardarMotivoCancelacion: boolean = false;
  isBtnGuardarMotivoCancelacion() {
    let res = "";
    document.getElementsByName("motivoCancelacionCita").forEach((item) => {
      if (item["checked"]) {
        this.disabledBtnGuardarMotivoCancelacion = true;
        res = item["value"];
        // this.motivoCancelacionCita = item["value"];
        // {
        //   id: item["id"].split("-")[2],
        //   name: item["value"]
        // }
      }
    });
    return res;
  }

  verPorCondicion(item: Condition) {
    if (item.idConditionQuestion && item.idConditionAnswer) {
      const preguntaCondicion = this.formulariosConclusiones.find((pregunta) => {
        return (pregunta.id == item.idConditionQuestion)
      })
      // console.log("preguntaC", preguntaCondicion);

      const respuestaEsperada = preguntaCondicion.answersOptions.find((respuesta) => {
        return (respuesta.id == item.idConditionAnswer)
      })
      // console.log("respuestaC", respuestaEsperada);

      // console.log("this.respuestas", this.respuestas);
      if (!this.respuestas[preguntaCondicion.id]) {
        return false;
      }

      // if (this.respuestas[preguntaCondicion.id][0].name = respuestaEsperada.name) {
      //   console.log("this.respuestas[preguntaC.id][0].name != respuestaC.name", this.respuestas[preguntaCondicion.id][0].name, " - ", respuestaEsperada.name);
      //   return false;
      // }
      let isLocal = false;
      this.respuestas[preguntaCondicion.id].forEach(element => {
        if (element.name == respuestaEsperada.name) {
          // console.log("this.respuestas[preguntaC.id][0].name != respuestaC.name", element.name, " - ", respuestaEsperada.name);
          isLocal = true;
        }
      });
      return isLocal;

      // if ()
    }
    return true;
  }

  checkDiferenteCondicionado(pregunta:ConclusionsForm, id:number):boolean{
    let isAux: boolean = false;
    let contador:number = 0;
    document.getElementsByName("preguntaRespuesta-" + pregunta.id).forEach((item) => {
      // console.log('item["id"].split(" - ")[2] != id.toString()', item["id"].split("-")[2], id.toString());
      
      if (item["checked"]) {
        if (item["id"].split("-")[2] == id.toString()) {
          isAux = true;
        }
      }
      else {
        contador++;
      }
    });
    // console.log("isAux", isAux, "contador", contador, "length", document.getElementsByName("preguntaRespuesta-" + pregunta.id).length);
    
    if (contador == document.getElementsByName("preguntaRespuesta-" + pregunta.id).length)
      return true
    return isAux;
  } 
  verPorCondicionDOMPregunta(itemPadre: Condition): boolean {

    if (itemPadre.idConditionAnswer && itemPadre.idConditionQuestion) {
      const preguntaCondicion = this.formulariosConclusiones.find((pregunta) => {
        return (pregunta.id == itemPadre.idConditionQuestion)
      })
      const respuestaEsperada = preguntaCondicion.answersOptions.find((respuesta) => {
        return (respuesta.id == itemPadre.idConditionAnswer)
      })
      // console.log("verPorCondicionDOM", document.getElementById("preguntaRespuesta-" + preguntaCondicion.id + "-" + respuestaEsperada.id)["checked"]);
      // const elemento = document.getElementById("preguntaRespuesta-" + preguntaCondicion.id + "-" + respuestaEsperada.id)
      // if (elemento) {
      //   return (elemento["checked"]);
      // }
      return this.checkDiferenteCondicionado(preguntaCondicion, respuestaEsperada.id)
    }
    return false;
  }

  verPorCondicionDOM(itemPadre: Condition): boolean {
    if (itemPadre.idConditionAnswer && itemPadre.idConditionQuestion) {
      
      const preguntaCondicion = this.formulariosConclusiones.find((pregunta) => {
        return (pregunta.id == itemPadre.idConditionQuestion)
      })
      const respuestaEsperada = preguntaCondicion.answersOptions.find((respuesta) => {
        return (respuesta.id == itemPadre.idConditionAnswer)
      })
      // console.log("verPorCondicionDOM", document.getElementById("preguntaRespuesta-" + preguntaCondicion.id + "-" + respuestaEsperada.id)["checked"]);
      const elemento = document.getElementById("preguntaRespuesta-" + preguntaCondicion.id + "-" + respuestaEsperada.id)
      if (elemento) {
        return (elemento["checked"]);
      } else {
        return false
      }
    }
    return true;
  }
  disabledBtnGuardarConcluciones = false;
  isBtnGuardarConcluciones(): boolean {
    let res: boolean = true;
    this.formulariosConclusiones.forEach((pregunta) => {
      let isAux: boolean = false;
      
      // console.log("pregunta.isToShow && this.verPorCondicionDOM(pregunta.condition) && pregunta.isRequiredDiligence", pregunta.isToShow, this.verPorCondicionDOM(pregunta.condition), pregunta.isRequiredDiligence);
      
      if (pregunta.isToShow && !this.verPorCondicionDOMPregunta(pregunta.condition) && pregunta.isRequiredDiligence) {
        // console.log("pregunta", pregunta);
        document.getElementsByName("preguntaRespuesta-" + pregunta.id).forEach((item) => {
          // console.log("item && item['checked']", item, item["checked"]);
          
          if (item && item["checked"]) {
            isAux = true;
          }
        });
        if (!isAux) {
          res = false;
          // this.disabledBtnGuardarConcluciones = false;
          // return;
        }
      }
    });
    this.disabledBtnGuardarConcluciones = res;
    return res;
  }

  obtenerFormularioPublicado() {
    this.layoutService.showLoading();
    this._administrarFormularioService.obtenerFormularioPorUsuario(1, 4).subscribe(
      (res) => {
        if (res.succeeded && res.data) {
          
          if (res.data.propertysCitationFindingsForm.length) {
            this.formulariosConclusiones = res.data.propertysCitationFindingsForm.map((pregunta: any) => {
              pregunta.idState = 1;
              pregunta.id = pregunta.questionType.position;
              pregunta.answersOptions.map(r => {
                r.selected = false;
              })
              return pregunta;
            })
          }
          else {
            console.log("No hay formularios");
          }
        } else {
          console.log("No succeeded", res.message);
        }
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  deshabilitarEnvioConsolidado = true

  respuestaSeleccionada(formulario: any, pregunta: number, respuesta: number, id: string, tipo: string): void {

    let valor: any;
    if( tipo === 'radio' ) valor = (<HTMLInputElement>document.getElementById(id)).value;
    else if( tipo === 'check') valor = (<HTMLInputElement>document.getElementById(id)).value;
    

    formulario[pregunta].answersOptions[respuesta].selected = (<HTMLInputElement>document.getElementById(id)).checked
    // formulario[pregunta].answersOptions.map( (resp: any, index: number) => {
    //   if( resp.name === valor){
    //     resp.selected = document.getElementById(id).checked
    //   }
      // if(formulario[pregunta].questionType.name !== "Selección Única") resp.selected = !resp.selected
      // else {
      //   if( respuesta === index ) resp.selected = true
      //   else resp.selected = false
      // }
    // });


    let count = 0;
    formulario.map( (f: any) => {
      const encontrado = f.answersOptions.find( r => r.selected === true);
      if( encontrado ) count += 1;
    })

    if(formulario.length < count) this.deshabilitarEnvioConsolidado = true;
    else this.deshabilitarEnvioConsolidado = false;
    console.log(formulario, count);
    
  }

  guardarConcluciones() {

    let payload = {
      "id": 0,
      "idSheduledVirtualAppointments": this.citaParaConsolidado.id,
      "idState": 0,
      "dateCreate": "2022-06-28T04:33:31.774Z",
      "idUserCreate": 0,
      "dateUpdate": "2022-06-28T04:33:31.774Z",
      "idUserUpdate": 0,
      "quizAnswersDetail": []
    };

    this.formulariosConclusiones.map( (pregunta, indexP) => {

      const p = this.consolidado.propertysCitationFindingsForm.find( p => p.name === pregunta.name)

      pregunta.answersOptions.map( (respuesta, indexR) => {

        if( respuesta.selected ){
          payload.quizAnswersDetail = [
            ...payload.quizAnswersDetail,
            {
              "idDetail": 0,
              "idQuizAnswers": 0,
              "idAsk": indexP + 1,
              "ask": p.name,
              "response": respuesta.name,
              "position": indexR
            }
          ];
        }

      });

    });

    this._gestionarInvitacionCitas.registrarRespuestaCitaVirtual(payload).subscribe((res) => {
      this.mensajePopupConfirmacion = 'Las conclusiones de la cita fueron guardadas exitosamente.'
      this.isPopupConfirmacion = true;
      this.consultarCitas();
      this.layoutService.closeLoading();
      this.cerrarDialogTemplate();
    });
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };

  }

  agregarAtributoBoleanoRespuestas() {
    this.formulariosConclusiones.forEach((item: ConclusionsForm) => {
      item.answersOptions.map((respuesta: AnswersOption) => {
        respuesta['isSelect'] = false;
      })
    })
  }
  changeIsMostrarFormulario() {
    // this.isMostrarFormulario = !this.isMostrarFormulario;
    // this.objetoFormulariosConclusiones[this.index - 1].isToShow = this.isMostrarFormulario;
  }
}

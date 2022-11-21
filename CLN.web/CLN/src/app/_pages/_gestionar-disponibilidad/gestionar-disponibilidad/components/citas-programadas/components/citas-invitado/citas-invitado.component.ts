import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { ReprogramarCitasService } from 'src/app/_services/_reprogramar-citas/reprogramar-citas.service';
import { GestionarInvitacionCitasService } from '../../../../../../../_services/_gestionar-invitacion-cita/gestionar-invitacion-citas.service';

export interface ConclusionsForm {
  id: number;
  isToShow: boolean;
  name: string;
  questionType: QuestionType;
  answersOptions: AnswersOption[];
  isRequiredDiligence: boolean;
  condition: Condition;
}

export interface AnswersOption {
  id: number;
  name: string;
}

export interface Condition {
  isCondition: boolean;
  conditionQuestion: number;
  conditionResponseOption: number;
}

export interface QuestionType {
  id: number;
  name: string;
}

export interface IdName {
  id: number;
  name: string;
}

@Component({
  selector: 'app-citas-invitado',
  templateUrl: './citas-invitado.component.html',
  styleUrls: ['./citas-invitado.component.scss']
})
export class CitasInvitadoComponent implements OnInit {

  @Input() nitEmpresa: any;

  linkTo = "/reschedule-appointments";
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
  showConfirmation: boolean = false;
  mensajePopupCambios: string = "";
  ejecutar: any;

  isPopupConfirmacion: boolean = false;
  mensajePopupConfirmacion: string = "";

  formulariosConclusiones: ConclusionsForm[] = [
    {
      id: 1,
      isToShow: true,
      name: "¿La reunión se realizó?",
      questionType:
      {
        name: "Selección única",
        id: 1
      },

      answersOptions: [
        {
          id: 1,
          name: "Si"
        },
        {

          id: 2,
          name: "No"
        }
      ],
      isRequiredDiligence: true,
      condition: {
        isCondition: false,
        conditionQuestion: null,
        conditionResponseOption: null,
      }
    },
    {
      id: 6,
      isToShow: true,
      name: "pregunta id 6 Condición(1)",
      questionType: {
        id: 2,
        name: "Selección Múltiple"
      },
      answersOptions: [
        {
          id: 1,
          name: "Respuesta 1"
        },
        {
          id: 2,
          name: "Respuesta 2"
        }
      ],
      isRequiredDiligence: false,
      condition: {
        isCondition: true,
        conditionQuestion: 1,
        conditionResponseOption: 1,
      }
    },
    {
      id: 4,
      isToShow: false,
      name: "pregunta dos",
      questionType: {
        id: 2,
        name: "Selección Múltiple"
      },
      answersOptions: [
        {
          id: 1,
          name: "Respuesta 1"
        },
        {
          id: 2,
          name: "Respuesta 2"
        }
      ],
      isRequiredDiligence: false,
      condition: {
        isCondition: false,
        conditionQuestion: null,
        conditionResponseOption: null,
      }
    },
    {
      id: 5,
      isToShow: true,
      name: "pregunta id 5 - Condición(1) prueba prueba prueba prueba",
      questionType: {
        id: 1,
        name: "Selección única"
      },
      answersOptions: [
        {
          id: 1,
          name: "Respuesta 1 prueba prueba prueba prueba"
        },
        {
          id: 2,
          name: "Respuesta 2 prueba prueba prueba prueba prueba prueba prueba prueba"
        },
        {
          id: 3,
          name: "Respuesta 3 prueba prueba prueba prueba prueba prueba prueba prueba"
        }
      ],
      isRequiredDiligence: true,
      condition: {
        isCondition: true,
        conditionQuestion: 1,
        conditionResponseOption: 1,
      }
    },
  ];

  respuestas: any[] = [];

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
      stateId: 13, 
      name: 'Conclusiones registradas'
    },
  ];

  motivosRechazoCita = []
  motivoRechazoCita = ''
  motivoCancelacionCita = ''
  motivosCancelacionCita = []

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private layoutService: LayoutService,
    private _gestionarInvitacionCitas: GestionarInvitacionCitasService,
    private router: Router,
    private dialog: MatDialog, private reprogramarCitasService: ReprogramarCitasService) {

  }

  ngOnInit() {
    this.consultarCitas();
    this.agregarAtributoBoleanoRespuestas();
    this.listadoMotivosRechazo();
    this.listadoMotivosCancelacion();
  }

  listaCitas = [];
  
  consultarCitas() {

    if(!this.nitEmpresa) return;
    
    this.layoutService.showLoading();
  
    this._gestionarInvitacionCitas.getScheduledVirtualAppointmentsCompany(this.nitEmpresa.companyIdentifier.toString(), "Guest").subscribe(
        ({ data }) => {

          this.listaCitas = data;
          
          data.map( d => {
            
            d.host = d.companyNameHost
                if(d.idState === 5){ // programada
                  
                  d.reprogramar = true;
                  d.rechazar = true;
                  d.confirmar = true;
                  d.cancelar = false;
                  d.detalles = false;
                  d.conclusiones = false;
    
                }else if(d.idState === 6){ // confirmado

                  d.reprogramar = true;
                  d.rechazar = false;
                  d.confirmar = false;
                  d.cancelar = true;
                  d.detalles = false;
                  d.conclusiones = false;
    
                }else if(d.idState === 7 || d.idState === 8){ // reprogramado por anfitrion, reprogramado por invitado

                  d.reprogramar = true;
                  d.rechazar = false;
                  d.confirmar = false;
                  d.cancelar = true;
                  d.detalles = false;
                  d.conclusiones = false;
    
                }else if(d.idState === 9 || d.idState === 10){ // cancelada, rechazado

                  d.reprogramar = false;
                  d.rechazar = false;
                  d.confirmar = false;
                  d.cancelar = false;
                  d.detalles = true;
                  d.conclusiones = false;
    
                }else if(d.idState == 13){ // conclusiones registradas
                  
                  d.reprogramar = false;
                  d.rechazar = false;
                  d.confirmar = false;
                  d.cancelar = false;
                  d.detalles = false;
                  d.saveconclusiones = false;
                  d.conclusiones = true;
      
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

          } )
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

    this.layoutService.closeLoading();
  }

  mensajeRechazarCancelar = {
    title: '',
    body: ''
  }

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
      width: '800px'
    });
    
  }

  citaSeleccionada: any

  confirmarCita( cita: any ){

    this.citaSeleccionada = cita;
    this.mensajePopupCambios = "¿Confirmas que asistirás a la cita de negocios virtual?";
    this.isPopupCambios = true;
  
  }

  itemActual: any;

  verRespuestas(item: any, templateRef: any){
    this.itemActual = item;
    
    this.itemActual.respuestas.length && this.dialog.open(templateRef, {
      width: '800px',
      height: '90%'
    });
    
  }

  closePopupConfirmation(value: boolean) {
    
    if( !value ) // cuando se escoge la opcion cancelar
    {  
      this.isPopupCambios = false;
      return;
    }

    /**
     * hacer cuando se escoge la opcion aceptar
     */
    this.isPopupCambios = false;
    this.citaSeleccionada.idState = 6;
    this.citaSeleccionada.type = "Guest";

    this.layoutService.showLoading();
    this._gestionarInvitacionCitas.actualizarInformacionCitaVirtualPorTipo(this.citaSeleccionada).subscribe(
      ({ data }) => {
        this.consultarCitas();
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      this.layoutService.closeLoading();
    };
    
  }

  closeConfirmation(){
    this.showConfirmation = false;
  }

  formatoDeFecha(fechaISO: string) {
    const fecha: Date = new Date(fechaISO);
    const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getUTCFullYear()}`;
    if (fechaFormateada)
      return fechaFormateada;
    return fechaISO;
  }

  formatoHora(horaDate: string) {
    let horaArray = horaDate.split(":")
    return horaArray[0] + ':' + horaArray[1]
  }

  convertirStateId(stateId: number){

      const encontrado = this.estados.find(state => state.stateId === stateId);
      return encontrado ? encontrado.name : '';

  }

  reprogramarCita(item: any) {
    this.router.navigate([this.linkTo], { queryParams: { appointmentId: item.id } });
  }

  rechazando = false
  mensajeRechazo = ''

  rechazarCita(item: any) {
    this.citaSeleccionada = item;
    this.mensajeRechazo = "¿Confirmas que deseas rechazar la invitación a la cita de negocios virtual?";
    this.rechazando = true
    
  }

  popupRazonRechazo = false;
  closePopupRechazo(value: boolean) {
    
    if( !value ) // cuando se escoge la opcion cancelar
    {  
      this.rechazando = false;
      return;
    }

    this.rechazando = false;
    this.popupRazonRechazo = true;

    
    
  }

  listadoMotivosRechazo(){

    this._gestionarInvitacionCitas.motivosRechazo().subscribe(
      ({ data }) => {
        this.motivosRechazoCita = data;
        
      }
    );
    (error: any) => {
      this.layoutService.closeLoading();
    };

  }

  enviarRechazo(){

    this.popupRazonRechazo = false;
    this.citaSeleccionada.idState = 10;
    this.citaSeleccionada.type = "Guest";
    this.citaSeleccionada.rejectionReason = this.motivoRechazoCita;
    this.citaSeleccionada.reasonState = this.motivoRechazoCita;

    console.log(this.citaSeleccionada);
    

    this.layoutService.showLoading();
    this._gestionarInvitacionCitas.actualizarInformacionCitaVirtualPorTipo(this.citaSeleccionada).subscribe(
      ({ data }) => {
        this.mensajePopupConfirmacion = 'La cita de negocios virtual ha sido rechazada exitosamente.';
        this.isPopupConfirmacion = true;
        this.consultarCitas();
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      this.layoutService.closeLoading();
    };

  }

  cancelar = false;
  cancelarCita(item: any) {

    this.citaSeleccionada = item;
    this.mensajePopupCambios = "¿Estás seguro que deseas cancelar tu cita de negocios virtual?";
    this.cancelar = true
  }

  popupRazonCancelacion = false;
  closePopupCancelacion(value: boolean) {
    
    if( !value ) // cuando se escoge la opcion cancelar
    {  
      this.rechazando = false;
      return;
    }

    this.cancelar = false;
    this.popupRazonCancelacion = true;

    
    
  }

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

  close(){
    this.isPopupConfirmacion = false
  }

  enviarCancelacion(){

    this.popupRazonCancelacion = false;
    this.citaSeleccionada.idState = 9;
    this.citaSeleccionada.type = "Guest";
    this.citaSeleccionada.reasonState = this.motivoCancelacionCita;

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

  popupDetalle = false;
  titulo = ''
  respuesta = ''
  detalleCita(item: any){

    if(item.rejectionReason){
      this.titulo = '¿Cuál es el motivo de la cancelación de la cita?';
      this.respuesta = item.rejectionReason;
    }else if(item.cancellationReason){
      this.titulo = '¿Cuál es el motivo del rechazo de la invitación a la cita?';
      this.respuesta = item.cancellationReason;
    }

    this.popupDetalle = true;
    
  }

  validarOpcionesConHora(item: any, opcion){

    if( opcion === 'detalles'){

      const fechaServer = new Date(item.appointmentDate.split('T')[0]);
      const actual = new Date();
      const time = new Date(fechaServer.getFullYear(), fechaServer.getMonth(), fechaServer.getDate(), actual.getHours(), actual.getMinutes(), 0)

      if(time.getTime() > actual.getTime()) item.detalles = true;
      else item.detalles = false;

    }else if( opcion === 'conclusiones'){

      const fechaServer = new Date(item.appointmentDate.split('T')[0]);
      const actual = new Date();

      const time = new Date(fechaServer.getFullYear(), fechaServer.getMonth(), fechaServer.getDate(), actual.getHours(), actual.getMinutes(), 0)

      if(time.getTime() > actual.getTime()) item.conclusiones = true;
      else item.conclusiones = false;

    }

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

  abrirDialogTemplate(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '800px'
    });
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
            this.abrirDialogTemplate(this.ejecutar.dialogTemplate);
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



  // motivoCancelacionCita: any = {
  //   id: null,
  //   name: ""
  // };
  guardarCancelarCita() {
    console.log("Motivo cancelación", this.isBtnGuardarMotivoCancelacion());
    this.cerrarDialogTemplate();
    this.mensajePopupConfirmacion = "Tu cita de negocios virtual ha sido cancelada exitosamente.";
    this.isPopupConfirmacion = true;
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
    if (item.isCondition) {
      const preguntaCondicion = this.formulariosConclusiones.find((pregunta) => {
        return (pregunta.id == item.conditionQuestion)
      })
      // console.log("preguntaC", preguntaCondicion);

      const respuestaEsperada = preguntaCondicion.answersOptions.find((respuesta) => {
        return (respuesta.id == item.conditionResponseOption)
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

  verPorCondicionDOM(itemPadre: Condition) {
    return;
    if (itemPadre.isCondition) {
      const preguntaCondicion = this.formulariosConclusiones.find((pregunta) => {
        return (pregunta.id == itemPadre.conditionQuestion)
      })
      const respuestaEsperada = preguntaCondicion.answersOptions.find((respuesta) => {
        return (respuesta.id == itemPadre.conditionResponseOption)
      })
      // console.log(("" + preguntaCondicion.id+"-"+respuestaEsperada.id));
      // console.log(document.getElementById(""+preguntaCondicion.id+"-"+respuestaEsperada.id)["checked"]);
      return (document.getElementById("preguntaRespuesta-" + preguntaCondicion.id + "-" + respuestaEsperada.id)["checked"]);
    }
    return true;
  }
  disabledBtnGuardarConcluciones = false;
  isBtnGuardarConcluciones(): boolean {
    let res: boolean = true;
    this.formulariosConclusiones.forEach((pregunta) => {
      let isAux: boolean = false;
      if (pregunta.isToShow && this.verPorCondicionDOM(pregunta.condition) && pregunta.isRequiredDiligence) {
        document.getElementsByName("preguntaRespuesta-" + pregunta.id).forEach((item) => {
          // console.log("item['checked'] - item", item["checked"],item);
          
          if (item && item["checked"]) {
            isAux = true;
          }
        });
        if (!isAux) {
          res = isAux;
          this.disabledBtnGuardarConcluciones = res;
          return;
        }
      }
    });
    this.disabledBtnGuardarConcluciones = res;
    return res;
  }
  guardarConcluciones() {
    // console.log("guardarConcluciones respuestas", this.respuestas);
    // console.log("guardarConcluciones formulariosConclusiones", this.formulariosConclusiones);
    let objRespuestas: any[] = [];
    let index = 0;
    this.formulariosConclusiones.forEach((pregunta) => {
      let auxRes: any[] = [];
      let isAux: boolean = false;
      document.getElementsByName("preguntaRespuesta-" + pregunta.id).forEach((item) => {
        if (item["checked"]) {
          auxRes.push({
            id: item["id"].split("-")[2],
            name: item["value"]
          });
          isAux = true;
          // console.log(item["value"])
        }
      });
      if (isAux) {
        objRespuestas[index] = {
          id: pregunta.id,
          name: pregunta.name,
          answers: auxRes
        }
        index++;
      }
    });
    console.log("guardarConcluciones formulariosConclusiones", objRespuestas);
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
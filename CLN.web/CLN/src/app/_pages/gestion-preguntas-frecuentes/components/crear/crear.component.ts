import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MicrositiosService } from 'src/app/_services/micrositios/micrositios.service';
import { PreguntasServiceService } from 'src/app/_services/preguntas-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TemasService } from 'src/app/_services/gestor-contenidos/temas.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/_pages/modal/modal.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './crear.component.scss']
})
export class CrearComponent implements OnInit {
  sendedData;
  micrositios: any[] = [];

  temas: any[] = [];
  verutilidad = false;
  accion = 'almacenada';

  ddTemasSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'idMicrositio',
    textField: 'nombre',
    selectAllText: 'Todos Seleccionados',
    unSelectAllText: 'ninguno seleccionado',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  utilidades: any[] = [];
  utilidad: any;
  utilidadeditar: any;
  botonutilidad: string = 'Aceptar';
  pregunta: any;
  respuesta: any;
  tema: any;
  micrositio: any = [];
  componente: any;
  titulo: string = 'Crear pregunta';
  boton: string = 'Guardar';
  idPregunta: any;

  constructor(
    private fb: FormBuilder,
    private micrositiosService: MicrositiosService,
    private preguntasService: PreguntasServiceService,
    private temasService: TemasService,
    public dialog: MatDialog,
    private modalService: NgbModal,
    public modal: NgbActiveModal
  ) { }
  @ViewChild('modaldos', { static: false }) modalDos;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  validoform() {
    let texto = '';
    if (this.micrositio.length === 0) {
      texto += 'Selecciona el/los micrositios. ';
    }
    if (!this.pregunta || this.pregunta === '') {
      texto += 'Digita la pregunta. ';
    }
    if (!this.respuesta || this.respuesta === '') {
      texto += 'Digita la respuesta. ';
    }
    if (!this.tema) {
      texto += 'Selecciona el tema. ';
    }
    if (texto === '') {
      return true;
    } else {
      this.openDialog2(texto);
      return false;
    }
  }

  savePreguntasFrecuentes() {
    // armamos el objeto y consumimos servicio
    const validacion = this.validoform();
    if (validacion) {
      if (this.idPregunta > 0) {
        const micro: number[] = [];
        this.micrositio.forEach(element => {
          micro.push(element.idMicrositio);
        });
        let jsonFAQ = '{"id":' + this.idPregunta + ',"pregunta":"' + this.pregunta + '","respuesta":"' + this.respuesta + '","micrositios":[' + micro + '],"temas":[' + this.tema + '] }';
        this.preguntasService.updateFAQ(jsonFAQ)
          .subscribe(response => {
            this.setempty();
            this.accion = "actualizada";
            //this.modalService.open(this.modalDos, { size: 'lg', centered: true });
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La pregunta frecuente ha sido ${this.accion} correctamente y habilitada en/los micrositios seleccionado/s</p>`;
            this.modal.close();
            this.notifyParent.emit('guardado');
          });
      } else {
        const micro: number[] = [];
        this.micrositio.forEach(element => {
          micro.push(element.idMicrositio);
        });
        let jsonFAQ = '{"pregunta":"' + this.pregunta + '","respuesta":"' + this.respuesta + '","micrositios":[' + micro + '],"temas":[' + this.tema + '] }';
        this.preguntasService.createQuestion(jsonFAQ)
          .subscribe(response => {
            this.setempty();
            this.accion = "almacenada";
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La pregunta frecuente ha sido ${this.accion} correctamente y habilitada en/los micrositios seleccionado/s</p>`;
            //this.notifyParent.emit('guardado');
            this.modal.close();
          });
      }
    }
  }

  setempty() {
    this.pregunta = '';
    this.respuesta = '';
    this.micrositios = [];
    this.tema = '';
    this.idPregunta = 0;
  }

  ngOnInit() {
    // console.log(this.componente);
    this.idPregunta = 0;
    this.notifyParent.emit('guardado');
    if (this.componente) {
      this.pregunta = this.componente.pregunta;
      this.respuesta = this.componente.respuesta;
      this.idPregunta = this.componente.idPregunta;
      this.titulo = 'Editar pregunta';
      this.preguntasService.getFAQDetail(this.componente.idPregunta)
        .subscribe(pregunta => {
          this.tema = pregunta[0].PreguntaTema[0].idTema;
          this.micrositio = pregunta[0].PreguntaMicrositio;
          /*pregunta[0].PreguntaMicrositio.forEach(element => {
            this.micrositio.push(element.idMicrositio);
          });*/
        }
        );
      this.boton = 'Actualizar';
    }

    this.fetchMicrositios();
    this.fetchTemas();
    this.fetchUtilidades();
  }

  fetchMicrositios() {
    this.micrositiosService.getAllMicrositiosSimpleList()
      .subscribe(micrositios => {
        this.micrositios = micrositios;
      });
  }
  fetchUtilidades() {
    this.preguntasService.getUtils()
      .subscribe(utilidades => {
        this.utilidades = utilidades;
      });
  }

  saveUtilidad() {
    console.log(this.utilidad);
    if (this.utilidad === '') {
      this.openDialog2('Digita la utilidad');
    } else {
      if (this.utilidadeditar !== null) {
        this.utilidadeditar.descripcion = this.utilidad;
        this.preguntasService.updateUtils(this.utilidadeditar)
          .subscribe(response => {
            this.utilidad = '';
            this.utilidadeditar = null;
            this.botonutilidad = 'Aceptar';
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La utilidad <b>  ${this.utilidad} </b> ha sido editada correctamente.</p>`;
            this.fetchUtilidades();
          });
      } else {
        const utilidadObj = { descripcion: this.utilidad };
        this.preguntasService.createUtils(utilidadObj)
          .subscribe(response => {
            this.utilidad = '';
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La utilidad <b>  ${this.utilidad} </b> ha sido creada correctamente.</p>`;
            this.fetchUtilidades();
          });
      }
    }
  }

  editar(utlidad: any) {
    this.utilidadeditar = utlidad;
    this.utilidad = utlidad.descripcion;
    this.botonutilidad = 'Actualizar';
  }

  eliminar(utlidad: any) {
    utlidad.estado = 3;
    const text = '¿Está seguro de eliminar la utilidad <b>' + utlidad.descripcion + '</b>?';
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.text = text;
    modalRef.componentInstance.sioNoBoton = true;
    modalRef.componentInstance.notifyParent.subscribe(($e) => {
      console.log($e);
      if ($e === 'si') {
        this.preguntasService.updateUtils(utlidad)
          .subscribe(response => {
            this.utilidad = '';
            this.utilidadeditar = null;
            this.botonutilidad = 'Aceptar';
            this.fetchUtilidades();
            this.openDialog2('La utilidad <b>' + utlidad.descripcion + '</b> fue eliminada correctamente.');
          });
      }
    });
  }

  fetchTemas() {
    this.temasService.getTopics(1, 0)
      .subscribe(response => {
        this.temas = response;
      });
  }

  ver() {
    console.log(this.verutilidad);
    if (this.verutilidad) {
      this.verutilidad = false;
    } else {
      this.verutilidad = true;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  ActiveBanner($event, utilidad: any) {
    const nuevautildiad = utilidad.estado === 2 ? 1 : 2;

    utilidad.estado = nuevautildiad;
    const texto = nuevautildiad === 1 ? 'activada' : 'inactivada';
    this.preguntasService.updateUtils(utilidad)
      .subscribe(response => {
        this.openDialog2('La utilidad <b>' + this.utilidad + '</b> ha sido ' + texto + ' correctamente.');
        this.fetchUtilidades();
      });
  }
  openDialog2(texto) {
    console.log(texto);
/*     const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.text = texto;
    modalRef.componentInstance.sioNoBoton = false; */
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${texto}</p>`;
  }
}

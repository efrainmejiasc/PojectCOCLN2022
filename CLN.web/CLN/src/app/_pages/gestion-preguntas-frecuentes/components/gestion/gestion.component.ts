import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MicrositiosService } from 'src/app/_services/micrositios/micrositios.service';
import { MatDialog, MatDialogConfig, MatTable } from '@angular/material';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

// Servicios
import { PreguntasServiceService } from 'src/app/_services/preguntas-service.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';

// Componentes
import { CrearComponent } from '../crear/crear.component';
import { VisualizarComponent } from '../visualizar/visualizar.component';
import { ModalComponent } from 'src/app/_pages/modal/modal.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';

// Model
import { DataTablesOptions } from 'src/app/_shared/utils/DataTables/data-tables-options';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss',
    "../../../../_shared/styles/modals.scss"]
})
export class GestionComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private fb: FormBuilder,
    private micrositiosService: MicrositiosService,
    private preguntasService: PreguntasServiceService,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private router: Router,
    private rolesService: GestorRolesService,
    private permitService: PermitServiceService,
    private auth: AuthenticationService
  ) { }
  titulo = [
    "preguntas frecuentes",
    "Crear pregunta",
    "Aquí podrá gestionar las utilidades con las cuales, los usuarios podrán calificar la utilidad de cada una de las preguntas frecuentes habilitadas en la Escuela y en los micrositios.",
    "button-pregunta"
  ];
  micrositios: any[] = [];
  micrositio = 9999;
  preguntas: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized = false;
  resultadoConsulta = '';
  @ViewChild('modaleliminar', { static: false }) modaleliminar;
  @ViewChild('modalaccion', { static: false }) modalaccion;
  @ViewChild(MatTable, null) table: MatTable<any>;
  idpreguntaEliminar: any;
  idmicrositioEliminar: any;
  accion: string;
  buscarPor: any;
  utilidades: any[] = [];
  utilidad: any;
  utilidadeditar: any;
  botonutilidad = 'Aceptar';
  verutilidad: any;
  sort = 'asc';
  temas: any[] = [];
  temaabuscar: any;
  preguntasresult: any[] = [];

  userlogged: any;

  private messageAlertError = 'No hemos podido resolver tu solicitud, por favor vuelve a intentarlo'
  public permitsUser: permitsUserFetch = new permitsUserFetch();
  displayedColumns: string[] = ['drag', 'micrositio', 'tema', 'pregunta', 'respuesta'];

  inicializartabla() {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
  }

  ngOnInit() {
    this.validSession();
  }

  protected validSession() {
    if (localStorage.getItem('session') !== undefined) {
      const menuItem = localStorage.getItem('session');
      localStorage.removeItem("session");
      this.permitsAnalitics(menuItem);
    } else {
      // this.permitsAnalitics(1);
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(['/login']) : this.router.navigate(['/menudinamico']);
      });
    }
  }

  protected permitsAnalitics(item) {
    this.rolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          // Inicializar componente
          this.dtOptions = DataTablesOptions.settings();
          // this.inicializartabla();
          this.fetchMicrositios();
          this.fetchUtilidades();
        } else {
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            (this.userlogged === null) ? this.router.navigate(['/login']) : this.router.navigate(['/menudinamico']);
          });
        }
      }, error => {
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${this.messageAlertError}</p>`;
        this.auth.actualUser$.subscribe((data) => {
          this.userlogged = data;
          (this.userlogged === null) ? this.router.navigate(['/login']) : this.router.navigate(['/menudinamico']);
        });
      });
  }

  fetchUtilidades() {
    this.preguntasService.getUtils()
      .subscribe(utilidades => {
        this.utilidades = utilidades;
      });
  }

  saveUtilidad() {
    if (this.utilidad === '') {
      this.openDialog2('Digita la utilidad');
    } else {
      if (this.utilidadeditar != null) {
        this.utilidadeditar.descripcion = this.utilidad;
        this.preguntasService.updateUtils(this.utilidadeditar)
          .subscribe(response => {
            this.utilidad = '';
            this.utilidadeditar = null;
            this.botonutilidad = 'Aceptar';
            this.openDialog2('La utilidad <b>' + this.utilidad + '</b> ha sido editada correctamente.');
            this.fetchUtilidades();
          });
      } else {
        const utilidadObj = { descripcion: this.utilidad };
        this.preguntasService.createUtils(utilidadObj)
          .subscribe(response => {
            this.utilidad = '';
            this.openDialog2('La utilidad <b>' + this.utilidad + '</b> ha sido creada correctamente.');
            this.fetchUtilidades();
          });
      }
    }
  }

  editarUtilidad(utlidad: any) {
    this.utilidadeditar = utlidad;
    this.utilidad = utlidad.descripcion;
    this.botonutilidad = 'Actualizar';
  }

  eliminarUtilidad(utlidad: any) {
    this.preguntasService.getUtiltodelete(utlidad.idUtilidad).subscribe(preguntas => {
      if (preguntas > 0) {
        const text = 'La utilidad no puede ser eliminada, pues ha sido usada para calificar algunas preguntas frecuentes';
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.text = text;
        modalRef.componentInstance.sioNoBoton = false;
      } else {
        utlidad.estado = 3;
        const text = '¿Está seguro de eliminar la utilidad <b>' + utlidad.descripcion + '</b>?';
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.text = text;
        modalRef.componentInstance.sioNoBoton = true;
        modalRef.componentInstance.notifyParent.subscribe(($e) => {
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
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  fetchMicrositios() {
    this.micrositiosService.getAllMicrositiosSimpleList()
      .subscribe(micrositios => {
        this.micrositios = micrositios;
        this.getFrequentQuestions(this.micrositio);
      });
  }

  onSubmit() {
    alert('Thanks!');
  }

  getFrequentQuestions($event) {
    // this.dtTrigger.unsubscribe();
    this.preguntasService.getFAQByMicrosite(this.micrositio).
      subscribe(preguntas => {
        this.preguntas = preguntas;
        this.preguntasresult = preguntas;
        if (this.preguntas.length === 0) {
          this.resultadoConsulta = 'Sin preguntas frecuentes para este micrositio.';
        } else {
          // this.inicializartabla();
          this.resultadoConsulta = '';
        }
        const temasas = [];
        this.preguntas.forEach(element => {
          if (!temasas.includes(element.tema)) {
            temasas.push(element.tema);
          }
        });
        this.temas = temasas;
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  openDialog(Biblioteca) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '95%';
    dialogConfig.maxWidth = '90%';
    dialogConfig.width = '85%';
    dialogConfig.height = 'auto';
    dialogConfig.panelClass = 'contenidos-form';
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      biblioteca: Biblioteca
    };

    const dialogRef = this.dialog.open(CrearComponent, dialogConfig);
  }

  getNotification(evt) {
    this.preguntas = [];
    this.micrositio = 9999;
    this.getFrequentQuestions(null);

    // this.inicializartabla();
  }

  crear() {
    const ref = this.modalService.open(CrearComponent, { size: 'lg', centered: true });
    ref.componentInstance.notifyParent.subscribe(($e) => {
      this.getNotification($e);
    });
  }

  reloadtable(evento) {
    /*const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La pregunta ha sido creado correctamente</p>`;*/
    this.getNotification("");
  }

  editar(componente: any) {
    const ref = this.modalService.open(CrearComponent, { size: 'xl', centered: true });
    ref.componentInstance.componente = componente;
    ref.componentInstance.notifyParent.subscribe(($e) => {
      this.getNotification($e);
    });
  }

  ver(componente: any) {
    const ref = this.modalService.open(VisualizarComponent, { size: 'lg', centered: true });
    ref.componentInstance.componente = componente;
  }

  eliminar(idpregunta: any, idmicrositio: any) {
    this.idpreguntaEliminar = idpregunta;
    this.idmicrositioEliminar = idmicrositio;
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
    ref.componentInstance.message = `
      <p class="px-2"> La pregunta frecuente seleccionada y toda su información serán borradas completamente del sistema.<br>
      Por lo tanto, esta pregunta ya no estará disponible en los micrositios donde se encontraba habilitada.</p>`;
    ref.result.then(confirm => {
      if (confirm) {
        this.aceptarEliminar()
      }
    })
    //const ref = this.modalService.open(this.modaleliminar, { size: 'lg', centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  aceptarEliminar() {
    this.closeModal();
    this.preguntasService.deleteFAQDetail(this.idpreguntaEliminar).subscribe(preguntas => {
      this.getFrequentQuestions(this.idmicrositioEliminar);
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La pregunta frecuente y toda su información ha sido borrada del sistema</p>`;
    });
    this.idpreguntaEliminar = null;
    this.idmicrositioEliminar = null;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const json: any[] = [];
      let nuevoorden = 0;
      event.container.data.forEach(element => {
        json.push({
          idPreguntasFrecuentes: element.idPregunta,
          pregunta: element.pregunta,
          respuesta: element.respuesta,
          orden: nuevoorden,
          estado: element.estado,
          fechaCreacion: element.fechaCreacion,
          idUsuarioCreacion: element.fechaCreacion
        });
        nuevoorden++;
      });
      this.preguntasService.updateOrder(json).subscribe(object => { }
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  temachange() {
    if (this.temaabuscar === 'Todos los temas') {
      this.preguntasresult = this.preguntas;
    } else {
      const result = this.preguntas.filter(pregutna => pregutna.tema.toLowerCase().includes(this.temaabuscar.toLowerCase()));
      this.preguntasresult = result;
    }
  }

  buscarpor() {
    const result = this.preguntas.filter(pregutna => (
      pregutna.pregunta.toLowerCase().includes(this.buscarPor.toLowerCase()) ||
      pregutna.respuesta.toLowerCase().includes(this.buscarPor.toLowerCase()) ||
      pregutna.tema.toLowerCase().includes(this.buscarPor.toLowerCase())));
    if (result.length > 0) {
      this.preguntasresult = result;
    } else {
      this.accion = 'No se encontraron preguntas frecuentes asociadas a: ' + this.buscarPor;
      this.modalService.open(this.modalaccion, { size: 'lg', centered: true });
    }
  }

  openDialog2(texto) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.text = texto;
    modalRef.componentInstance.sioNoBoton = false;
  }

  verUtilidad() {
    this.verutilidad = this.verutilidad ? false : true;
  }

  public goTo(route) {
    localStorage.setItem('session', JSON.stringify(5))
    if (route != undefined && route != "") this.router.navigate([route]);
  }
}

import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from "angular-datatables";

// Services
import { GestionSecretariasService } from "src/app/_services/gestion-secretarias/gestion-secretarias";
import { PermisosService } from "src/app/_services/permisos/permisos.service";

// Components
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { CrearEditarComponent } from '../crear-editar/crear-editar.component';

// Models
import { DataTablesOptions } from "src/app/_shared/utils/DataTables/data-tables-options";
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  sendedData;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  data: any[] = [];

  titulo: any = [
    "información de secretarías certificadas",
    "Cargar secretaría",
    "Aquí podrá cargar, editar e inactivar las secretarías certificadas que se presentarán en la sección <strong>Quiero informarme</strong>.",
    "cargar-secretaria",
  ];

  constructor(
    private modalService: NgbModal,
    private permisosService: PermisosService,
    private gestionSecretariasService: GestionSecretariasService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.permisosService.validSession()
    .then(() => {
      this.dtOptions = DataTablesOptions.settings();
      this.consultarDatos();    
      this.spinner.hide();
    });
  }

  getPermits() {
    return this.permisosService.getPermitsUser();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
  }

  public configuration: configuration = new configuration();
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public searchConfig: searchBox = new searchBox();

  renderizar_tabla(response: any[]): void {
    this.configuration.dataToPrint = response;
    this.configuration.rowOrderData = [];
    this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
    this.emptyConfiguration.emptySearchText = "No se encontraron secretarías asociadas a ";
    this.searchConfig.minLength = 3;
    this.searchConfig.searchAttribute = `titulo + secretario`;
    var columnOne: rowOrder = new rowOrder();
    columnOne.nameInThead = "Departamento/Municipio";
    columnOne.position = 0;
    columnOne.nameInObject = `titulo`;
    columnOne.filterBy = false;
    columnOne.orderBy = false;
    columnOne.size = 50;
    columnOne.typeSize = "%";
    columnOne.borderRadius = "20px 0px 0px 0px";
    columnOne.textAlign = "space-between";
    columnOne.padding = "0px 10px 0px 10px";
    columnOne.activeIcon = true;
    columnOne.dataStatusActive = `estado`;
    columnOne.activeResultInObject = "Activo";
    columnOne.inactiveResultInObject = "Inactivo";

    var columnTwo: rowOrder = new rowOrder();
    columnTwo.nameInThead = "Nombre del secretarìa/o";
    columnTwo.position = 1;
    columnTwo.nameInObject = `secretario`;
    columnTwo.filterBy = false;
    columnTwo.orderBy = false;
    columnTwo.size = 50;
    columnTwo.typeSize = "%";
    columnTwo.borderRadius = "0px 0px 0px 0px";
    columnTwo.textAlign = "center";
    columnTwo.padding = "0px 10px 0px 10px";
    columnTwo.searchFunction = false;

    var columnThree: rowOrder = new rowOrder();
    columnThree.nameInThead = "Acción";
    columnThree.position = 2;
    columnThree.filterBy = false;
    columnThree.orderBy = false;
    columnThree.size = 20;
    columnThree.typeSize = "%";
    columnThree.borderRadius = "0px 20px 0px 0px";
    columnThree.actionRow = true;
    columnThree.buttonHeightPercent = 50;
    columnThree.flexDirection = "column";

    this.configuration.rowOrderData.push(columnOne);
    this.configuration.rowOrderData.push(columnTwo);
    this.configuration.rowOrderData.push(columnThree);
  }

  consultarDatos(): void {
    this.gestionSecretariasService.getSecretarias(1, 0)
    .subscribe((response) => {
      this.data = response;
      this.renderizar_tabla(this.data);
    });
  }

  cambiarEstado(data: any): void {
    this.spinner.show();
    const _estado = data.idEstado !== 1 ? 'Activo' : 'Inactivo';
    this.gestionSecretariasService.cambioEstado(data.idSecretaria, _estado)
      .subscribe(response => {
        this.spinner.hide();
        this.consultarDatos();
        const _mensaje: string = `La Secretaría de Educación <strong>${data.titulo}</strong> ha sido ${data.idEstado === 1 ? 'inactivada' : 'activada'} correctamente.`;
        this.openDialog(_mensaje);
      });
  }

  openDialog(mensaje: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${mensaje}</p>`;
  }

  buildAction($event) {
    switch ($event[0]) {
      case "activein":
        this.cambiarEstado($event[1]);
        break;
      case "edit":
        this.edit($event[1]);
        break;
    }
  }

  reloadtable() {
    const ref = this.modalService.open(CrearEditarComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    ref.result.then(response => {
      this.consultarDatos();
      this.openDialog(`Se ha creado y habilidato correctamente la Secretaria de Educación para ${response.entidadTerritorial}`);
    },
      (cancel) => {
      });
  }

  edit(event: any) {
    const ref = this.modalService.open(CrearEditarComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    ref.componentInstance.id = event.idSecretaria;
    ref.result.then(response => {
      this.responseServer(response, 1)
    },
    (cancel) => { });
  }

  public responseServer(response, type) {
    if (type == 1) {
      let status = "";
      (type == 1) ? status = "editado" : status = "creado";
      if (response && response.length > 0) {
        this.consultarDatos();
        this.openDialog(`Se ha ${status} la secretaria correctamente`);
      }
    }
  }

  responseServerTwo(data) {
    console.log(data);
    this.consultarDatos();
    this.openDialog(`Se ha creado y habilidato correctamente la Secretaria de Educación para ${data.depNombre}/${data.munNombre}`);
  }
}
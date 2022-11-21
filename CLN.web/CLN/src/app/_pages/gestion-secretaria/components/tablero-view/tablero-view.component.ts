import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

// Models
import { DataTablesOptions } from "src/app/_shared/utils/DataTables/data-tables-options";
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';

// Services
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { TableroService } from 'src/app/_services/gestion-secretarias/tablero.service';
import { TableroFormComponent } from '../../modals/tablero-form/tablero-form.component';
import { PermisosService } from 'src/app/_services/permisos/permisos.service';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';  

@Component({
  selector: 'app-tablero-view',
  templateUrl: './tablero-view.component.html',
  styleUrls: ['./tablero-view.component.scss']
})
export class TableroViewComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })

  sendedData;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  titulo: any = [
    'cifras del sector',
    'Cargar tablero',
    `<p>
      Aquí podrá cargar, editar y eliminar los tableros de control creados en 
      power BI y que reflejan las cifras del sector, estos tableros se presentan 
      en la sección <b>Quiero informarme</b>.
    </p>`,
    'tablero',
  ];

  tableros: any[] = [];

  constructor(
    private modalService: NgbModal,
    private permisosService: PermisosService,
    private spinner: NgxSpinnerService,
    private tableroService: TableroService
  ) {}

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

  public configuration: configuration = new configuration();
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public searchConfig: searchBox = new searchBox();

  renderizar_tabla(response: any[]): void {
    this.configuration.dataToPrint = response;
    this.configuration.rowOrderData = [];
    this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
    this.emptyConfiguration.emptySearchText = "No se encontraron tableros asociados a ";
    this.searchConfig.minLength = 3;
    this.searchConfig.searchAttribute = 'nombre + link';
    
    var columnOne: rowOrder = new rowOrder();
    columnOne.nameInThead = "Tableros";
    columnOne.position = 0;
    columnOne.nameInObject = `nombre`;
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
    columnTwo.nameInThead = 'Link';
    columnTwo.position = 1;
    columnTwo.nameInObject = `link`;
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
    this.tableroService.getBoards(1, 0)
    .subscribe((response) => {
      this.tableros = response;
      if(response == null || response.length == 0)
        this.openDialog('Aun no se han cargado tableros en el sistema');
      this.renderizar_tabla(response);
    });
  }

  buildAction($event) {
    switch ($event[0]) {
      case "activein":
        break;
      case "edit":
        this.edit($event[1]);
        break;
      case "delete":
        this.eliminar($event[1]);
        break;
      case "viewAction":
        window.open($event[1].link, '_blank');
        break;
    }
  }
  
  openDialog(mensaje: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${mensaje}</p>`;
  }

  nuevo() {
    const ref = this.modalService.open(TableroFormComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.result.then((response) => {
      this.consultarDatos();
      this.openDialog(`El tablero <b>${response[0].nombre}</b> se ha cargado correctamente`);
    }, (cancel) => {
    });
  }

  edit(event: any) {
    const ref = this.modalService.open(TableroFormComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.id = event.id;
    ref.result.then((response) => {
      this.consultarDatos();
      this.openDialog(`Los datos del tablero <b>${response[0].nombre}</b> se han actualizado correctamente`);
    }, (cancel) => {
    });
  }

  eliminar(event: any) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = 
      `El tablero <b>${event.nombre}</b> y toda su información 
       dejará de estar disponible en el sistema. 
       ¿Confirma su eliminación?`;
    ref.componentInstance.buttonContent = ["Cancelar", "Aceptar"];
    ref.result.then((response) => {
      if(response){
        this.tableroService.deleteBoard(event.id)
        .subscribe(response => {
          this.consultarDatos();
          this.openDialog(`El tablero <b>${event.nombre}</b> y toda su información ha sido borrada del sistema`);
        });
      }
    }, (cancel) => { });
  }

  responseServerTwo(data) {
    console.log(data);
    this.consultarDatos();
    this.openDialog(`El tablero <b>${data[0].nombre}</b> se ha cargado correctamente`);
  }
}
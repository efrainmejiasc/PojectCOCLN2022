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
import { Router } from '@angular/router';

// Services
import { ContenidoService } from "src/app/_services/gestor-contenidos/contenido.service";
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
// Components
import { ContenidosEditComponent } from "../../modals/contenidos-edit/contenidos-edit.component";
import { ConfirmacionComponent } from "../../modals/confirmacion/confirmacion.component";

import { Contenido } from "src/app/_model/contenidos/contenido.model";
import { DataTablesOptions } from "src/app/_shared/utils/DataTables/data-tables-options";
import { DataTableDirective } from "angular-datatables";

// Model
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';

import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { ConfirmationModalComponent } from "src/app/_shared/modals/confirmation-modal/confirmation-modal.component";


declare var $: any;
@Component({
  selector: "app-contenidos",
  templateUrl: "./contenidos.component.html",
  styleUrls: [
    "./../../shared/styles/tables.scss",
    "./contenidos.component.scss",
  ],
})
export class ContenidosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  a = 0;
  contenidos: Contenido[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Contenido> = new Subject();
  crear = {
    Listo: 0,
    Cargar: 0,
    Editar: 0,
    Eliminar: 0,
    Habilitar: 0,
  };
  titulo: any = [
    "contenidos",
    "Cargar contenido",
    "Aquí podrá cargar, editar, consultar y eliminar contenidos.",
    "button-Agregar",
  ];

  constructor(
    private modalService: NgbModal,
    private contenidoService: ContenidoService,
    private gestorRolesService: GestorRolesService,
    private router: Router,
    private permitService: PermitServiceService,
    private auth: AuthenticationService,
    private spinner: NgxSpinnerService,
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.validSession();
  }

  userlogged: any;
  protected validSession() {
    this.spinner.show();
    if (localStorage.getItem("session") != undefined) {
      var menuItem = localStorage.getItem("session");
      localStorage.removeItem("session");
      this.permitsAnalitics(menuItem);
    } else {
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
      });
    }
  }

  private messageAlertError: string = "No hemos podido resolver tu solicitud, por favor vuelve a intentarlo"
  public permitsUser: permitsUserFetch = new permitsUserFetch();
  protected permitsAnalitics(item) {
    this.gestorRolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          //Inicializar componente
          this.dtOptions = DataTablesOptions.settings();
          this.fecthContenido();
        } else {
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
          });
        }
      }, error => {
        this.alert(this.messageAlertError);
        this.auth.actualUser$.subscribe((data) => {
          this.userlogged = data;
          (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
        });
      })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  public configuration: configuration = new configuration();
  private masterFilter: Array<any>;
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public searchConfig: searchBox = new searchBox();
  fecthContenido(dtInstance?) {
    this.contenidoService.getContent(1, 0).subscribe((response) => {
      this.contenidos = response;
      this.configuration.dataToPrint = response;
      this.configuration.rowOrderData = [];
      this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
      this.emptyConfiguration.emptySearchText = "No se encontraron bibliotecas asociadas a ";
      this.searchConfig.minLength = 3;
      this.searchConfig.searchAttribute = `Biblioteca + Temas + NombreContenido + Micrositios`
      var columnOne: rowOrder = new rowOrder();
      columnOne.nameInThead = "Biblioteca";
      columnOne.position = 0;
      columnOne.nameInObject = `Biblioteca`;
      columnOne.filterBy = false;
      columnOne.orderBy = true;
      columnOne.size = 17;
      columnOne.typeSize = "%";
      columnOne.borderRadius = "20px 0px 0px 0px";
      columnOne.textAlign = "center";
      columnOne.padding = "0px 10px 0px 10px";
      columnOne.searchFunction = true;
      var columnTwo: rowOrder = new rowOrder();
      columnTwo.nameInThead = "Tema";
      columnTwo.position = 1;
      columnTwo.nameInObject = `Temas`;
      columnTwo.nameInObjectArray = "tema";
      columnTwo.filterBy = false;
      columnTwo.orderBy = true;
      columnTwo.size = 20;
      columnTwo.typeSize = "%";
      columnTwo.borderRadius = "0px 0px 0px 0px";
      columnTwo.textAlign = "space-between";
      columnTwo.horizontalAlign = "flex-start";
      columnTwo.padding = "10px";
      columnTwo.activeIconArray = true;
      columnTwo.activeIconArrayName = "estado"
      columnTwo.activeResultInObject = "Activo";
      columnTwo.inactiveResultInObject = "Inactivo";
      columnTwo.searchFunction = true;
      columnTwo.arrayContent = true;
      var columnThree: rowOrder = new rowOrder();
      columnThree.nameInThead = "Nombre del contenido";
      columnThree.position = 2;
      columnThree.nameInObject = `NombreContenido`;
      columnThree.filterBy = false;
      columnThree.orderBy = true;
      columnThree.size = 23;
      columnThree.typeSize = "%";
      columnThree.borderRadius = "0px 0px 0px 0px";
      columnThree.textAlign = "center";
      columnThree.padding = "0px 10px 0px 10px";
      columnThree.searchFunction = true;
      var columnFour: rowOrder = new rowOrder();
      columnFour.nameInThead = "Micrositios donde está publicado";
      columnFour.position = 3;
      columnFour.nameInObject = `Micrositios`;
      columnFour.nameInObjectArray = "nombre";
      columnFour.filterBy = false;
      columnFour.orderBy = true;
      columnFour.size = 30;
      columnFour.typeSize = "%";
      columnFour.borderRadius = "0px 0px 0px 0px";
      columnFour.textAlign = "space-between";
      columnFour.horizontalAlign = "flex-start";
      columnFour.padding = "0px 10px 0px 10px";
      columnFour.searchFunction = true;
      columnFour.arrayContent = true;
      var columnFive: rowOrder = new rowOrder();
      columnFive.nameInThead = "Acción";
      columnFive.position = 4;
      columnFive.filterBy = false;
      columnFive.flexDirection = "column";
      columnFive.orderBy = false;
      columnFive.size = 10;
      columnFive.typeSize = "%";
      columnFive.borderRadius = "0px 20px 0px 0px";
      columnFive.actionRow = true;
      columnFive.buttonHeightPercent = 50;
      this.configuration.rowOrderData.push(columnOne);
      this.configuration.rowOrderData.push(columnTwo);
      this.configuration.rowOrderData.push(columnThree);
      this.configuration.rowOrderData.push(columnFour);
      this.configuration.rowOrderData.push(columnFive);
      this.spinner.hide();
    });
  }

  eliminar(contenido) {
    let mensaje = "El contenido <b>" + contenido.NombreContenido + "</b> y toda su información será borrada completamente del sistema";
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${mensaje}</p>`;
    ref.componentInstance.buttonContent = ["Cancelar", "Aceptar"];
    ref.result.then(result => {
      if(result) {
        this.contenidoService
        .deleteContent(contenido.idContenido)
        .subscribe((element) => {
          this.reloadtable();
          this.alert("El contenido <b>" + contenido.NombreContenido + "</b> y toda su información ha sido borrada del sistema");
        });
      }
    }),
    (cancel) => { }
  }

  openDialog(contenido: Contenido) {
    this.contenidoService
      .getContentDetail(contenido.idContenido)
      .subscribe((contenidoDetail) => {
        const ref = this.modalService.open(ContenidosEditComponent, {
          size: "xl",
          centered: true,
          backdrop: "static",
          keyboard: false,
        });
        ref.componentInstance.contenido = contenidoDetail[0];
        ref.result.then(
          (yes) => {
            this.alert("El contenido <b>" + contenido.NombreContenido + "</b> ha sido actualizado correctamente");
            this.reloadtable();
          },
          (cancel) => { }
        );
      });
  }

  reloadtable() {
    /*this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();*/
    this.fecthContenido();
    //});
  }

  render(
    first: string,
    bold: string,
    third: string,
    buttons: Array<model>,
    contenido?
  ): any {
    const ref = this.modalService.open(ConfirmacionComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
    ref.componentInstance.message[0] = first;
    ref.componentInstance.message[1] = bold;
    ref.componentInstance.message[2] = third;
    ref.componentInstance.buttons = buttons;

    ref.result.then(
      (action) => {
        switch (action) {
          case "accept And refresh":
            this.reloadtable();
            break;
          case "accept":
            this.contenidoService
              .deleteContent(contenido.idContenido)
              .subscribe((element) => {
                this.alert("El contenido <b>" + contenido.NombreContenido + "</b> y toda su información ha sido borrada del sistema");
              });
            break;
          default:
            break;
        }
      },
      (cancel) => { }
    );
  }
  buildAction($event) {
    switch ($event[0]) {
      case "edit":
        this.openDialog($event[1]);
        break;
      case "delete":
        this.eliminar($event[1]);
        break;
    }
  }

  alert(mensaje: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${mensaje}</p>`;
  }
}

class model {
  class: string;
  messsage: string;
  action: string;
}

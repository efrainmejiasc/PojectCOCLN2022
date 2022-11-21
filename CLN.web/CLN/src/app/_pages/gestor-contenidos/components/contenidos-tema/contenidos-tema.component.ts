import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables"; /* Borrar */

import { DataTablesOptions } from "src/app/_shared/utils/DataTables/data-tables-options";
import { TemasService } from "src/app/_services/gestor-contenidos/temas.service";
import { Tema } from "src/app/_model/contenidos/tema.model";
import { TemasEditComponent } from "../../modals/temas-edit/temas-edit.component";
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmacionComponent } from "../../modals/confirmacion/confirmacion.component";
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { Router } from '@angular/router';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-contenidos-tema",
  templateUrl: "./contenidos-tema.component.html",
  styleUrls: [
    "./../../shared/styles/tables.scss",
    "./contenidos-tema.component.scss",
  ],
})
export class ContenidosTemaComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized = false;

  temas: Tema[] = [];
  tema: Tema;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Tema> = new Subject();
  crear = {
    Listo: 0,
    Crear: 0,
    Editar: 0,
    Eliminar: 0,
    Habilitar: 0,
  };
  titulo: any = [
    "temas",
    "Crear tema",
    "Aquí podrá crear, editar, activar, inactivar y consultar temas",
    "button-Agregar",
  ];;


  constructor(
    private temasService: TemasService,
    public connectService: HttpClient,
    private modalService: NgbModal,
    private gestorRolesService: GestorRolesService,
    private router: Router,
    private permitService: PermitServiceService,
    private auth: AuthenticationService,
    private spinner: NgxSpinnerService,
  ) { }

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

  private messageAlertError: String = "No hemos podido resolver tu solicitud, por favor vuelve a intentarlo"
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
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${this.messageAlertError}</p>`;
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
  /*getPermisos() {
    let idItem = parseInt(localStorage.getItem('session'));
    this.gestorRolesService.getPermitsComponent(idItem)
      .subscribe(res => {
        this.crear = this.GenerateArrayPermissions(res);
        let temp = [
          "temas",
          "Crear tema",
          "Aquí podrá crear, editar, activar, inactivar y consultar temas",
        ];
        this.crear['Crear'] == 1 ? temp.push("button-Agregar") : '';
        this.titulo = temp;
      })
  }
  GenerateArrayPermissions(res) {
    let crear = {
      Listo: 0,
      Crear: 0,
      Editar: 0,
      Eliminar: 0,
      Habilitar: 0,
    };
    for (const permisoHere in crear) {
      for (const permisoThere of res) {
        (permisoThere['permiso'].includes(permisoHere)) ? crear[permisoHere] = 1 : '';
      }
    }

    crear['Listo'] = 1;
    return crear;
  }*/
  public configuration: configuration = new configuration();
  private masterFilter: Array<any>;
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public searchConfig: searchBox = new searchBox();
  fecthContenido() {
    this.temasService.getTopics(1, 0).subscribe((response) => {
      this.temas = response;
      this.configuration.dataToPrint = response;
      this.configuration.rowOrderData = [];
      this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
      this.emptyConfiguration.emptySearchText = "No se encontraron temas asociadas a ";
      this.searchConfig.minLength = 3;
      this.searchConfig.searchAttribute = `descripcion`
      var columnOne: rowOrder = new rowOrder();
      columnOne.nameInThead = "Tema";
      columnOne.position = 0;
      columnOne.nameInObject = `descripcion`;
      columnOne.filterBy = false;
      columnOne.orderBy = true;
      columnOne.size = 85;
      columnOne.typeSize = "%";
      columnOne.borderRadius = "20px 0px 0px 0px";
      columnOne.textAlign = "space-between";
      columnOne.padding = "0px 10px 0px 10px";
      columnOne.activeIcon = true;
      columnOne.dataStatusActive = `estado`;
      columnOne.activeResultInObject = "Activo";
      columnOne.inactiveResultInObject = "Inactivo";
      var columnTwo: rowOrder = new rowOrder();
      columnTwo.nameInThead = "Acción";
      columnTwo.position = 5;
      columnTwo.filterBy = false;
      columnTwo.flexDirection = "column";
      columnTwo.orderBy = false;
      columnTwo.size = 15;
      columnTwo.typeSize = "%";
      columnTwo.borderRadius = "0px 20px 0px 0px";
      columnTwo.actionRow = true;
      columnTwo.buttonHeightPercent = 50;
      this.configuration.rowOrderData.push(columnOne);
      this.configuration.rowOrderData.push(columnTwo);
      this.spinner.hide();
      /*this.temas = response;
      this.dtTrigger.next();*/
    });
  }

  enableDisableTopic(tema: any) {
    for (const newtema of this.temas) {
      if (newtema === tema) {
        this.temasService
          .enableDisableTopic(
            tema.idTema,
            newtema.estado === "Activo" ? "Inactivo" : "Activo"
          )
          .subscribe((element) => {
            let buttons: Array<model> = [];
            let first = "El tema ";
            let bold = newtema.descripcion;
            let third =
              newtema.estado === "Activo"
                ? "se ha desactivado correctamente"
                : "se ha activado correctamente";
            buttons[0] = {
              class: "modal-button modal-button-primary",
              messsage: "Cerrar",
              action: "cancel",
            };
            this.render(first, bold, third, buttons);
            this.fecthContenido();
          });
      }
    }
  }

  openDialog(tema: Tema) {
    const ref = this.modalService.open(TemasEditComponent, {
      size: "lg",
      centered: true,
    });
    ref.componentInstance.tema = tema;

    ref.result.then(
      (yes) => {
        let buttons: Array<model> = [];
        let first = "El tema ";
        let bold = tema.descripcion;
        let third = "ha sido editado correctamente";
        buttons[0] = {
          class: "modal-button modal-button-primary",
          messsage: "Cerrar",
          action: "cancel",
        };
        this.render(first, bold, third, buttons);
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }

  reloadtable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.fecthContenido();
    });
  }

  render(first: string, bold: string, third: string, buttons: Array<model>): void {
    const ref = this.modalService.open(ConfirmacionComponent, {
      size: "lg",
      centered: true,
    });
    ref.componentInstance.message[0] = first;
    ref.componentInstance.message[1] = bold;
    ref.componentInstance.message[2] = third;
    ref.componentInstance.buttons = buttons;

    ref.result.then(
      (yes) => {
        this.reloadtable();
      },
      (cancel) => {
        console.log("Cancel Click");
      }
    );
  }
  buildAction($event) {
    switch ($event[0]) {
      case "edit":
        this.openDialog($event[1]);
        break;
      case "activein":
        this.enableDisableTopic($event[1]);
        break;
    }
  }
}
class model {
  class: string;
  messsage: string;
  action: string;
}

import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";

import { Biblioteca } from "src/app/_model/contenidos/biblioteca.model";
import { BibliotecasEditComponent } from "../../modals/bibliotecas-edit/bibliotecas-edit.component";
import { BibliotecaService } from "src/app/_services/gestor-contenidos/biblioteca.service";
import { DataTablesOptions } from "src/app/_shared/utils/DataTables/data-tables-options";
import { DataTableDirective } from "angular-datatables";
import { ConfirmacionComponent } from "../../modals/confirmacion/confirmacion.component";
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { Router } from '@angular/router';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { ViewHtmlComponent } from 'src/app/_shared/modals/view-html/view-html.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-contenidos-biblioteca",
  templateUrl: "./contenidos-biblioteca.component.html",
  styleUrls: [
    "./../../shared/styles/tables.scss",
    "./contenidos-biblioteca.component.scss",
  ],
})
export class ContenidosBibliotecaComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  bibliotecas: Biblioteca[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Biblioteca> = new Subject();
  crear = {
    Listo: 0,
    Crear: 0,
    Editar: 0,
    Eliminar: 0,
    Habilitar: 0,
  };
  titulo: any = [
    "bibliotecas",
    "Crear biblioteca",
    "Aquí podrá crear, editar, activar e inactivar bibliotecas",
    "button-Agregar",
  ];;

  constructor(
    private bibliotecaService: BibliotecaService,
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

  public configuration: configuration = new configuration();
  private masterFilter: Array<any>;
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public searchConfig: searchBox = new searchBox();
  fecthContenido() {
    this.bibliotecaService.getLibraries(1, 0).subscribe((response) => {
      this.bibliotecas = response;
      this.configuration.dataToPrint = response;
      this.configuration.rowOrderData = [];
      this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
      this.emptyConfiguration.emptySearchText = "No se encontraron bibliotecas asociadas a ";
      this.searchConfig.minLength = 3;
      this.searchConfig.searchAttribute = `nombre`
      var columnOne: rowOrder = new rowOrder();
      columnOne.nameInThead = "Biblioteca";
      columnOne.position = 0;
      columnOne.nameInObject = `nombre`;
      columnOne.filterBy = false;
      columnOne.orderBy = true;
      columnOne.size = 40;
      columnOne.typeSize = "%";
      columnOne.borderRadius = "20px 0px 0px 0px";
      columnOne.textAlign = "space-between";
      columnOne.padding = "0px 10px 0px 10px";
      columnOne.activeIcon = true;
      columnOne.dataStatusActive = `estado`;
      columnOne.activeResultInObject = "Activo";
      columnOne.inactiveResultInObject = "Inactivo";
      var columnTwo: rowOrder = new rowOrder();
      columnTwo.nameInThead = "Tipo de Biblioteca";
      columnTwo.position = 1;
      columnTwo.nameInObject = `Tipo`;
      columnTwo.filterBy = false;
      columnTwo.orderBy = false;
      columnTwo.size = 25;
      columnTwo.typeSize = "%";
      columnTwo.borderRadius = "0px 0px 0px 0px";
      columnTwo.textAlign = "flex-start";
      columnTwo.padding = "0px 0px 0px 10px";
      var columnThree: rowOrder = new rowOrder();
      columnThree.nameInThead = "Habilitada para";
      columnThree.position = 2;
      columnThree.nameInObject = ``;
      columnThree.filterBy = false;
      columnThree.orderBy = false;
      columnThree.size = 25;
      columnThree.typeSize = "%";
      columnThree.borderRadius = "0px 0px 0px 0px";
      columnThree.padding = "0px 0px 0px 10px";
      columnThree.viewIcon = true;
      var columnFour: rowOrder = new rowOrder();
      columnFour.nameInThead = "Acción";
      columnFour.position = 5;
      columnFour.filterBy = false;
      columnFour.flexDirection = "column";
      columnFour.orderBy = false;
      columnFour.size = 10;
      columnFour.typeSize = "%";
      columnFour.borderRadius = "0px 20px 0px 0px";
      columnFour.actionRow = true;
      columnFour.buttonHeightPercent = 50;
      this.configuration.rowOrderData.push(columnOne);
      this.configuration.rowOrderData.push(columnTwo);
      this.configuration.rowOrderData.push(columnThree);
      this.configuration.rowOrderData.push(columnFour);
      this.spinner.hide();
      //this.dtTrigger.next();
    });
  }

  openDialog(biblioteca: Biblioteca) {
    const ref = this.modalService.open(BibliotecasEditComponent, {
      size: "lg",
      centered: true,
    });
    ref.componentInstance.biblioteca = biblioteca;
    ref.result.then(
      (yes) => {
        let buttons: Array<model> = [];
        let first = "Los datos de la Biblioteca ";
        let bold = biblioteca.nombre;
        let third = "han sido actualizados correctamente";
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

  enableDisableTopic(biblioteca) {
    for (let NBiblioteca of this.bibliotecas) {
      if (NBiblioteca.idBiblioteca === biblioteca.idBiblioteca) {
        this.bibliotecaService
          .enableDisableLibrary(
            NBiblioteca.idBiblioteca,
            NBiblioteca.estado === "Activo" ? "Inactivo" : "Activo"
          )
          .subscribe((element) => {
            let buttons: Array<model> = [];
            let first = "La biblioteca ";
            let bold = NBiblioteca.nombre;
            let third =
              NBiblioteca.estado === "Activo"
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
  reloadtable() {
    /*this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });*/
    console.log("QUIERE RECARGAR LA TABLITAAA")
    this.fecthContenido();
  }
  render(
    first: string,
    bold: string,
    third: string,
    buttons: Array<model>
  ): void {
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
  public viewDescription(content: any) {
    const dialogRef = this.modalService.open(ViewHtmlComponent, {
      centered: true,
      backdrop: false,
      keyboard: false
    });
    dialogRef.componentInstance.message = content.descripcion;
    dialogRef.componentInstance.sendedData = "Ver Descripción"
  }
  buildAction($event) {
    console.group("DATA EVENT")
    console.log($event[0]);
    console.groupEnd();
    switch ($event[0]) {
      case "viewHTML":
        console.log($event[1])
        this.viewDescription($event[1])
        break;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { GestionCapacidadesService } from 'src/app/_services/gestion-capacidades/gestion-capacidades.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { ViewHtmlComponent } from 'src/app/_shared/modals/view-html/view-html.component';
import { CrearCapacidadComponent } from '../../Modals/crear-capacidad/crear-capacidad.component';

@Component({
  selector: 'app-capacidades',
  templateUrl: './capacidades.component.html',
  styleUrls: ['./capacidades.component.scss']
})
export class CapacidadesComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router,
    private auth: AuthenticationService,
    private rolesService: GestorRolesService,
    private permitService: PermitServiceService,
    private capacidadesService: GestionCapacidadesService
  ) { }
  titulo = [
    "Gestionar capacidades y afirmaciones",
    "Crear capacidad y afirmación",
    "Aquí podrá crear, editar, activar e inactivar las capacidades y afirmaciones que se requieren utilizar en el módulo de autodiagnóstico y en otros módulos de la plataforma.",
    "button-capacidades",
  ];
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
      //this.permitsAnalitics(1);
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
      });
    }
  }
  private messageAlertError: String = "No hemos podido resolver tu solicitud, por favor vuelve a intentarlo"
  public permitsUser: permitsUserFetch = new permitsUserFetch();
  public arrPermits: Array<String> = ["crear", "editar", "eliminar", "habilitar"];
  protected permitsAnalitics(item) {
    this.rolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          this.permitsUser.canCreate = true;
          //Inicializar componente
          this.getCapacidades();
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
  public reloadtable(e) {
    this.getCapacidades();
  }
  public configuration: configuration = new configuration();
  private masterFilter: Array<any>;
  public searchConfig: searchBox = new searchBox();
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  private getCapacidades() {
    this.capacidadesService.getCapacidades()
      .subscribe(data => {
        this.configuration.rowOrderData = [];
        this.configuration.dataToPrint = data;
        this.searchConfig.minLength = 3;
        this.searchConfig.searchAttribute = `nombre+tipoCapacidad+capacidadPadre`
        this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
        this.emptyConfiguration.emptySearchText = "No se encontraron capacidades asociadas a ";
        var columnOne: rowOrder = new rowOrder();
        columnOne.nameInThead = "Capacidad orientadora";
        columnOne.position = 0;
        columnOne.nameInObject = "capacidadPadre";
        columnOne.filterBy = false;
        columnOne.orderBy = false;
        columnOne.size = 24;
        columnOne.typeSize = "%";
        columnOne.borderRadius = "20px 0px 0px 0px";
        columnOne.textAlign = "flex-start";
        columnOne.padding = "0px 0px 0px 10px";
        var columnTwo: rowOrder = new rowOrder();
        columnTwo.nameInThead = "Tipo de capacidad";
        columnTwo.position = 1;
        columnTwo.nameInObject = "tipoCapacidad";
        columnTwo.filterBy = true;
        columnTwo.orderBy = false;
        columnTwo.size = 19;
        columnTwo.typeSize = "%";
        columnTwo.borderRadius = "0px 0px 0px 0px";
        columnTwo.textAlign = "flex-start";
        columnTwo.padding = "0px 0px 0px 10px";
        var columnThree: rowOrder = new rowOrder();
        columnThree.nameInThead = "Capacidad";
        columnThree.position = 2;
        columnThree.nameInObject = "nombre";
        columnThree.filterBy = false;
        columnThree.orderBy = true;
        columnThree.size = 30;
        columnThree.typeSize = "%";
        columnThree.borderRadius = "0px 0px 0px 0px";
        columnThree.textAlign = "space-between";
        columnThree.padding = "10px";
        columnThree.activeIcon = true;
        columnThree.dataStatusActive = `estado`;
        columnThree.activeResultInObject = "Activo";
        columnThree.inactiveResultInObject = "Inactivo";
        columnThree.horizontalAlign = "flex-start";
        var columnFour: rowOrder = new rowOrder();
        columnFour.nameInThead = "Afirmación";
        columnFour.position = 2;
        columnFour.nameInObject = ``;
        columnFour.filterBy = false;
        columnFour.orderBy = false;
        columnFour.size = 15;
        columnFour.typeSize = "%";
        columnFour.borderRadius = "0px 0px 0px 0px";
        columnFour.padding = "0px 0px 0px 10px";
        columnFour.viewIcon = true;
        var columnFive: rowOrder = new rowOrder();
        columnFive.nameInThead = "Acción";
        columnFive.position = 5;
        columnFive.filterBy = false;
        columnFive.flexDirection = "column";
        columnFive.textAlign = "center";
        columnFive.horizontalAlign = "center";
        columnFive.orderBy = false;
        columnFive.size = 12;
        columnFive.typeSize = "%";
        columnFive.borderRadius = "0px 20px 0px 0px";
        columnFive.padding = "0px";
        columnFive.actionRow = true;
        columnFive.buttonHeightPercent = 50;
        this.configuration.rowOrderData.push(columnOne);
        this.configuration.rowOrderData.push(columnTwo);
        this.configuration.rowOrderData.push(columnThree);
        this.configuration.rowOrderData.push(columnFour);
        this.configuration.rowOrderData.push(columnFive);
        this.spinner.hide();
      })
  }

  public viewDescription(content: any) {
    const dialogRef = this.modalService.open(ViewHtmlComponent, {
      centered: true,
      backdrop: false,
      keyboard: false
    });
    dialogRef.componentInstance.message = content.afirmacion;
    dialogRef.componentInstance.sendedData = "Ver Descripción"
  }

  openDialog(capacidad) {
    const dialogRef = this.modalService.open(CrearCapacidadComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    dialogRef.componentInstance.sendedData = "Editar capacidad y afirmación";
    dialogRef.componentInstance.dataReciber = JSON.stringify(capacidad);
    dialogRef.result.then((yes) => {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La información asociada a la capacidad y/o afirmación, ha sido actualizada correctamente</p>`;
      this.getCapacidades();
    })
  }

  public enableDisableCapacidad(capacidad) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    var action: String = "";
    var actionT: String = "";
    (capacidad.estado == "Activo") ? action = "inactivar" : action = "activar";
    (capacidad.estado == "Activo") ? actionT = "inactiva" : actionT = "activa";
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
    ref.componentInstance.message = `
      <p class="px-2" style="width:100%;word-wrap: break-word; overflow:hidden;">¿Está seguro de ${action} la capacidad: ${capacidad.nombre}? Recuerde que, al ${action} la capacidad, automáticamente quedará ${actionT} su afirmación correspondiente.”</p>`;
    ref.result.then(confirm => {
      if (confirm) {
        this.capacidadesService.enableDisableAbility(capacidad.id, (capacidad.estado == "Activo") ? "Inactivo" : action = "Activo")
          .subscribe(data => {
            if (data) {
              this.getCapacidades();
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              var result: String = "";
              (capacidad.estado == "Activo") ? result = "inactivardo" : result = "activado";
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La capacidad se ha ${result} correctamente</p>`;

            }
          })
      }
    })
  }

  buildAction($event) {
    switch ($event[0]) {
      case "viewHTML":
        this.viewDescription($event[1])
        break;
      case "edit":
        this.openDialog($event[1]);
        break;
      case "activein":
        this.enableDisableCapacidad($event[1]);
        break;
    }
  }
}

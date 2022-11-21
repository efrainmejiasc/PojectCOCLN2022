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
import { GestionReportesService } from 'src/app/_services/gestion-reportes/gestion-reportes.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { ReportesComponent } from '../../Modals/reportes/reportes.component';

@Component({
  selector: 'app-gestion-reportes',
  templateUrl: './gestion-reportes.component.html',
  styleUrls: ['./gestion-reportes.component.scss']
})
export class GestionReportesComponent implements OnInit {

  constructor(
    private rolesService: GestorRolesService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private reportService: GestionReportesService,
    private permitService: PermitServiceService)
  { }

  titulo = [
    "Gestionar reportes",
    "Cargar reporte/consulta/tablero",
    "Aquí podrá gestionar los reportes/consultas/tableros creados en Power BI.",
    "button-reports",
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
          //Inicializar componente
          this.getReports();
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

  public configuration: configuration = new configuration();
  private masterFilter: Array<any>;
  public searchConfig: searchBox = new searchBox();
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();

  public getReports() {
    this.reportService.getReports()
      .subscribe(data => {
        this.configuration.rowOrderData = [];
        this.configuration.dataToPrint = data;
        this.searchConfig.minLength = 3;
        this.searchConfig.searchAttribute = `nombre+descripcion+roles`
        var columnOne: rowOrder = new rowOrder();
        this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
        this.emptyConfiguration.emptySearchText = "No se encontraron reportes, consultas o tableros asociados a ";
        columnOne.nameInThead = "Nombre";
        columnOne.position = 0;
        columnOne.nameInObject = "nombre";
        columnOne.filterBy = false;
        columnOne.orderBy = true;
        columnOne.size = 25;
        columnOne.typeSize = "%";
        columnOne.borderRadius = "20px 0px 0px 0px";
        columnOne.textAlign = "flex-start";
        columnOne.padding = "0px 0px 0px 10px";
        var columnTwo: rowOrder = new rowOrder();
        columnTwo.nameInThead = "Descripción";
        columnTwo.position = 1;
        columnTwo.nameInObject = "descripcion";
        columnTwo.filterBy = false;
        columnTwo.orderBy = false;
        columnTwo.size = 30;
        columnTwo.typeSize = "%";
        columnTwo.borderRadius = "0px 0px 0px 0px";
        columnTwo.textAlign = "flex-start";
        columnTwo.padding = "0px 0px 0px 10px";
        var columnThree: rowOrder = new rowOrder();
        columnThree.nameInThead = "Rol autorizado";
        columnThree.position = 2;
        columnThree.nameInObject = "roles";
        columnThree.filterBy = false;
        columnThree.orderBy = false;
        columnThree.size = 25;
        columnThree.typeSize = "%";
        columnThree.borderRadius = "0px 0px 0px 0px";
        columnThree.textAlign = "flex-start";
        columnThree.padding = "0px 0px 0px 10px";
        var columnFourth: rowOrder = new rowOrder();
        columnFourth.nameInThead = "Acción";
        columnFourth.position = 3;
        columnFourth.filterBy = false;
        columnFourth.orderBy = false;
        columnFourth.size = 20;
        columnFourth.typeSize = "%";
        columnFourth.borderRadius = "0px 20px 0px 0px";
        columnFourth.actionRow = true;
        columnFourth.buttonHeightPercent = 33;
        columnFourth.flexDirection = "column";
        this.configuration.rowOrderData.push(columnOne);
        this.configuration.rowOrderData.push(columnTwo);
        this.configuration.rowOrderData.push(columnThree);
        this.configuration.rowOrderData.push(columnFourth);
      })
    this.spinner.hide();
  }

  openDialog(reporte: any) {
    const dialogRef = this.modalService.open(ReportesComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    dialogRef.componentInstance.sendedData = "Editar reportes";
    dialogRef.componentInstance.dataReciber = JSON.stringify(reporte);
    dialogRef.result.then((yes) => {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      switch (yes) {
        case 'no-roles':
          ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>No existen roles con permisos en Reportes</p>`;
          break;
        default:
          ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El reporte/consulta/tablero <b>${yes[0]}</b> ha sido actualizada correctamente</p>`;
          this.getReports();
          break;
      }

    },
      (cancel) => { });
  }

  reloadtable(status: any) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    switch (status) {
      case "no-roles":
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>No hay roles de usuario habilitados para esta funcionalidad.<br/>Para habilitar los roles, es necesario ir al módulo de Roles y permisos y asignar el permiso “Ver y descargar reportes” para cada uno de los roles que visualizarán los reportes, consultas o tableros que se van a cargar.</p>`;
        break;
      default:
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El reporte/consulta/tablero <b>${status[0]}</b> ha sido cargado correctamente</p>`;
        this.getReports();
        break;
    }
  }

  deleteReport(report) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
    ref.componentInstance.message = `
      <p class="px-2">El reporte/consulta/tablero seleccionado y toda su información dejará de estar disponible en el sistema. ¿Confirma su eliminación?</p>`;
    ref.result.then(confirm => {
      if (confirm) {
        this.reportService.deleteReport(report.id)
          .subscribe(data => {
            if (data == "OK") {
              this.getReports();
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El reporte/consulta/tablero <b>${report.nombre}</b> y toda su información ha sido borrada del sistema</p>`;
            } else {
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El reporte/consulta/tablero <b>${report.nombre}</b> y toda su información ha sido borrada del sistema</p>`;
            }
          })
      }
    });
  }

  buildAction($event) {
    switch ($event[0]) {
      case "view":
        this.openDialog($event[1]);
        break;
      case "edit":
        this.openDialog($event[1]);
        break;
      case "delete":
        this.deleteReport($event[1]);
        break;
      case "viewAction":
        this.router.navigate([]).then(result => { window.open(`gestionreportes/report/${$event[1].id}`, '_blank'); });
        break;
    }
  }
}

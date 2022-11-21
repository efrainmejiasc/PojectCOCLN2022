import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { pbibody } from 'src/app/_model/reports/pbibody.model';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { GestionReportesService } from 'src/app/_services/gestion-reportes/gestion-reportes.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import * as pbi from 'powerbi-client';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';

@Component({
  selector: 'app-ver-reportes',
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.scss']
})
export class VerReportesComponent implements OnInit {

  constructor(
    private rolesService: GestorRolesService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private reportService: GestionReportesService,
    private permitService: PermitServiceService,) { }

  titulo = [
    "Consultar reportes, consultas y tableros",
    "Crear reporte",
    "Aquí podrá visualizar los reportes, consultas y/o tableros creados en Power BI.",
    "",
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
    this.reportService.getReportsByRol()
      .subscribe(data => {
        this.configuration.rowOrderData = [];
        this.configuration.dataToPrint = data;
        this.searchConfig.minLength = 3;
        this.searchConfig.searchAttribute = `nombre + descripcion + roles`
        this.emptyConfiguration.emptyContentText = "No tiene reportes asignados, póngase en contacto con el administrador para solicitar acceso a los reportes que podrá visualizar.";
        this.emptyConfiguration.emptySearchText = "No se encontraron reportes, consultas o tableros asociados a ";
        var columnOne: rowOrder = new rowOrder();
        columnOne.nameInThead = "Nombre";
        columnOne.position = 0;
        columnOne.nameInObject = "nombre";
        columnOne.filterBy = false;
        columnOne.orderBy = true;
        columnOne.size = 34;
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
        columnTwo.size = 34;
        columnTwo.typeSize = "%";
        columnTwo.borderRadius = "0px 0px 0px 0px";
        columnTwo.textAlign = "flex-start";
        columnTwo.padding = "0px 0px 0px 10px";
        var columnThree: rowOrder = new rowOrder();
        columnThree.nameInThead = "Acción";
        columnThree.position = 3;
        columnThree.filterBy = false;
        columnThree.orderBy = false;
        columnThree.size = 34;
        columnThree.typeSize = "%";
        columnThree.borderRadius = "0px 20px 0px 0px";
        columnThree.actionRow = true;
        columnThree.buttonHeightPercent = 50;
        columnThree.flexDirection = "column";
        columnThree.viewIcon = true;
        this.configuration.rowOrderData.push(columnOne);
        this.configuration.rowOrderData.push(columnTwo);
        this.configuration.rowOrderData.push(columnThree);
      })
    this.spinner.hide();
  }

  buildAction($event) {
    switch ($event[0]) {
      case "viewAction":
        this.router.navigate([]).then(result => { window.open(`gestionreportes/report/${$event[1].id}`, '_blank'); });
        break;
    }
  }



}

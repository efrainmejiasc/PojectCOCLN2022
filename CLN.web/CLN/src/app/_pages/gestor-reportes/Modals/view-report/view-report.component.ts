import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pbibody } from 'src/app/_model/reports/pbibody.model';
import { GestionReportesService } from 'src/app/_services/gestion-reportes/gestion-reportes.service';
import * as pbi from 'powerbi-client';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  constructor(
    private _Activatedroute: ActivatedRoute,
    private rolesService: GestorRolesService,
    private reportesService: GestionReportesService,
    private router: Router,
    private auth: AuthenticationService,
    private permitService: PermitServiceService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) { }
  private idGet: number;
  public screenHeight: number;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;
  private messageAlertError: String = "No hemos podido resolver tu solicitud, por favor vuelve a intentarlo"
  public permitsUser: permitsUserFetch = new permitsUserFetch();
  public arrPermits: Array<String> = ["crear", "editar", "eliminar", "habilitar"];
  userlogged: any;
  private textErrorPBI: String = "Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. ¡Muchas gracias!";
  public reportContent: any = null;
  ngOnInit() {
    this.idGet = JSON.parse(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.idGet) {
      this.validSession();
    }
  }
  protected validSession() {
    this.spinner.show();
    //this.permitsAnalitics(1);
    if (localStorage.getItem("session") != undefined) {
      var menuItem = localStorage.getItem("session");
      this.permitsAnalitics(menuItem);
    } else {
      //this.permitsAnalitics(1);
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(["/login"]) : this.permitsAnalitics(17);
      });
    }
  }
  protected permitsAnalitics(item) {
    this.rolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          //Inicializar componente
          this.buildReportBody(this.idGet);
        } else {
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
          });
        }
      }, error => {
        this.generateError(this.messageAlertError);
      })
  }

  buildReportBody(idGet) {
    this.reportesService.getReportDetail(idGet)
      .subscribe(report => {
        if (report.length > 0) {
          this.reportContent = report[0];
          this.buildPBIreport(report[0]);
        } else {
          this.generateError(this.textErrorPBI);
        }
      }, error => {
        this.generateError(this.textErrorPBI);
      })
  }

  private buildPBIreport(data) {
    var buildPBI: pbibody = new pbibody();
    buildPBI.groupIdPBI = data.groupIdPBI;
    buildPBI.reportId = data.id;
    buildPBI.reportIdPBI = data.reportIdPBI;
    this.reportesService.getPowerBIReport(buildPBI)
      .subscribe(reportPBI => {
        this.showReport(reportPBI);
      }, error => {
        this.generateError(this.textErrorPBI);
      })
  }

  showReport(accessToken: pbibody) {
    // Embed URL
    let embedUrl = accessToken.embedUrl;
    let embedReportId = accessToken.reportIdPBI;
    let config = {
      type: 'report',
      accessToken: accessToken.embedToken,
      embedUrl: embedUrl,
      id: embedReportId,
      tokenType: pbi.models.TokenType.Embed,
      settings: {

      }
    };
    let reportContainer = this.reportContainer.nativeElement;
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    let report = powerbi.embed(reportContainer, config);
    this.spinner.hide();
    report.off("loaded");
    report.on("loaded", () => {
    });
    report.on("error", () => {
      //this.getToken();
    });
  }

  protected generateError(Text) {
    this.auth.actualUser$.subscribe((data) => {
      this.userlogged = data;
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${Text}</p>`;
      (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
    });
  }
}

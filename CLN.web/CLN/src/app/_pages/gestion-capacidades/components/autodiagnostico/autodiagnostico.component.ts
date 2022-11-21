import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { calificationLimit } from 'src/app/_model/capacidad/calificationLimit.model';
import { capacidadListType } from 'src/app/_model/capacidad/capacidadListType.model';
import { files } from 'src/app/_model/capacidad/files.model';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { AutodiagnosticoService } from 'src/app/_services/gestion-capacidades/autodiagnostico.service';
import { GestionCapacidadesService } from 'src/app/_services/gestion-capacidades/gestion-capacidades.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-autodiagnostico',
  templateUrl: './autodiagnostico.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './autodiagnostico.component.scss']
})
export class AutodiagnosticoComponent implements OnInit {
  titulo = [
    "Diagnóstico de capacidades de nuestra Secretaría",
    "",
    "",
    "",
    "",
    true,
    ""
  ];
  public showContent: boolean;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private auth: AuthenticationService,
    private rolesService: GestorRolesService,
    private permitService: PermitServiceService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private autoService: AutodiagnosticoService) { }

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
        console.log(data)
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          //Inicializar componente
          this.initConfiguration();
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
  public configEvaluacion: calificationLimit = new calificationLimit();
  public initValue: number = 0;
  public finalValue: number = 0;
  public capacidadesList: Array<capacidadListType> = [];
  public filesData: files = new files();
  public loadComplet = true;
  private initConfiguration() {
    this.autoService.getAutodiagnosisConfig()
      .subscribe(data => {
        this.filesData.archivoGuia = data[0].guia[0].archivoGuia;
        this.filesData.videoGuia = data[0].guia[0].videoGuia;
        this.titulo[2] = `<div class='text-justify'>${data[0].guia[0].textoBienvenida}</div>`
        this.titulo[6] = data[0].guia[0].mensajeAyuda;
        this.capacidadesList = data[0].tipoCapacidad;
        this.configEvaluacion.init = data[0].guia[0].valorMinimoCalificacion;
        this.configEvaluacion.final = data[0].guia[0].valorMaximoCalificacion;
        this.loadComplet = false;
      })
  }

  public showCapacidad(event: boolean) {
    this.showContent = event;
    this.capacidadesClose = false;
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
  public capacidadesClose: boolean = true;
  public closeCapacidades(event) {
    this.capacidadesClose = true;
  }
}

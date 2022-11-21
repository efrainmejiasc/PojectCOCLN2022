import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { AutodiagnosticoService } from 'src/app/_services/autodiagnostico.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  titulo = [
    "Resultado autodiagnóstico",
    "",
    "Aquí podrá visualizar el historial de los resultados obtenidos en cada uno de los autodiagnósticos realizados hasta la fecha",
    "",
    "",
    false,
    "",
    true
  ];
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private auth: AuthenticationService,
    private rolesService: GestorRolesService,
    private permitService: PermitServiceService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private autoService: AutodiagnosticoService
  ) { }

  ngOnInit() {
    this.validSession();
  }
  userlogged: any;
  protected validSession() {
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
}

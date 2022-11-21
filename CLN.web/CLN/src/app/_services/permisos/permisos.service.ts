import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { AuthenticationService } from '../_compras-publicas/authentication.service';
import { GestorRolesService } from '../gestor-roles/gestor-roles.service';
import { PermitServiceService } from '../gestor-roles/permit-service.service';

// Models
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  userlogged: any;
  private messageAlert: string = "No hemos podido resolver tu solicitud, por favor vuelve a intentarlo"
  private permitsUser: permitsUserFetch = new permitsUserFetch();

  constructor(
    private modalService: NgbModal,
    private gestorRolesService: GestorRolesService,
    private router: Router,
    private permitService: PermitServiceService,
    private auth: AuthenticationService,
  ) { }

  getPermitsUser(): permitsUserFetch {
    return this.permitsUser;
  }

  validSession() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem("session") != undefined) {
        var menuItem = localStorage.getItem("session");
        localStorage.removeItem("session");
        this.permitsAnalitics(menuItem, resolve);
      } else {
        this.auth.actualUser$.subscribe((data) => {
          this.userlogged = data;
          (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
        });
      }
    });
  }

  protected permitsAnalitics(item, resolve) {
    this.gestorRolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          //Inicializar componente
          resolve();
        } else {
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
          });
        }
      }, error => {
        this.openDialog(this.messageAlert);
        this.auth.actualUser$.subscribe((data) => {
          this.userlogged = data;
          (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
        });
      });
  }

  openDialog(mensaje: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${mensaje}</p>`;
  }
}

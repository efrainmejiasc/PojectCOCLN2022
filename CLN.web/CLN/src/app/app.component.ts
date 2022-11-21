import { Component, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './_services/_compras-publicas/authentication.service';
import { GestionReportesService } from './_services/gestion-reportes/gestion-reportes.service';

import { environment } from '../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AlertModalComponent } from '../app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private reportService: GestionReportesService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    //this.spinner.hide();
    //this.authenticationService.reloadSession();
  }

  ngOnDestroy() {

  }
  private openModal = false;
  private blockedValidation = false;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(!this.blockedValidation)
      this.muestraInformacion(event);
  }

  @HostListener('document:mousemove', ['$event'])
  handleMouseEvent(event: MouseEvent) {
    if(!this.blockedValidation)
      this.muestraInformacion(event);
  }

  muestraInformacion(elEvento) {
    var evento = window.event || elEvento;
    this.blockedValidation = true;

    if(!this.validateSesion())
    {
      this.blockedValidation = false;
      return;
    }

    //console.log("Tipo de evento: " + evento.type)
    let recentMoveDate;
    this.authenticationService.getUTCServerDate().subscribe(data => {
      recentMoveDate = data
      //console.group("time");
      //console.log("recentMove:" + recentMoveDate);
      let lm = localStorage.getItem('lastMove');
      //console.log("lm:" + lm);
      let lastMove = new Date(lm != undefined ? lm : recentMoveDate).getTime().toString().slice(0, -3);
      //console.log("lastmove:" + lastMove);
      var recentMove = new Date(recentMoveDate).getTime().toString().slice(0, -3);
      //console.groupEnd()
      //console.log(recentMove + " - " + lastMove);
      var diference = (parseInt(recentMove) - parseInt(lastMove)) / 60 * 60000;
      //console.log(diference);
      //console.log(environment.timeout * 60000);
      if (diference >= (environment.timeout * 60000))
        {
          //console.log("perdiste")
          if(!this.openModal)
          {
            this.openModal = true;
            this.alertModal('La sesión ha caducado, por favor vuelva a iniciar sesión.');
          }
        }
      else
      {
        localStorage.setItem('lastMove', recentMoveDate);
        //console.log("ganaste")
        setTimeout(() => {
          this.openModal = false;
          this.blockedValidation = false;
        }, 2000);
      }
    });
  }

  alertModal(message: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = message;
    ref.result.then((response) => {
    },
      (cancel) => {
        //console.log("entro a cerrar sesion")
        this.authenticationService.logoutWhitoutSession();
        setTimeout(() => {
          this.openModal = false;
          this.blockedValidation = false;
        }, 2000);
      });
  }

  validateSesion()
  {
    /* const currentUser = JSON.parse(localStorage.getItem("actualUser"));
    return currentUser && currentUser.token; */

    return false;
  }
}

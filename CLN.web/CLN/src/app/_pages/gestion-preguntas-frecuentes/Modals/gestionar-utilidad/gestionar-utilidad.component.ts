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
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { PreguntasServiceService } from 'src/app/_services/preguntas-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { UtilidadComponent } from '../utilidad/utilidad.component';

@Component({
  selector: 'app-gestionar-utilidad',
  templateUrl: './gestionar-utilidad.component.html',
  styleUrls: ['./gestionar-utilidad.component.scss']
})
export class GestionarUtilidadComponent implements OnInit {

  constructor(
    private preguntasService: PreguntasServiceService,
    private rolesService: GestorRolesService,
    private permitService: PermitServiceService,
    private auth: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.validSession();
  }
  titulo = [
    "utilidad",
    "Crear utilidad",
    "Aquí podrá gestionar las utilidades de las preguntas frecuentes.",
    "button-utilidad"
  ];
  userlogged: any;
  protected validSession() {
    this.spinner.show();
    if (localStorage.getItem('session') !== undefined) {
      const menuItem = localStorage.getItem('session');
      this.permitsAnalitics(menuItem);
    } else {
      // this.permitsAnalitics(1);
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(['/login']) : this.router.navigate(['/menudinamico']);
      });
    }
  }
  private messageAlertError = 'No hemos podido resolver tu solicitud, por favor vuelve a intentarlo'
  protected permitsAnalitics(item) {
    this.rolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser.canActive = true;
          this.permitsUser.canEdit = true;
          this.permitsUser.canCreate = true;
          this.permitsUser.canDelete = true;
          this.fetchUtilidades();
        } else {
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            (this.userlogged === null) ? this.router.navigate(['/login']) : this.router.navigate(['/menudinamico']);
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
          (this.userlogged === null) ? this.router.navigate(['/login']) : this.router.navigate(['/menudinamico']);
        });
      });
  }

  reloadtable(evento) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La utilidad ha sido creado correctamente</p>`;
    this.fetchUtilidades();
  }

  public permitsUser: permitsUserFetch = new permitsUserFetch();
  utilidades: any[] = [];
  public configuration: configuration = new configuration();
  private masterFilter: Array<any>;
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public searchConfig: searchBox = new searchBox();
  fetchUtilidades() {
    this.preguntasService.getUtils()
      .subscribe(utilidades => {
        this.utilidades = utilidades;
        console.log(utilidades)
        this.configuration.dataToPrint = utilidades;
        this.configuration.rowOrderData = [];
        this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
        this.emptyConfiguration.emptySearchText = "No se encontraron utilidades asociadas a ";
        this.searchConfig.minLength = 3;
        this.searchConfig.searchAttribute = `descripcion`
        var columnOne: rowOrder = new rowOrder();
        columnOne.nameInThead = "Utilidad";
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
        columnOne.activeResultInObject = 1;
        columnOne.inactiveResultInObject = 2;
        var columnTwo: rowOrder = new rowOrder();
        columnTwo.nameInThead = "Acción";
        columnTwo.position = 4;
        columnTwo.filterBy = false;
        columnTwo.flexDirection = "column";
        columnTwo.orderBy = false;
        columnTwo.size = 15;
        columnTwo.typeSize = "%";
        columnTwo.borderRadius = "0px 20px 0px 0px";
        columnTwo.actionRow = true;
        columnTwo.buttonHeightPercent = 33;
        this.configuration.rowOrderData.push(columnOne);
        this.configuration.rowOrderData.push(columnTwo);
        this.spinner.hide();
      });
  }

  deleteUtilidad(utlidad: any) {
    this.preguntasService.getUtiltodelete(utlidad.idUtilidad).subscribe(preguntas => {
      if (preguntas > 0) {
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La utilidad no puede ser eliminada, pues ha sido usada para calificar algunas preguntas frecuentes</p>`;
      } else {
        const ref = this.modalService.open(ConfirmationModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
        ref.componentInstance.message = `
          <p class="px-2">¿Está seguro de eliminar la utilidad <b>${utlidad.descripcion}</b>.</p>`;
        ref.result.then(confirm => {
          if (confirm) {
            utlidad.estado = 3;
            this.preguntasService.updateUtils(utlidad)
              .subscribe(response => {
                this.fetchUtilidades();
                const ref = this.modalService.open(AlertModalComponent, {
                  centered: true,
                  backdrop: 'static',
                  keyboard: false
                });
                ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La utilidad <b>${utlidad.descripcion}</b> y toda su información ha sido borrada del sistema</p>`;
              });
          }
        });
      }
    });
  }

  openDialog(utilidad: any) {
    const dialogRef = this.modalService.open(UtilidadComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    dialogRef.componentInstance.sendedData = "Editar utilidad";
    dialogRef.componentInstance.dataReceive = JSON.stringify(utilidad);
    dialogRef.result.then((yes) => {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La información de la utilidad <b>${yes}</b> ha sido actualizada correctamente</p>`;
      this.fetchUtilidades();
    },
      (cancel) => { });
  }

  ActiveBanner(utilidad: any) {
    const nuevautildiad = utilidad.estado === 2 ? 1 : 2;
    utilidad.estado = nuevautildiad;
    const texto = nuevautildiad === 1 ? 'activada' : 'inactivada';
    this.preguntasService.enable_DisableUtils(utilidad)
      .subscribe(response => {
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La utilidad <b>  ${utilidad.descripcion} </b> ha sido ${texto} correctamente.</p>`;
        //this.openDialog2('La utilidad <b>' + utilidad.descripcion + '</b> ha sido ' + texto + ' correctamente.');
        this.fetchUtilidades();
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
        this.deleteUtilidad($event[1]);
        break;
      case "activein":
        this.ActiveBanner($event[1]);
        break;
    }
  }
}

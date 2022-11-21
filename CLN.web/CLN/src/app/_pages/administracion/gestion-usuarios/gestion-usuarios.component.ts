import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { ValidatorService } from 'src/app/_services/validator.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { GestionUsuariosService } from 'src/app/_services/gestion-usuarios/gestion-usuarios.service';
import { user } from 'src/app/_model/user-data/user.module';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { CreateUserComponent } from '../Modals/create-user/create-user.component';
import { NgxSpinnerService } from "ngx-spinner";
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: [
    "../../../_shared/styles/tables.scss",
    './gestion-usuarios.component.scss']
})
export class GestionUsuariosComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  @ViewChild('modal', { static: false }) modal;
  @ViewChild('modalErrors', { static: false }) modalErrors;
  public users: user[];


  constructor(
    private validator: ValidatorService,
    private auth: AuthenticationService,
    private usersService: GestionUsuariosService,
    private configModal: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private rolesService: GestorRolesService,
    private spinner: NgxSpinnerService,
    private permitService: PermitServiceService,) { }
  dtTrigger = new Subject();
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
          this.getListUsers();
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

  public emptyList: boolean = false;
  public userList: Array<user> = [];
  public configuration: configuration = new configuration();
  public searchConfig: searchBox = new searchBox();
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public getListUsers() {
    this.usersService.getUserList()
      .subscribe(data => {
        this.users = data;
        this.userList = data;
        this.configuration.dataToPrint = data;
        this.configuration.rowOrderData = [];
        this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
        this.emptyConfiguration.emptySearchText = "No se encontraron usuarios asociados a ";
        this.searchConfig.minLength = 3;
        this.searchConfig.searchAttribute = `primerNombre + segundoNombre + primerApellido + segundoApellido`
        //IMPORTANTE: El concatenado no se puede ordenar ni filtrar
        var columnOne: rowOrder = new rowOrder();
        columnOne.nameInThead = "Nombre";
        columnOne.position = 0;
        columnOne.nameInObject = `primerNombre + segundoNombre + primerApellido + segundoApellido`;
        columnOne.filterBy = false;
        columnOne.orderBy = true;
        columnOne.size = 20;
        columnOne.typeSize = "%";
        columnOne.borderRadius = "20px 0px 0px 0px";
        columnOne.textAlign = "flex-start";
        columnOne.padding = "0px 0px 0px 10px";
        var columnTwo: rowOrder = new rowOrder();
        columnTwo.nameInThead = "Grupo";
        columnTwo.position = 1;
        columnTwo.nameInObject = `grupo`;
        columnTwo.filterBy = true;
        columnTwo.orderBy = true;
        columnTwo.size = 20;
        columnTwo.typeSize = "%";
        columnTwo.borderRadius = "0px 0px 0px 0px";
        columnTwo.textAlign = "flex-start";
        columnTwo.padding = "0px 0px 0px 10px";
        var columnThree: rowOrder = new rowOrder();
        columnThree.nameInThead = "Rol";
        columnThree.position = 2;
        columnThree.nameInObject = `rol`;
        columnThree.filterBy = true;
        columnThree.orderBy = true;
        columnThree.size = 20;
        columnThree.typeSize = "%";
        columnThree.borderRadius = "0px 0px 0px 0px";
        columnThree.textAlign = "flex-start";
        columnThree.padding = "0px 0px 0px 10px";
        var columnFour: rowOrder = new rowOrder();
        columnFour.nameInThead = "Secretaría / Ministerio";
        columnFour.position = 3;
        columnFour.nameInObject = `secretaria`;
        columnFour.filterBy = true;
        columnFour.orderBy = true;
        columnFour.size = 20;
        columnFour.typeSize = "%";
        columnFour.borderRadius = "0px 0px 0px 0px";
        var columnFive: rowOrder = new rowOrder();
        columnFive.nameInThead = "Estado";
        columnFive.position = 4;
        columnFive.nameInObject = `estado`;
        columnFive.filterBy = false;
        columnFive.orderBy = true;
        columnFive.size = 10;
        columnFive.typeSize = "%";
        columnFive.borderRadius = "0px 0px 0px 0px";
        columnFive.activeIcon = true;
        columnFive.textAlign = "space-between";
        columnFive.activeResultInObject = "Activo";
        columnFive.inactiveResultInObject = "Inactivo";
        columnFive.padding = "0px 20px 0px 20px";
        var columnSix: rowOrder = new rowOrder();
        columnSix.nameInThead = "Acción";
        columnSix.position = 5;
        columnSix.filterBy = false;
        columnSix.flexDirection = "column";
        columnSix.orderBy = false;
        columnSix.size = 10;
        columnSix.typeSize = "%";
        columnSix.borderRadius = "0px 20px 0px 0px";
        columnSix.actionRow = true;
        columnSix.buttonHeightPercent = 33;
        this.configuration.rowOrderData.push(columnOne);
        this.configuration.rowOrderData.push(columnTwo);
        this.configuration.rowOrderData.push(columnThree);
        this.configuration.rowOrderData.push(columnFour);
        this.configuration.rowOrderData.push(columnFive);
        this.configuration.rowOrderData.push(columnSix);
        this.spinner.hide();
      })
  }

  rerender(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
    else {
      this.dtTrigger.next();
    }

  }
  public is_createuser: boolean;
  closeCreate() {
    this.is_createuser = false;
    this.userToEdit = null;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  openModal() {
    this.modalService.open(this.modal, { size: 'lg', centered: true });
  }

  public userToEdit: user;
  public editUser(userData) {
    const dialogRef = this.modalService.open(CreateUserComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    dialogRef.componentInstance.userSelect = JSON.stringify(userData);
    dialogRef.result.then((yes) => {
      if (yes[0] = "update" && yes[1] == true) {
        const dialogRef = this.modalService.open(AlertModalComponent, {
          backdrop: false,
          keyboard: false,
        });
        dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>El usuario ha sido actualizado exitosamente.</p>";
        this.getListUsers();
      }
    })
  }

  do_createUserForm() {
    const dialogRef = this.modalService.open(CreateUserComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    dialogRef.result.then((yes) => {
      if (yes[0] = "create" && yes[1] == true) {
        const dialogRef = this.modalService.open(AlertModalComponent, {
          backdrop: false,
          keyboard: false,
        });
        dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>El usuario ha sido creado exitosamente.</p>";
        this.getListUsers();
      }
    })
  }

  deleteUser(usuario: user) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
    var nombre = "";
    (usuario.primerNombre) ?nombre = nombre + usuario.primerNombre : "";
    (usuario.segundoNombre) ?nombre = nombre + " " + usuario.segundoNombre : "";
    (usuario.primerApellido) ?nombre = nombre + " " + usuario.primerApellido : "";
    (usuario.segundoApellido) ?nombre = nombre + " " + usuario.segundoApellido : "";
    ref.componentInstance.message = `
      <p class="px-2">Una vez el usuario <b>${nombre}</b> es eliminado, será
      borrado completamente del sistema.</p>`;
    ref.result.then(confirm => {
      if (confirm) {
        this.usersService.deleteUser(usuario.idUsuario)
          .subscribe(data => {
            if (data == "OK") {
              this.getListUsers();
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El usuario ha sido borrado correctamente</p>`;
            } else {
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El usuario no puede ser eliminado del sistema</p>`;
            }
          })
      }
    });
  }

  activeInactiveUser(usuario: user) {
    var actionUser: String = "";
    var message: String = "";
    switch (usuario.estado) {
      case "Activo":
        message = "El usuario se ha inactivado correctamente"
        actionUser = "inactivo";
        break;
      case "Inactivo":
        message = "El usuario se ha activado correctamente"
        actionUser = "activo";
        break;
    }
    this.usersService.activeInactiveUser(actionUser, usuario.idUsuario)
      .subscribe(data => {
        if (data == true) {
          this.getListUsers();
          const ref = this.modalService.open(AlertModalComponent, {
            centered: true,
            backdrop: 'static',
            keyboard: false
          });
          ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${message}</p>`;
        }
      })
  }

  patternValidation(e) {
    var phoneRGEX = /^[A-Za-z0-9\s]+$/g;
    if (phoneRGEX.test(e.key)) return true; else return false;
  }
  buildAction($event) {
    switch ($event[0]) {
      case "view":
        break;
      case "edit":
        this.editUser($event[1]);
        break;
      case "delete":
        this.deleteUser($event[1]);
        break;
      case "activein":
        this.activeInactiveUser($event[1]);
        break;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { rolGroup } from 'src/app/_model/roles/rolGroup.model';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { GestorGruposService } from 'src/app/_services/gestor-roles/gestor-grupos.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { GestionarGrupoRolComponent } from '../../Modals/gestionar-grupo-rol/gestionar-grupo-rol.component';
import { NgxSpinnerService } from "ngx-spinner";
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';

@Component({
  selector: 'app-gestion-grupos-roles',
  templateUrl: './gestion-grupos-roles.component.html',
  styleUrls: [
    "../../../../_shared/styles/tables.scss",
    './gestion-grupos-roles.component.scss'
  ]
})
export class GestionGruposRolesComponent implements OnInit {

  constructor(
    private rolesService: GestorRolesService,
    private groupService: GestorGruposService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    private permitService: PermitServiceService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.validSession();
    //this.buildForm();
    //this.getRolGroup();
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
          this.buildForm();
          this.getRolGroup();
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

  private sortingOne: boolean = false;
  sortBy(column) {
    if (this.sortingOne) {
      this.sortingOne = false;
      this.groupList.sort((a, b) => a[`${column}`] < b[`${column}`] ? -1 : a[`${column}`] > b[`${column}`] ? 1 : 0);
    } else {
      this.sortingOne = true;
      this.groupList.sort((a, b) => a[`${column}`] < b[`${column}`] ? 1 : a[`${column}`] > b[`${column}`] ? -1 : 0);
    }
  }

  form: FormGroup;
  public buildForm() {
    this.form = this.formBuilder.group({
      'nonmbre': new FormControl(['', Validators.required]),
      'descripcion': new FormControl(['', Validators.required])
    })
  }

  titulo = [
    "grupo de roles",
    "Crear grupos de roles",
    "Aquí podrá crear, editar, consultar y eliminar los grupos de roles de usuario.",
    "button-group-rol",
  ];
  public groupList: Array<rolGroup> = [];
  public configuration: configuration = new configuration();
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  private getRolGroup() {
    this.groupService.getRolGroups()
      .subscribe(data => {
        this.groupList = data;
        this.configuration.dataToPrint = data;
        this.configuration.rowOrderData = [];
        this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
        this.emptyConfiguration.emptySearchText = "No se encontraron roles asociados a ";
        var columnOne: rowOrder = new rowOrder();
        columnOne.nameInThead = "Grupo";
        columnOne.position = 0;
        columnOne.nameInObject = "grupo";
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
        columnTwo.size = 50;
        columnTwo.typeSize = "%";
        columnTwo.borderRadius = "0px 0px 0px 0px";
        columnTwo.textAlign = "flex-start";
        columnTwo.padding = "0px 0px 0px 10px";
        var columnThree: rowOrder = new rowOrder();
        columnThree.nameInThead = "Acción";
        columnThree.position = 2;
        columnThree.filterBy = false;
        columnThree.orderBy = false;
        columnThree.size = 25;
        columnThree.typeSize = "%";
        columnThree.borderRadius = "0px 20px 0px 0px";
        columnThree.flexDirection = "column";
        columnThree.actionRow = true;
        columnThree.buttonHeightPercent = 50;
        this.configuration.rowOrderData.push(columnOne);
        this.configuration.rowOrderData.push(columnTwo);
        this.configuration.rowOrderData.push(columnThree);
        this.groupList.sort((a, b) => a.grupo < b.grupo ? -1 : a.grupo > b.grupo ? 1 : 0);
        this.spinner.hide();
      })
  }

  public reloadtable(event) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El grupo <b>${event}</b> ha sido creado correctamente</p>`;
    this.getRolGroup();
  }
  openDialog(rol: any) {
    const dialogRef = this.modalService.open(GestionarGrupoRolComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    })
    if (rol.idEstado == 5) {
      dialogRef.componentInstance.sendedData = "Ver grupo Administrador";
    } else {
      dialogRef.componentInstance.sendedData = "Editar grupos de roles";
    }
    dialogRef.componentInstance.dataReceive = JSON.stringify(rol);
    dialogRef.result.then((yes) => {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El grupo <b>${yes[0]}</b> ha sido actualizado correctamente</p>`;
      this.getRolGroup();
    })
  }
  deleteRol(rol) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"];
    ref.componentInstance.message = `
      <p class="px-2">El grupo de roles <b>${rol.grupo}</b> y toda su información será borrada del sistema</p>`;
    ref.result.then(confirm => {
      if (confirm) {
        this.groupService.deleteGroup(rol.id)
          .subscribe(data => {
            if (data == "OK") {
              this.getRolGroup();
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El grupo <b>${rol.grupo}</b> y toda su información ha sido borrada del sistema</p>`;
            } else {
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El grupo <b>${rol.grupo}</b> no puede ser eliminado pues está asignado para algunos roles activos en el sistema</p>`;
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
        this.deleteRol($event[1]);
        break;
    }
  }
}

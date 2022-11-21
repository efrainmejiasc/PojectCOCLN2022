import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { DataTablesOptions } from "src/app/_shared/utils/DataTables/data-tables-options";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ArrayRoles, newRol } from "../../temp/roles";
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { RolComponent } from '../../Modals/rol/rol.component';
import { Router } from '@angular/router';
import { configuration } from 'src/app/_model/table-dynamic/configuration.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { NgxSpinnerService } from "ngx-spinner";
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
@Component({
  selector: "app-gestion-roles",
  templateUrl: "./gestion-roles.component.html",
  styleUrls: [
    "../../../../_shared/styles/tables.scss",
    "./gestion-roles.component.scss",
  ],
})
export class GestionRolesComponent implements OnInit {
  dt_data: Array<newRol>;
  arrows = {
    rol: "unsorted",
    descripcion: "unsorted"
  }
  titulo = [
    "roles",
    "Crear rol",
    "Aquí podrá crear, editar, eliminar y consultar los roles de usuario.",
    "button-rol"
  ];
  rolesFiltrados: Array<any>;
  constructor(
    private rolesService: GestorRolesService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private permitService: PermitServiceService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.validSession();
    //this.rerender();
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
          this.getRoles();
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

  reloadtable(evento) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El rol ha sido creado correctamente</p>`;
    this.getRoles();
  }
  public configuration: configuration = new configuration();
  private masterFilter: Array<any>;
  public emptyConfiguration: emptyConfiguration = new emptyConfiguration();
  public getRoles() {
    this.rolesService.getRolesPagination(1, 10)
      .subscribe(roles => {
        this.configuration.dataToPrint = roles;
        this.configuration.rowOrderData = [];
        this.emptyConfiguration.emptyContentText = "No hay registros para mostrar.";
        this.emptyConfiguration.emptySearchText = "No se encontraron roles asociados a ";
        var columnOne: rowOrder = new rowOrder();
        columnOne.nameInThead = "Rol";
        columnOne.position = 0;
        columnOne.nameInObject = "rol";
        columnOne.filterBy = false;
        columnOne.orderBy = true;
        columnOne.size = 20;
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
        columnTwo.size = 40;
        columnTwo.typeSize = "%";
        columnTwo.borderRadius = "0px 0px 0px 0px";
        columnTwo.textAlign = "flex-start";
        columnTwo.padding = "0px 0px 0px 10px";
        var columnThree: rowOrder = new rowOrder();
        columnThree.nameInThead = "Grupo";
        columnThree.position = 2;
        columnThree.nameInObject = "grupo";
        columnThree.filterBy = true;
        columnThree.orderBy = false;
        columnThree.size = 20;
        columnThree.typeSize = "%";
        columnThree.borderRadius = "0px 0px 0px 0px";
        columnThree.textAlign = "flex-start";
        columnThree.padding = "0px 0px 0px 10px";
        var columnFourth: rowOrder = new rowOrder();
        columnFourth.nameInThead = "Acción";
        columnFourth.position = 3;
        columnFourth.filterBy = false;
        columnFourth.orderBy = false;
        columnFourth.flexDirection = "column";
        columnFourth.size = 20;
        columnFourth.typeSize = "%";
        columnFourth.borderRadius = "0px 20px 0px 0px";
        columnFourth.actionRow = true;
        columnFourth.buttonHeightPercent = 50;
        this.configuration.rowOrderData.push(columnOne);
        this.configuration.rowOrderData.push(columnTwo);
        this.configuration.rowOrderData.push(columnThree);
        this.configuration.rowOrderData.push(columnFourth);
        this.masterFilter = roles;
        this.rolesFiltrados = this.masterFilter;
        this.rolesFiltrados.sort((a, b) => a.rol < b.rol ? -1 : a.rol > b.rol ? 1 : 0);
        this.getRender();
        this.spinner.hide();
      })
  }

  public grupos: Array<any> = [];
  public getRender() {
    this.grupos = [];
    this.rolesFiltrados.forEach(roles => {
      if (this.grupos.filter(group => group.grupo == roles.grupo)[0] == undefined) {
        this.grupos.push(roles);
      }
    })
  }
  public filterByContent(item: any) {
    this.activeFilt = item;
    if (item != null) this.rolesFiltrados = this.masterFilter.filter(master => master.grupo == item.grupo); else this.rolesFiltrados = this.masterFilter;
    this.filter1 = false;
  }
  public filter1: boolean = false;
  public activeFilt: any;
  public activeFilter(filter: number, e) {
    switch (filter) {
      case 1:
        if (document.getElementById('filterN1').contains(e.target)) {
          if (!this.filter1) this.filter1 = true; else this.filter1 = false;
        }
        break;
    }
  }

  private sortingOne: boolean = false;
  sortBy(column) {
    if (this.sortingOne) {
      this.sortingOne = false;
      this.rolesFiltrados.sort((a, b) => a[`${column}`] < b[`${column}`] ? -1 : a[`${column}`] > b[`${column}`] ? 1 : 0);
    } else {
      this.sortingOne = true;
      this.rolesFiltrados.sort((a, b) => a[`${column}`] < b[`${column}`] ? 1 : a[`${column}`] > b[`${column}`] ? -1 : 0);
    }
  }

  @Output() evento = new EventEmitter<string>();
  openDialog(rol: any) {
    const dialogRef = this.modalService.open(RolComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    if (rol.grupo == "Admin MEN") {
      dialogRef.componentInstance.sendedData = "Ver rol Administrador";
    } else {
      dialogRef.componentInstance.sendedData = "Editar roles";
    }
    dialogRef.componentInstance.dataReciber = JSON.stringify(rol);
    dialogRef.result.then((yes) => {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>La información del rol <b>${yes[0]}</b> ha sido actualizada correctamente</p>`;
      this.getRoles();
    },
      (cancel) => { });
  }

  deleteRol(rol) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
    ref.componentInstance.message = `
      <p class="px-2">El rol seleccionado y toda su información será borrada completamente del sistema. Por lo tanto, este rol dejará de estar disponible en el módulo de gestión de usuarios.</p>`;
    ref.result.then(confirm => {
      if (confirm) {
        this.rolesService.deleteRol(rol.id)
          .subscribe(data => {
            if (data == "OK") {
              this.getRoles();
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El rol <b>${rol.rol}</b> y toda su información ha sido borrada del sistema</p>`;
            } else {
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>El rol <b>${rol.rol}</b> no puede ser eliminado puues está asignado para algunos usuarios activos en el sistema</p>`;
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

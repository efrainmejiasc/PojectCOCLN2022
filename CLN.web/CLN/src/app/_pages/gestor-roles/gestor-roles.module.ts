import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestorRolesRoutingModule } from './gestor-roles-routing.module';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GestionRolesComponent } from './components/gestion-roles/gestion-roles.component';
import { RolComponent } from './Modals/rol/rol.component';
import { GestionarRolUsuariosComponent } from './Modals/gestionar-rol-usuarios/gestionar-rol-usuarios.component';
import { GestionGruposRolesComponent } from './components/gestion-grupos-roles/gestion-grupos-roles.component';
import { GestionarGrupoRolComponent } from './Modals/gestionar-grupo-rol/gestionar-grupo-rol.component';
import { ContenidosTituloRolesComponent } from './Modals/contenidos-titulo-roles/contenidos-titulo-roles.component';
import { PaginatorComponent } from './Modals/paginator/paginator.component';
import { TableDynamicRolComponent } from './Modals/table-dynamic-rol/table-dynamic-rol.component';


@NgModule({
  declarations: [
    GestionRolesComponent,
    RolComponent,
    GestionarRolUsuariosComponent,
    GestionGruposRolesComponent,
    GestionarGrupoRolComponent,
    ContenidosTituloRolesComponent,
    PaginatorComponent,
    TableDynamicRolComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    GestorRolesRoutingModule,
    NgbModule,
    SharedModuleModule

  ],
  entryComponents: [
    RolComponent,
    GestionarRolUsuariosComponent,
    GestionarGrupoRolComponent,
    AlertModalComponent,
    ConfirmationModalComponent
  ],
  providers: [
    GestorRolesService
  ],
  exports: [
    SharedModuleModule
  ]
})
export class GestorRolesModule { }

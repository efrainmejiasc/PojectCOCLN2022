import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

// Modules
import { GestorContenidosRoutingModule } from './gestor-contenidos-routing.module';
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';

// Components
import { ContenidosMenuComponent } from './components/contenidos-menu/contenidos-menu.component';
import { ContenidosComponent } from './components/contenidos/contenidos.component';
import { ContenidosTemaComponent } from './components/contenidos-tema/contenidos-tema.component';
import { ContenidosBibliotecaComponent } from './components/contenidos-biblioteca/contenidos-biblioteca.component';

import { ContenidosFormComponent } from './modals/contenidos-form/contenidos-form.component';
import { ContenidosEditComponent } from './modals/contenidos-edit/contenidos-edit.component';
import { TemasFormComponent } from './modals/temas-form/temas-form.component';
import { TemasEditComponent } from './modals/temas-edit/temas-edit.component';
import { BibliotecasFormComponent } from './modals/bibliotecas-form/bibliotecas-form.component';
import { BibliotecasEditComponent } from './modals/bibliotecas-edit/bibliotecas-edit.component';

import { ConfirmacionComponent } from './modals/confirmacion/confirmacion.component';

// Pipes
import { TemasImprimirPipe } from './pipes/temas-imprimir.pipe';
import { MicrositiosImprimirPipe } from './pipes/micrositios-imprimir.pipe';
import { TableDynamicContenidosComponent } from './modals/table-dynamic-contenidos/table-dynamic-contenidos.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ContenidosMenuComponent,
    ContenidosComponent,
    ContenidosTemaComponent,
    ContenidosBibliotecaComponent,
    ContenidosFormComponent,
    ContenidosEditComponent,
    TemasFormComponent,
    TemasEditComponent,
    BibliotecasFormComponent,
    BibliotecasEditComponent,
    TemasImprimirPipe,
    MicrositiosImprimirPipe,
    ConfirmacionComponent,
    TableDynamicContenidosComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    GestorContenidosRoutingModule,
    NgbModule,
    QuillModule.forRoot(),
    SharedModuleModule,
    NgxSpinnerModule,
  ],
  entryComponents: [
    ContenidosFormComponent,
    ContenidosEditComponent,
    TemasFormComponent,
    TemasEditComponent,
    BibliotecasFormComponent,
    BibliotecasEditComponent,
    ConfirmacionComponent
  ],
  providers: [
  ],
  exports: [
    SharedModuleModule
  ]
})
export class GestorContenidosModule { }

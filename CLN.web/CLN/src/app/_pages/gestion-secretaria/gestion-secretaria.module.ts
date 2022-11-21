import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';

import { GestionSecretariaRoutingModule } from './gestion-secretaria-routing.module';

// Modules
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';

// Components
import { TableDynamicContenidosComponent } from './modals/table-dynamic-contenidos/table-dynamic-contenidos.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';
import { CrearEditarComponent } from './components/crear-editar/crear-editar.component';
import { TableroFormComponent } from './modals/tablero-form/tablero-form.component';
import { TableroViewComponent } from './components/tablero-view/tablero-view.component';
import { IntegranteFormViewComponent } from './modals/integrante-form-view/integrante-form-view.component';

@NgModule({
  declarations: [
    VisualizarComponent,    
    TableDynamicContenidosComponent, 
    CrearEditarComponent,
    TableroFormComponent, 
    TableroViewComponent, 
    IntegranteFormViewComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    GestionSecretariaRoutingModule,
    NgbModule,
    QuillModule.forRoot(),
    SharedModuleModule,
    NgxSpinnerModule,
  ],
  entryComponents:[
    CrearEditarComponent,
    IntegranteFormViewComponent,
    TableroFormComponent,
  ]
})
export class GestionSecretariaModule { }

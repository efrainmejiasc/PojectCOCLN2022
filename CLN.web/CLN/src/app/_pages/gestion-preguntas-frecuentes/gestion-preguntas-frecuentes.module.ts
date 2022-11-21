import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionPreguntasFrecuentesRoutingModule } from './gestion-preguntas-frecuentes-routing.module';
import { GestionComponent } from './components/gestion/gestion.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrearComponent } from './components/crear/crear.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from 'src/app/_shared/components/materialtable/material.module';
import { ModalComponent } from '../modal/modal.component';
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';
import { GestionarUtilidadComponent } from './Modals/gestionar-utilidad/gestionar-utilidad.component';
import { ContenidosTituloPreguntasComponent } from './Modals/contenidos-titulo-preguntas/contenidos-titulo-preguntas.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableDynamicPreguntasComponent } from './Modals/table-dynamic-preguntas/table-dynamic-preguntas.component';
import { UtilidadComponent } from './Modals/utilidad/utilidad.component';

const MATERIALMODULE = [MaterialModule];

@NgModule({
  declarations: [GestionComponent, CrearComponent, VisualizarComponent,
    ModalComponent,
    GestionarUtilidadComponent,
    ContenidosTituloPreguntasComponent,
    TableDynamicPreguntasComponent,
    UtilidadComponent],
  entryComponents: [ModalComponent,UtilidadComponent],
  imports: [
    CommonModule,
    GestionPreguntasFrecuentesRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    DragDropModule,
    MaterialModule,
    SharedModuleModule,
    NgxSpinnerModule,
  ],
  exports: [
    ...MATERIALMODULE
  ]
})
export class GestionPreguntasFrecuentesModule { }

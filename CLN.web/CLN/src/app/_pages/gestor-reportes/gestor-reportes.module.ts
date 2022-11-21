import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestorReportesRoutingModule } from './gestor-reportes-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { QuillModule } from 'ngx-quill';
import { GestionReportesComponent } from './components/gestion-reportes/gestion-reportes.component';
import { ContenidosTituloReportesComponent } from './Modals/contenidos-titulo-reportes/contenidos-titulo-reportes.component';
import { TableDynamicReportesComponent } from './Modals/table-dynamic-reportes/table-dynamic-reportes.component';
import { ReportesComponent } from './Modals/reportes/reportes.component';
import { VerReportesComponent } from './components/ver-reportes/ver-reportes.component';
import { ViewReportComponent } from './Modals/view-report/view-report.component';

@NgModule({
  declarations: [
    GestionReportesComponent,
    ContenidosTituloReportesComponent,
    TableDynamicReportesComponent,
    ReportesComponent,
    VerReportesComponent,
    ViewReportComponent
  ],
  imports: [
    CommonModule,
    GestorReportesRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    QuillModule.forRoot(),
    SharedModuleModule,
  ],
  entryComponents: [
    ReportesComponent
  ],
  exports: [
    SharedModuleModule
  ]
})
export class GestorReportesModule { } 

import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DataTablesModule } from 'angular-datatables';
import localeEs from '@angular/common/locales/es';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Modules
import { CalendarioRoutingModule } from './calendario-routing.module';
import { MaterialModule } from './../material/material.module';
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';

// Components
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CalendarioAdminComponent } from './components/calendario-admin/calendario-admin.component';
import { TipoEventoListComponent } from './modals/tipo-evento-list/tipo-evento-list.component';
import { EventoFormComponent } from './modals/evento-form/evento-form.component';
import { EventoDeleteComponent } from './modals/evento-delete/evento-delete.component';
import { EventoDetailComponent } from './components/evento-detail/evento-detail.component';
import { ContenidoListComponent } from './modals/contenido-list/contenido-list.component';
import { VisualizacionComponent } from './components/visualizacion/visualizacion.component';

import { ConfirmationModalComponent } from './../../_shared/modals/confirmation-modal/confirmation-modal.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { NotificationComponent } from './modals/notification/notification.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    CalendarioComponent,
    EventoFormComponent,
    EventoDeleteComponent,
    EventoDetailComponent,
    TipoEventoListComponent,
    ContenidoListComponent,
    CalendarioAdminComponent,
    VisualizacionComponent,
    NotificationComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgMultiSelectDropDownModule.forRoot(),
    NgxMaterialTimepickerModule.setLocale('es-CO'),
    ColorPickerModule,
    DataTablesModule,
    CalendarioRoutingModule,
    SharedModuleModule,
    NgxSpinnerModule,
    DragDropModule,
  ],
  exports: [
    VisualizacionComponent,
    EventoDetailComponent,
    TipoEventoListComponent,
  ],
  entryComponents: [
    EventoFormComponent,
    EventoDeleteComponent,
    TipoEventoListComponent,
    ContenidoListComponent,
    ConfirmationModalComponent,
    AlertModalComponent,
    NotificationComponent
  ],
  providers: [

  ],
})
export class CalendarioModule { }

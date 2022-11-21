import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { PlugMicrositiosRoutingModule } from './plug-micrositios-routing.module';

// Modules
import { MaterialModule } from '../material/material.module';

// Componentes
import { CalendarioComponent } from './components/calendario/calendario.component';

// Modales
import { TipoEventoListComponent } from './modals/tipo-evento-list/tipo-evento-list.component';
import { EventoDetailComponent } from './components/evento-detail/evento-detail.component';

import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    CalendarioComponent,
    TipoEventoListComponent,
    EventoDetailComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    SharedModuleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    PlugMicrositiosRoutingModule,
  ],
  exports: [ ],
  entryComponents: [
    TipoEventoListComponent
  ],
})
export class PlugMicrositiosModule { }

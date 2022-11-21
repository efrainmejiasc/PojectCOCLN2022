import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionCapacidadesRoutingModule } from './gestion-capacidades-routing.module';
import { CapacidadesComponent } from './components/capacidades/capacidades.component';
import { ContenidosTituloCapacidadesComponent } from './Modals/contenidos-titulo-capacidades/contenidos-titulo-capacidades.component';
import { TableDynamicCapacidadesComponent } from './Modals/table-dynamic-capacidades/table-dynamic-capacidades.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearCapacidadComponent } from './Modals/crear-capacidad/crear-capacidad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';
import { SelectLoopDynamicComponent } from './Modals/select-loop-dynamic/select-loop-dynamic.component';
import { ActualizarGuiaComponent } from './components/actualizar-guia/actualizar-guia.component';
import { AutodiagnosticoComponent } from './components/autodiagnostico/autodiagnostico.component';
import { ContentCapacidadesComponent } from './Modals/content-capacidades/content-capacidades.component';
import { ContentNotificationsComponent } from './Modals/content-notifications/content-notifications.component';
import { AutodiagnosticoEvaluacionComponent } from './Modals/autodiagnostico-evaluacion/autodiagnostico-evaluacion.component';
import { CalificationInputComponent } from './Modals/calification-input/calification-input.component';
import { CorreoNotificacionComponent } from './Modals/correo-notificacion/correo-notificacion.component';
import { VideoComponent } from './Modals/video/video.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { TablaResultadoComponent } from './Modals/tabla-resultado/tabla-resultado.component';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [CapacidadesComponent,
    ContenidosTituloCapacidadesComponent,
    TableDynamicCapacidadesComponent,
    CrearCapacidadComponent, SelectLoopDynamicComponent, ActualizarGuiaComponent, AutodiagnosticoComponent, ContentCapacidadesComponent, ContentNotificationsComponent, AutodiagnosticoEvaluacionComponent, CalificationInputComponent, CorreoNotificacionComponent, VideoComponent, ResultadoComponent, TablaResultadoComponent,
  ],
  entryComponents: [
    CrearCapacidadComponent,
    CorreoNotificacionComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    GestionCapacidadesRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SharedModuleModule,
    QuillModule.forRoot(),
    CKEditorModule,
  ]
})
export class GestionCapacidadesModule { }

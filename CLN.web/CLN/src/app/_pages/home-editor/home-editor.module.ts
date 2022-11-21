import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import localeEs from '@angular/common/locales/es';

// Modules
import { MaterialModule } from '../material/material.module';
import { HomeEditorRoutingModule } from './home-editor-routing.module';
import { SharedModuleModule } from 'src/app/_shared/module/shared-module/shared-module.module';
import { CalendarioModule } from '../calendario/calendario.module';

// Components
import { EditorComponent } from './components/editor/editor.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PruebaComponent } from './components/prueba/prueba.component';
import { EditorNoticiasComponent } from './components/editor-noticias/editor-noticias.component';
// import { TopSectionComponent } from '../../_shared/_compras-publicas/components/top-section/top-section.component';

//import { ArticuloComponent } from './components/articulo/articulo.component';
import { PlantillaHeaderComponent } from './templates/plantilla-header/plantilla-header.component';
import { PlantillaCalendarioComponent } from './templates/plantilla-calendario/plantilla-calendario.component';
import { TextEditorComponent } from './Modals/text-editor/text-editor.component';
import { TemplateSwitchComponent } from './templates/template-switch/template-switch.component';
import { HomeComponent } from './components/home/home.component';

// Modals
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PlantillaFooterComponent } from './templates/plantilla-footer/plantilla-footer.component';
import { PlantillasModule } from 'src/app/_shared/module/plantillas/plantillas.module';
import { SeccionFijaComponent } from './seccion-fija/seccion-fija.component';
import { NoticiasTendenciasComponent } from './components/noticias-tendencias/noticias-tendencias.component';

// noticias y tendencias
import { PlantillaSeisComponent } from './templates/plantilla-seis/plantilla-seis.component';
import { TemplateSwitchNewsTrendsComponent } from './templates/template-switch-news-trends/template-switch-news-trends.component';
import { PlantillaUnoNoticiasTendenciasComponent } from './templates/plantilla-uno-noticias-tendencias/plantilla-uno-noticias-tendencias.component';
import { PlantillaDosNoticiasTendenciasComponent } from './templates/plantilla-dos-noticias-tendencias/plantilla-dos-noticias-tendencias.component';
import { PlantillaTresNoticiasTendenciasComponent } from './templates/plantilla-tres-noticias-tendencias/plantilla-tres-noticias-tendencias.component';
import { PlantillaCuatroNoticiasTendenciasComponent } from './templates/plantilla-cuatro-noticias-tendencias/plantilla-cuatro-noticias-tendencias.component';
import { PlantillaCincoNoticiasTendenciasComponent } from './templates/plantilla-cinco-noticias-tendencias/plantilla-cinco-noticias-tendencias.component';
import { PlantillaSeisNoticiasTendenciasComponent } from './templates/plantilla-seis-noticias-tendencias/plantilla-seis-noticias-tendencias.component';
import { ProductosServiciosComponent } from './secciones-fijas-noticias-tendencias/productos-servicios/productos-servicios.component';
import { MercadoLibreComponent } from './secciones-fijas-noticias-tendencias/components/mercado-libre/mercado-libre.component';
import { GoogleTrendsComponent } from './secciones-fijas-noticias-tendencias/components/google-trends/google-trends.component';
import { CpSelectEditorComponent } from './secciones-fijas-noticias-tendencias/components/cp-select-editor/cp-select-editor.component';
import { ReportesTendenciasComponent } from './secciones-fijas-noticias-tendencias/reportes-tendencias/reportes-tendencias.component';
import { RedesSocialesComponent } from './secciones-fijas-noticias-tendencias/components/redes-sociales/redes-sociales.component';
import { YoutubePipe } from './secciones-fijas-noticias-tendencias/components/pipes/youtube.pipe';
import { ButtonEditorComponent } from './secciones-fijas-noticias-tendencias/components/button-editor/button-editor.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    EditorComponent,
    PruebaComponent,
    PlantillaHeaderComponent,
    TextEditorComponent,
    TextEditorComponent,
    TemplateSwitchComponent,
    PlantillaCalendarioComponent,
    HomeComponent,
    PlantillaFooterComponent,
    SeccionFijaComponent,
    EditorNoticiasComponent,
    PlantillaSeisComponent,
    NoticiasTendenciasComponent,
    TemplateSwitchNewsTrendsComponent,
    PlantillaUnoNoticiasTendenciasComponent,
    PlantillaDosNoticiasTendenciasComponent,
    PlantillaTresNoticiasTendenciasComponent,
    PlantillaCuatroNoticiasTendenciasComponent,
    PlantillaCincoNoticiasTendenciasComponent,
    PlantillaSeisNoticiasTendenciasComponent,
    ProductosServiciosComponent,
    MercadoLibreComponent,
    GoogleTrendsComponent,
    CpSelectEditorComponent,
    ReportesTendenciasComponent,
    RedesSocialesComponent,
    YoutubePipe,
    ButtonEditorComponent,
    // TopSectionComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    NgbModule,
    PlantillasModule,
    HomeEditorRoutingModule,
    DragDropModule,
    SharedModuleModule,
    NgxSpinnerModule,
    CalendarioModule,
    SlickCarouselModule
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmationModalComponent
  ],
})
export class HomeEditorModule { }

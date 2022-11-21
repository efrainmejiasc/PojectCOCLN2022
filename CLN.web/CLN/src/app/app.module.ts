import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannersupComponent } from './_pages/bannersup/bannersup.component';
import { MenuComponent } from './_pages/_menu/menu.component';
import { BannerprincipalComponent } from './_pages/bannerprincipal/bannerprincipal.component';
import { EstrategiaComponent } from './_pages/estrategia/estrategia.component';
import { DiagnosticoComponent } from './_pages/diagnostico/diagnostico.component';
import { ContactoComponent } from './_pages/contacto/contacto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app-routing.module';
import { HomeComponent } from './_pages/home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileSelectDirective } from 'ng2-file-upload';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './_pages/_login/login.component';
import { ResultadosComponent } from './_pages/diagnostico/resultados/resultados.component';
import { PreguntasFrecuentesComponent } from './_pages/contacto/preguntas-frecuentes/preguntas-frecuentes.component';
import { AsistenciaComponent } from './_pages/contacto/asistencia/asistencia.component';
import { AdministracionComponent } from './_pages/administracion/administracion.component';
import { ChangePasswordComponent } from './_pages/_login/change-password/change-password.component';

import { RestorePasswordComponent } from './_pages/_login/restore-password/restore-password.component';
import { LayoutComponent } from './_pages/layout/layout.component';
import { SubmenuComponent } from './_pages/submenu/submenu.component';
import { MaterialModule } from './_pages/material/material.module'; //borrar
import { JwtInterceptor } from './_helper/jwt-interceptor';
import { QuillModule, QUILL_CONFIG_TOKEN } from 'ngx-quill';
import { PreguntasComponent } from './_pages/preguntas/preguntas.component';
import { CreateUserComponent } from './_pages/administracion/Modals/create-user/create-user.component';
import { PermitsviewComponent } from './_pages/administracion/Modals/permitsview/permitsview.component';
import { MenuDinamicoComponent } from './_pages/menu-dinamico/menu-dinamico.component';
import { DataMigrationComponent } from './_pages/administracion/Modals/data-migration/data-migration.component';

import { UploadFileDirective } from './_directives/upload/upload-file.directive';

// Modules
import { SharedModuleModule } from './_shared/module/shared-module/shared-module.module';

// Components

// Shared
import { DropDownRadioComponent } from './_shared/components/drop-down-radio/drop-down-radio.component';
import { FooterComponent } from './_shared/components/footer/footer.component';
import { MiscrositiosBannerComponent } from './_shared/components/miscrositios-banner/miscrositios-banner.component';
import { BarraNombreUsuarioComponent } from './_shared/components/barra-nombre-usuario/barra-nombre-usuario.component';
import { ViewHtmlComponent } from './_shared/modals/view-html/view-html.component';
import { ConfirmationModalComponent } from './_shared/modals/confirmation-modal/confirmation-modal.component';
import { AlertModalComponent } from './_shared/modals/alert-modal/alert-modal.component';
import { TableDynamicComponent } from './_shared/components/table-dynamic/table-dynamic.component';


//Componentes de compras públicas
import { LayoutService } from './_services/_compras-publicas/layoutService.service';
import { HomeAdminComponent } from './_pages/_home-admin/home-admin.component';
import { HomeEmpresaComponent } from './_pages/home-empresa/home-empresa.component';
import { LoginAdminComponent } from './_pages/_login-admin/login-admin.component';
import { DataService } from './_services/_compras-publicas/data.service';
import { SafeDOMPipe } from './_pipes/safe-dom.pipe';
import { LoadingComponent } from './_shared/components/loading/loading.component';
import { Auth2Service } from './_guards/auth2.service';
import { ErrorPageComponent } from './_pages/error-page/error-page.component';
import { GestionRelacionesSectorialesComponent } from './_pages/_gestion-relaciones-sectoriales/gestion-relaciones-sectoriales.component';
import { MenugrsComponent } from './_pages/_gestion-relaciones-sectoriales/menugrs/menugrs.component';
import { RegresarComponent } from './_shared/components/regresar/regresar.component';
import { CifrasCpComponent } from './_pages/_cifras-cp/cifras-cp.component';
import { ConsultarProcesosComponent } from './_pages/_consultar-procesos/consultar-procesos.component';
import { ConsultarPlanesComponent } from './_pages/_consultar-planes/consultar-planes.component';
import { EnvioAlertasComponent } from './_pages/_envio-alertas/envio-alertas.component';
import { OfertasComponent } from './_pages/_ofertas/ofertas.component';
import { GestionMisInteresesComponent } from './_pages/_gestion-mis-intereses/gestion-mis-intereses.component';
import { SeleccionEmpresaComponent } from './_pages/_gestion-mis-intereses/sections/seleccion-empresa/seleccion-empresa.component';
import { ProcesosCompraComponent } from './_pages/_gestion-mis-intereses/sections/procesos-compra/procesos-compra.component';
import { TopSectionComponent } from './_shared/_compras-publicas/components/top-section/top-section.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { CifrasCpPopupComponent } from './_pages/_cifras-cp/cifras-cp-popup/cifras-cp-popup.component';
import { MatTableModule } from '@angular/material/table';
import { CpSelectComponent } from './_shared/_compras-publicas/components/cp-select/cp-select.component';
import { CpInputBoxesComponent } from './_shared/_compras-publicas/components/cp-input-boxes/cp-input-boxes.component';
import { MailsComponent } from './_pages/mails/mails.component';
import { TopBarComponent } from './_pages/mails/components/top-bar/top-bar.component';
import { HiringCardComponent } from './_pages/mails/components/hiring-card/hiring-card.component';
import { ShoppingCardComponent } from './_pages/mails/components/shopping-card/shopping-card.component';
import { CardInfoEmpresaComponent } from './_shared/_compras-publicas/components/card-info-empresa/card-info-empresa.component';
import { OfferOptionsComponent } from './_shared/_compras-publicas/components/offer-options/offer-options.component';
import { DropDownCheckListComponent } from './_shared/_compras-publicas/components/drop-down-checklist/drop-down-checklist.component';
import { CpInputSearchComponent } from './_shared/_compras-publicas/components/cp-input-search/cp-input-search.component';
import { CpInputProductsComponent } from './_shared/_compras-publicas/components/cp-input-products/cp-input-products.component';
import { CpValuesComponent } from './_shared/_compras-publicas/components/cp-values/cp-values.component';
import { CpSelectEmpresasComponent } from './_shared/_compras-publicas/components/cp-select-empresas/cp-select-empresas.component';
import { DetallesComponent } from './_pages/_ofertas/components/detalles/detalles.component';
import { DetallesAdquisicionesComponent } from './_pages/_ofertas/components/detalles-adquisiciones/detalles-adquisiciones.component';
import { LimitedListPipe } from './_pipes/limited-list.pipe';
import { SafePipe } from './_pipes/safe.pipe';
import { ConsolidadoComponent } from './_pages/_cifras-cp/components/consolidado/consolidado.component';
import { NotificacionesComponent } from './_pages/_gestion-mis-intereses/sections/notificaciones/notificaciones.component';
import { PlanesAnualesComponent } from './_pages/_gestion-mis-intereses/sections/planes-anuales/planes-anuales.component';
import { CpInputProductsAcquisitionPlansComponent } from './_shared/_compras-publicas/components/cp-input-products-acquisition-plans/cp-input-products-acquisition-plans.component';
import { CpInputBoxesAcquisitionPlansComponent } from './_shared/_compras-publicas/components/cp-input-boxes-acquisition-plans/cp-input-boxes-acquisition-plans.component';
import { CpInputSearchAcquisitionPlansComponent } from './_shared/_compras-publicas/components/cp-input-search-acquisition-plans/cp-input-search-acquisition-plans.component';
import { PopupConfirmationComponent } from './_shared/_compras-publicas/components/popup-confirmation/popup-confirmation.component';
import { TextInputSearchComponent } from './_shared/_compras-publicas/components/text-input-search/text-input-search.component';
import { DetalleProcesoComponent } from './_pages/_consultar-procesos/components/detalle-proceso/detalle-proceso.component';

import { CustomInputComponent } from './_shared/_compras-publicas/components/custom-input/custom-input.component';
import { CustomDatePickerComponent } from './_shared/_compras-publicas/components/custom-date-picker/custom-date-picker.component';

import { MailsAlertasAutomaticasComponent } from './_pages/mails-alertas-automaticas/mails-alertas-automaticas.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { PopupCambiosComponent } from './_shared/_compras-publicas/components/popup-cambios/popup-cambios.component';
import { ButtonComponent } from './_shared/_compras-publicas/components/button/button.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import { UploadTextComponent } from './_shared/_compras-publicas/components/upload-text/upload-text.component';
import { UploadImageComponent } from './_shared/_compras-publicas/components/upload-image/upload-image.component';
import { ListadoComponent } from './_pages/_envio-alertas/components/listado/listado.component';
import { FormularioComponent } from './_pages/_envio-alertas/components/formulario/formulario.component';
import { SmsComponent } from './_pages/_envio-alertas/components/formulario/components/sms/sms.component';
import { EmailComponent } from './_pages/_envio-alertas/components/formulario/components/email/email.component';
import { CustomTextAreaComponent } from './_shared/_compras-publicas/components/custom-text-area/custom-text-area.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { GestionarDisponibilidadComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/gestionar-disponibilidad.component';
import { InvitarCitasComponent } from './_pages/_invitar-citas/invitar-citas/invitar-citas.component';
import { GestionarCitaInvitadoComponent } from './_pages/_gestionar-cita-invitado/gestionar-cita-invitado/gestionar-cita-invitado.component';
import { GestionarCitaAnfitrionComponent } from './_pages/_gestionar-cita-anfitrion/gestionar-cita-anfitrion/gestionar-cita-anfitrion.component';
import { AdministrarConclusionesComponent } from './_pages/_administrar-conclusiones/administrar-conclusiones/administrar-conclusiones.component';
import { EncabezadoCitasComponent } from './_shared/_compras-publicas/components/encabezado-citas/encabezado-citas.component';
import { ComoFuncionaComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/components/como-funciona/como-funciona.component';
import { EstablecerDisponibilidadComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/components/establecer-disponibilidad/establecer-disponibilidad.component';
import { CitasProgramadasComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/components/citas-programadas/citas-programadas.component';
import { PopupCalendarioCitasComponent } from './_shared/_compras-publicas/components/popup-calendario-citas/popup-calendario-citas.component';
import { CustomSelectComponent } from './_shared/_compras-publicas/components/custom-select/custom-select.component';
import { PopupCalendarioDisponibilidadComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/components/establecer-disponibilidad/components/popup-calendario-disponibilidad/popup-calendario-disponibilidad.component';
import { CitasAdministrarFormularioConclusionesComponent } from './_pages/_citas-administrar-formulario-conclusiones/citas-administrar-formulario-conclusiones.component';
import { ConclusionsFormComponent } from './_pages/_citas-administrar-formulario-conclusiones/conclusions-form/conclusions-form.component';
import { CitasInvitarANegociosVirtualesComponent } from './_pages/_citas-invitar-a-negocios-virtuales/citas-invitar-a-negocios-virtuales.component';
import { CalendarioCitasCoincideDisponibilidadComponent } from './_shared/_compras-publicas/components/calendario-citas-coincide-disponibilidad/calendario-citas-coincide-disponibilidad.component';
import { CitasAnfitrionComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/components/citas-programadas/components/citas-anfitrion/citas-anfitrion.component';
import { CitasInvitadoComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/components/citas-programadas/components/citas-invitado/citas-invitado.component';
import { GenerarReportesCitasComponent } from './_pages/_generar-reportes-citas/generar-reportes-citas.component';
import { ReprogramarCitasComponent } from './_pages/_reprogramar-citas/reprogramar-citas/reprogramar-citas.component';
import { SelectorReportCitasComponent } from './_pages/_generar-reportes-citas/components/selector-report-citas/selector-report-citas.component';
import { ReprogramarCitasAnfitrionComponent } from './_pages/_reprogramar-citas/reprogramar-citas-anfitrion/reprogramar-citas-anfitrion.component';
import { CaptativeComponent } from './_pages/_captative/captative/captative.component';
import { HomeCComponent } from './_pages/cadena-abastecimiento/components/home/home.component';
import { FormSupplyChainComponent } from './_pages/cadena-abastecimiento/components/form-supply-chain/form-supply-chain.component';
import { ComoCrearComponent } from './_pages/cadena-abastecimiento/components/home/components/como-crear/como-crear.component';
import { SimuladorComponent } from './_pages/cadena-abastecimiento/components/home/components/simulador/simulador.component';
import { CrearEditarCadenaComponent } from './_pages/cadena-abastecimiento/components/home/components/crear-editar-cadena/crear-editar-cadena.component';
import { HeaderCadenaComponent } from './_pages/cadena-abastecimiento/components/home/components/header-cadena/header-cadena.component';
import { FooterCadenaComponent } from './_pages/cadena-abastecimiento/components/home/components/footer-cadena/footer-cadena.component';
import { HeaderDisponibilidadComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/components/header-disponibilidad/header-disponibilidad.component';

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 0,
  prefix: "$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    BannersupComponent,
    MenuComponent,
    BannerprincipalComponent,
    EstrategiaComponent,
    DiagnosticoComponent,
    ContactoComponent,
    FooterComponent,
    HomeComponent,
    DropDownRadioComponent,
    LoginComponent,
    ResultadosComponent,
    PreguntasFrecuentesComponent,
    AsistenciaComponent,
    AdministracionComponent,
    ChangePasswordComponent,
    RestorePasswordComponent,
    LayoutComponent,
    SubmenuComponent,
    MiscrositiosBannerComponent,
    BarraNombreUsuarioComponent,
    PreguntasComponent,
    CreateUserComponent,
    PermitsviewComponent,
    ViewHtmlComponent,
    MenuDinamicoComponent,
    TableDynamicComponent,
    DataMigrationComponent,
    UploadFileDirective,
    HomeAdminComponent,
    HomeEmpresaComponent,
    LoginAdminComponent,
    SafeDOMPipe,
    LoadingComponent,
    ErrorPageComponent,
    GestionRelacionesSectorialesComponent,
    MenugrsComponent,
    RegresarComponent,
    CifrasCpComponent,
    ConsultarProcesosComponent,
    ConsultarPlanesComponent,
    EnvioAlertasComponent,
    OfertasComponent,
    GestionMisInteresesComponent,
    SeleccionEmpresaComponent,
    ProcesosCompraComponent,
    TopSectionComponent,
    CifrasCpPopupComponent,
    CpSelectComponent,
    CpInputBoxesComponent,
    MailsComponent,
    TopBarComponent,
    HiringCardComponent,
    ShoppingCardComponent,
    CardInfoEmpresaComponent,
    OfferOptionsComponent,
    DropDownCheckListComponent,
    CifrasCpPopupComponent,
    CpSelectComponent,
    CpInputBoxesComponent,
    CpInputSearchComponent,
    CpInputProductsComponent,
    CpValuesComponent,
    CpSelectEmpresasComponent,
    DetallesComponent,
    DetallesAdquisicionesComponent,
    LimitedListPipe,
    SafePipe,
    ConsolidadoComponent,
    NotificacionesComponent,
    PlanesAnualesComponent,
    CpValuesComponent,
    CpSelectEmpresasComponent,
    DetallesComponent,
    DetallesAdquisicionesComponent,
    LimitedListPipe,
    NotificacionesComponent,
    PlanesAnualesComponent,
    CpInputProductsAcquisitionPlansComponent,
    CpInputBoxesAcquisitionPlansComponent,
    CpInputSearchAcquisitionPlansComponent,
    SafePipe,
    ConsolidadoComponent,
    NotificacionesComponent,
    PlanesAnualesComponent,
    PopupConfirmationComponent,
    TextInputSearchComponent, 
    DetalleProcesoComponent, 
    CustomInputComponent, 
    CustomDatePickerComponent,
    MailsAlertasAutomaticasComponent,
    PopupCambiosComponent,
    ButtonComponent,
    UploadTextComponent,
    UploadImageComponent,
    ListadoComponent,
    FormularioComponent,
    SmsComponent,
    EmailComponent,
    CustomTextAreaComponent,  
    // NoticiasTendenciasComponent
    GestionarDisponibilidadComponent,
    InvitarCitasComponent,
    GestionarCitaInvitadoComponent,
    GestionarCitaAnfitrionComponent,
    AdministrarConclusionesComponent,
    EncabezadoCitasComponent,
    ComoFuncionaComponent,
    EstablecerDisponibilidadComponent,
    CitasProgramadasComponent,
    PopupCalendarioCitasComponent,
    CustomSelectComponent,
    PopupCalendarioDisponibilidadComponent,
    CitasAdministrarFormularioConclusionesComponent,
    ConclusionsFormComponent,
    CitasInvitarANegociosVirtualesComponent,
    CalendarioCitasCoincideDisponibilidadComponent,
    CitasAnfitrionComponent,
    CitasInvitadoComponent,
    GenerarReportesCitasComponent,
    ReprogramarCitasComponent, 
    SelectorReportCitasComponent, ReprogramarCitasAnfitrionComponent, CaptativeComponent, 
    HomeCComponent, 
    FormSupplyChainComponent, 
    ComoCrearComponent, 
    SimuladorComponent, 
    CrearEditarCadenaComponent, HeaderCadenaComponent, FooterCadenaComponent, HeaderDisponibilidadComponent

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule,
    MatButtonModule,
    MaterialModule,
    QuillModule.forRoot(QUILL_CONFIG_TOKEN.ngInjectableDef),
    SharedModuleModule,
    LeafletModule,
    MatGridListModule,
    MatTableModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    AngularEditorModule
  ],
  entryComponents: [
    PermitsviewComponent,
    ViewHtmlComponent,
    ConfirmationModalComponent,
    AlertModalComponent,
    ConfirmationModalComponent,
    CreateUserComponent,
    CifrasCpPopupComponent,
    DetallesComponent,
    DetallesAdquisicionesComponent,
    ConsolidadoComponent,
    DetalleProcesoComponent,
  ],
  exports: [FormsModule, ReactiveFormsModule,],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    LayoutService,
    DataService,
    Auth2Service,
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannersupComponent } from './_pages/bannersup/bannersup.component';
import { MenuComponent } from './_pages/_menu/menu.component';
import { BannerprincipalComponent } from './_pages/bannerprincipal/bannerprincipal.component';
import { EstrategiaComponent } from './_pages/estrategia/estrategia.component';
import { DiagnosticoComponent } from './_pages/diagnostico/diagnostico.component';
import { ContactoComponent } from './_pages/contacto/contacto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app-routing.module';
import { HomeComponent } from './_pages/home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileSelectDirective } from 'ng2-file-upload';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './_pages/_login/login.component';
import { ResultadosComponent } from './_pages/diagnostico/resultados/resultados.component';
import { PreguntasFrecuentesComponent } from './_pages/contacto/preguntas-frecuentes/preguntas-frecuentes.component';
import { AsistenciaComponent } from './_pages/contacto/asistencia/asistencia.component';
import { AdministracionComponent } from './_pages/administracion/administracion.component';
import { ChangePasswordComponent } from './_pages/_login/change-password/change-password.component';
import { GestionUsuariosComponent } from './_pages/administracion/gestion-usuarios/gestion-usuarios.component';
import { RestorePasswordComponent } from './_pages/_login/restore-password/restore-password.component';
import { LayoutComponent } from './_pages/layout/layout.component';
import { SubmenuComponent } from './_pages/submenu/submenu.component';
import { MaterialModule } from './_pages/material/material.module'; //borrar
import { JwtInterceptor } from './_helper/jwt-interceptor';
import { QuillModule } from 'ngx-quill';
import { PreguntasComponent } from './_pages/preguntas/preguntas.component';
import { CreateUserComponent } from './_pages/administracion/Modals/create-user/create-user.component';
import { PermitsviewComponent } from './_pages/administracion/Modals/permitsview/permitsview.component';
import { MenuDinamicoComponent } from './_pages/menu-dinamico/menu-dinamico.component';
import { DataMigrationComponent } from './_pages/administracion/Modals/data-migration/data-migration.component';

import { UploadFileDirective } from './_directives/upload/upload-file.directive';

// Modules
import { SharedModuleModule } from './_shared/module/shared-module/shared-module.module';

// Components

// Shared
import { DropDownRadioComponent } from './_shared/components/drop-down-radio/drop-down-radio.component';
import { FooterComponent } from './_shared/components/footer/footer.component';
import { MiscrositiosBannerComponent } from './_shared/components/miscrositios-banner/miscrositios-banner.component';
import { BarraNombreUsuarioComponent } from './_shared/components/barra-nombre-usuario/barra-nombre-usuario.component';
import { ViewHtmlComponent } from './_shared/modals/view-html/view-html.component';
import { ConfirmationModalComponent } from './_shared/modals/confirmation-modal/confirmation-modal.component';
import { AlertModalComponent } from './_shared/modals/alert-modal/alert-modal.component';
import { TableDynamicComponent } from './_shared/components/table-dynamic/table-dynamic.component';
import { LayoutService } from './_services/_compras-publicas/layoutService.service';
import { HomeAdminComponent } from './_pages/_home-admin/home-admin.component';
import { HomeEmpresaComponent } from './_pages/home-empresa/home-empresa.component';
import { LoginAdminComponent } from './_pages/_login-admin/login-admin.component';
import { DataService } from './_services/_compras-publicas/data.service';
import { SafeDOMPipe } from './_pipes/safe-dom.pipe';
import { LoadingComponent } from './_shared/components/loading/loading.component';
import { Auth2Service } from './_guards/auth2.service';
import { ErrorPageComponent } from './_pages/error-page/error-page.component';
import { GestionRelacionesSectorialesComponent } from './_pages/_gestion-relaciones-sectoriales/gestion-relaciones-sectoriales.component';
import { MenugrsComponent } from './_pages/_gestion-relaciones-sectoriales/menugrs/menugrs.component';
import { RegresarComponent } from './_shared/components/regresar/regresar.component';
import { CifrasCpComponent } from './_pages/cifras-cp/cifras-cp.component';
import { ConsultarProcesosComponent } from './_pages/consultar-procesos/consultar-procesos.component';
import { ConsultarPlanesComponent } from './_pages/consultar-planes/consultar-planes.component';
import { EnvioAlertasComponent } from './_pages/envio-alertas/envio-alertas.component';
import { OfertasComponent } from './_pages/ofertas/ofertas.component';
import { GestionMisInteresesComponent } from './_pages/_gestion-mis-intereses/gestion-mis-intereses.component';
import { InterestsComponent } from './_pages/interests/interests.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CifrasCpPopupComponent } from './_pages/cifras-cp/cifras-cp-popup/cifras-cp-popup.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    BannersupComponent,
    MenuComponent,
    BannerprincipalComponent,
    EstrategiaComponent,
    DiagnosticoComponent,
    ContactoComponent,
    FooterComponent,
    HomeComponent,
    DropDownRadioComponent,
    LoginComponent,
    ResultadosComponent,
    PreguntasFrecuentesComponent,
    AsistenciaComponent,
    AdministracionComponent,
    ChangePasswordComponent,
    GestionUsuariosComponent,
    RestorePasswordComponent,
    LayoutComponent,
    SubmenuComponent,
    MiscrositiosBannerComponent,
    BarraNombreUsuarioComponent,
    PreguntasComponent,
    CreateUserComponent,
    PermitsviewComponent,
    ViewHtmlComponent,
    MenuDinamicoComponent,
    TableDynamicComponent,
    DataMigrationComponent,
    UploadFileDirective,
    HomeAdminComponent,
    HomeEmpresaComponent,
    LoginAdminComponent,
    SafeDOMPipe,
    LoadingComponent,
    ErrorPageComponent,
    GestionRelacionesSectorialesComponent,
    MenugrsComponent,
    RegresarComponent,
    CifrasCpComponent,
    ConsultarProcesosComponent,
    ConsultarPlanesComponent,
    EnvioAlertasComponent,
    OfertasComponent,
    GestionMisInteresesComponent,
    InterestsComponent,
    CifrasCpPopupComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule,
    MatButtonModule,
    MaterialModule,
    QuillModule,
    SharedModuleModule,
    LeafletModule,
    MatGridListModule,
    MatTableModule,
  ],
  entryComponents: [
    PermitsviewComponent,
    ViewHtmlComponent,
    ConfirmationModalComponent,
    AlertModalComponent,
    ConfirmationModalComponent,
    CreateUserComponent,
    CifrasCpPopupComponent
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    LayoutService,
    DataService,
    Auth2Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 */

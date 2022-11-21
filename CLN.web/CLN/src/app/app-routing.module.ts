import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import { LayoutComponent } from './_pages/layout/layout.component'
import { HomeAdminComponent } from './_pages/_home-admin/home-admin.component';
import { LoginAdminComponent } from './_pages/_login-admin/login-admin.component';
import { CifrasCpComponent } from './_pages/_cifras-cp/cifras-cp.component';

import { ErrorPageComponent } from './_pages/error-page/error-page.component';
import { CitasInvitarANegociosVirtualesComponent } from './_pages/_citas-invitar-a-negocios-virtuales/citas-invitar-a-negocios-virtuales.component';
import { ConsultarProcesosComponent } from './_pages/_consultar-procesos/consultar-procesos.component';
import { ConsultarPlanesComponent } from './_pages/_consultar-planes/consultar-planes.component';
import { EnvioAlertasComponent } from './_pages/_envio-alertas/envio-alertas.component';
import { GestionRelacionesSectorialesComponent } from './_pages/_gestion-relaciones-sectoriales/gestion-relaciones-sectoriales.component';
import { OfertasComponent } from './_pages/_ofertas/ofertas.component';
import { GestionMisInteresesComponent } from './_pages/_gestion-mis-intereses/gestion-mis-intereses.component';
import { FormularioComponent } from './_pages/_envio-alertas/components/formulario/formulario.component';
import { GestionarDisponibilidadComponent } from './_pages/_gestionar-disponibilidad/gestionar-disponibilidad/gestionar-disponibilidad.component';
import { CitasAdministrarFormularioConclusionesComponent } from './_pages/_citas-administrar-formulario-conclusiones/citas-administrar-formulario-conclusiones.component';
import { GenerarReportesCitasComponent } from './_pages/_generar-reportes-citas/generar-reportes-citas.component';
import { ReprogramarCitasComponent } from './_pages/_reprogramar-citas/reprogramar-citas/reprogramar-citas.component';
import { ReprogramarCitasAnfitrionComponent } from './_pages/_reprogramar-citas/reprogramar-citas-anfitrion/reprogramar-citas-anfitrion.component';
import { HomeCComponent } from './_pages/cadena-abastecimiento/components/home/home.component';
import { environment } from 'src/environments/environment';
import { AuthServicios } from './_guards/auth.servicios';
import { AuthCompras } from './_guards/auth.compras';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('./_pages/home-editor/home-editor.module').then(m => m.HomeEditorModule)
      },
      {
        path: 'editor',
        loadChildren: () => import('./_pages/home-editor/home-editor.module').then(m => m.HomeEditorModule)
      },
      {
        path: 'login-admin',
        canActivate: [AuthServicios],
        component: LoginAdminComponent,
      },
      {
        path: 'panel',
        component: HomeAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'report-analysis',
        canActivate: [AuthCompras],
        component: CifrasCpComponent
      },
      {
        path: 'contracting-process',
        canActivate: [AuthCompras],
        component:ConsultarProcesosComponent
      },
      {
        path: 'annual-acquisition-plans',
        canActivate: [AuthCompras],
        component:ConsultarPlanesComponent
      },
      {
        path: 'alerts-management',
        canActivate: [AuthServicios, AuthGuard],
        component:EnvioAlertasComponent
      },
      {
        path: 'alerts-form/:id',
        canActivate: [AuthServicios, AuthGuard],
        component:FormularioComponent
      },
      {
        path: 'alerts-form',
        canActivate: [AuthServicios, AuthGuard],
        component:FormularioComponent
      },
      {
        path: 'sector-relationships',
        canActivate: [AuthServicios, AuthGuard],
        component:GestionRelacionesSectorialesComponent
      },
      {
        path: 'my-offers',
        canActivate: [AuthCompras, AuthGuard],
        component:OfertasComponent
      },
      {
        path: 'interests-managment',
        canActivate: [AuthCompras, AuthGuard],
        component:GestionMisInteresesComponent
      },
      {
        path: 'manage-availability',
        canActivate: [AuthServicios],
        component:GestionarDisponibilidadComponent
      },
      {
        path: 'manage-appointment-conclusions-form',
        canActivate: [AuthServicios, AuthGuard],
        component: CitasAdministrarFormularioConclusionesComponent
      },
      {
        path: 'schedule-virtual-appointments',
        canActivate: [AuthServicios],
        component: CitasInvitarANegociosVirtualesComponent
      },
      {
        path: 'appointment-reports',
        canActivate: [AuthServicios, AuthGuard],
        component: GenerarReportesCitasComponent
      },
      {
        path: 'reschedule-appointments',
        canActivate: [AuthServicios],
        component: ReprogramarCitasComponent
      },
      {
        path: 'reschedule-appointments-host',
        canActivate: [AuthServicios],
        component: ReprogramarCitasAnfitrionComponent
      },
      {
        path: 'supply-chain',
        canActivate: [AuthServicios],
        component: HomeCComponent
      },
      { 
        path: 'not-found', 
        component: ErrorPageComponent, 
        data: {
          message: 'Page not found'
        } 
      },
      { 
        path: '**', 
        redirectTo: '/not-found' 
      },
    ]
  },
];


export const routing = RouterModule.forRoot(routes,
  {
    onSameUrlNavigation: 'reload', 
    enableTracing: false,// <-- debugging purposes only
    // scrollPositionRestoration: 'enabled'
  }
);
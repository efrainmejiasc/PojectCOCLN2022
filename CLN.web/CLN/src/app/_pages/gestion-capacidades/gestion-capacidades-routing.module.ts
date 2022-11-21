import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualizarGuiaComponent } from './components/actualizar-guia/actualizar-guia.component';
import { AutodiagnosticoComponent } from './components/autodiagnostico/autodiagnostico.component';
import { CapacidadesComponent } from './components/capacidades/capacidades.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

const routes: Routes = [
  {
    path: '',
    component: CapacidadesComponent
  },
  {
    path:'actualizar',
    component: ActualizarGuiaComponent
  },
  {
    path:'autodiagnostico',
    component: AutodiagnosticoComponent
  },
  {
    path:'autodiagnostico/resultado',
    component: ResultadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCapacidadesRoutingModule { }

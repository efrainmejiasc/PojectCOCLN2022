import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionComponent } from './components/gestion/gestion.component';
import { CrearComponent } from './components/crear/crear.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';
import { GestionarUtilidadComponent } from './Modals/gestionar-utilidad/gestionar-utilidad.component';


const routes: Routes = [
  {
    path: '',
    component: GestionComponent
  },
  {
    path: 'gestionar',
    component: GestionarUtilidadComponent
  },
  {
    path: 'crear-editar',
    component: CrearComponent
  },
  {
    path: 'ver',
    component: VisualizarComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionPreguntasFrecuentesRoutingModule { }

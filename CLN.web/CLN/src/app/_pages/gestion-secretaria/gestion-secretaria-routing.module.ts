import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroViewComponent } from './components/tablero-view/tablero-view.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';

const routes: Routes = [
  {
    path: '',
    component: VisualizarComponent
  },
  {
    path: 'secretarias',
    component: VisualizarComponent
  },
  {
    path: 'cifras',
    component: TableroViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSecretariaRoutingModule { }

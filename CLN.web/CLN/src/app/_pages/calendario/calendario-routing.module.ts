import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { VisualizacionComponent } from './components/visualizacion/visualizacion.component';
import { CalendarioAdminComponent } from './components/calendario-admin/calendario-admin.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    component: CalendarioAdminComponent
  }, {
    path: 'publico',
    component: VisualizacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarioRoutingModule { }

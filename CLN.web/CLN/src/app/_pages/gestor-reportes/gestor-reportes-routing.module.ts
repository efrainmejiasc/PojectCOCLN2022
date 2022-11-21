import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionReportesComponent } from './components/gestion-reportes/gestion-reportes.component';
import { VerReportesComponent } from './components/ver-reportes/ver-reportes.component';
import { ViewReportComponent } from './Modals/view-report/view-report.component';


const routes: Routes = [
  {
    path: '',
    component: GestionReportesComponent
  },
  {
    path: 'ver',
    component: VerReportesComponent
  }, 
  {
    path: 'report/:id',
    component: ViewReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorReportesRoutingModule { }

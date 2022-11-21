import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioComponent } from './components/calendario/calendario.component';


const routes: Routes = [{
    path: 'calendario/:id',
    component: CalendarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlugMicrositiosRoutingModule { }

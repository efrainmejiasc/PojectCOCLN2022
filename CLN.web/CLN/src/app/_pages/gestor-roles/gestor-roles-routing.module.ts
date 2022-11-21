import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionGruposRolesComponent } from './components/gestion-grupos-roles/gestion-grupos-roles.component';
import { GestionRolesComponent } from './components/gestion-roles/gestion-roles.component';

const routes: Routes = [
  {
    path: '',
    component: GestionRolesComponent
  },
  {
    path:'grupos',
    component: GestionGruposRolesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    
  ],
  exports: [RouterModule]
})

export class GestorRolesRoutingModule {}

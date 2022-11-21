import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContenidosMenuComponent } from './components/contenidos-menu/contenidos-menu.component';
import { ContenidosComponent } from './components/contenidos/contenidos.component';
import { ContenidosTemaComponent } from './components/contenidos-tema/contenidos-tema.component';
import { ContenidosBibliotecaComponent } from './components/contenidos-biblioteca/contenidos-biblioteca.component';

const routes: Routes = [
  {
    path: '',
    component: ContenidosMenuComponent
  },
  {
    path: 'contenidos',
    component: ContenidosComponent
  },
  {
    path: 'temas',
    component: ContenidosTemaComponent
  },  {
    path: 'bibliotecas',
    component: ContenidosBibliotecaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class GestorContenidosRoutingModule {}

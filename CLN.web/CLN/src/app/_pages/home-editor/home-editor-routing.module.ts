import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { EditorNoticiasComponent } from './components/editor-noticias/editor-noticias.component';
import { NoticiasTendenciasComponent } from './components/noticias-tendencias/noticias-tendencias.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { environment } from 'src/environments/environment';
import { AuthServicios } from 'src/app/_guards/auth.servicios';
import { AuthCompras } from 'src/app/_guards/auth.compras';


const routes: Routes = [
  {
    path: 'editorHome',
    canActivate: [AuthServicios, AuthGuard],
    component: EditorComponent
  },
  // {
  //   path: 'prueba',
  //   canActivate: [AuthServicios],
  //   component: PruebaComponent
  // },
  {
    path: '',
    canActivate: [AuthCompras],
    component: HomeComponent
  },
  {
    path: 'editor-news-trends',
    canActivate: [AuthServicios, AuthGuard],
    component: EditorNoticiasComponent
  },
  {
    path: 'news-trends',
    // canActivate: [AuthCompras],
    component: NoticiasTendenciasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeEditorRoutingModule { }
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

// Models
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';

// Components
import { TemasFormComponent } from '../../../_pages/gestor-contenidos/modals/temas-form/temas-form.component';
import { BibliotecasFormComponent } from '../../../_pages/gestor-contenidos/modals/bibliotecas-form/bibliotecas-form.component';
import { ContenidosFormComponent } from '../../../_pages/gestor-contenidos/modals/contenidos-form/contenidos-form.component';
import { RolComponent } from 'src/app/_pages/gestor-roles/Modals/rol/rol.component';
import { GestionarGrupoRolComponent } from 'src/app/_pages/gestor-roles/Modals/gestionar-grupo-rol/gestionar-grupo-rol.component';
import { CrearEditarComponent } from 'src/app/_pages/gestion-secretaria/components/crear-editar/crear-editar.component';
import { TableroFormComponent } from 'src/app/_pages/gestion-secretaria/modals/tablero-form/tablero-form.component';

@Component({
  selector: 'app-contenidos-titulo',
  templateUrl: './contenidos-titulo.component.html',
  styleUrls: ['./contenidos-titulo.component.scss',
    "../../styles/modals.scss"]
})
export class ContenidosTituloComponent implements OnInit {

  @Input() titulo: string[];
  @Output() evento = new EventEmitter<string>();
  @Output() eventoReturn = new EventEmitter<any>();
  @Input() permitsUser: permitsUserFetch;

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() { }

  openDialog(titulo: string) {
    const dialogRef = this.modalService.open(
      titulo === 'Crear tema' ? TemasFormComponent :
        titulo === 'Crear biblioteca' ? BibliotecasFormComponent :
          titulo === 'Cargar contenido' ? ContenidosFormComponent :
            titulo === 'Crear rol' ? RolComponent :
              titulo === 'Cargar secretaría' ? CrearEditarComponent :
                titulo === 'Cargar tablero' ? TableroFormComponent :
                  titulo === 'Crear grupos de roles' ? GestionarGrupoRolComponent : '',
      {
        size: 'xl',
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
    dialogRef.componentInstance.sendedData = titulo;
    dialogRef.result.then((yes) => {
      switch (titulo) {
        case 'Cargar contenido':
        case 'Crear grupos de roles':
          this.evento.next(yes);
          break;
        case 'Cargar secretaría':
          this.eventoReturn.emit(yes)
          break;
        case 'Cargar tablero':
          this.eventoReturn.emit(yes)
          break;
        default:
          this.evento.next();
          break;
      }
    },
      (cancel) => {
      });

  }

  public actionRouterButton(routerType) {
    switch (routerType) {
      case "grupos":
        this.router.navigate(["gestionroles/" + routerType])
        break;
    }
  }
}
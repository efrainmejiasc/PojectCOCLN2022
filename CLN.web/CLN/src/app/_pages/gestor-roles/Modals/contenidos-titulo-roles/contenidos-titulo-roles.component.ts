import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { GestionarGrupoRolComponent } from '../gestionar-grupo-rol/gestionar-grupo-rol.component';
import { RolComponent } from '../rol/rol.component';

@Component({
  selector: 'app-contenidos-titulo-roles',
  templateUrl: './contenidos-titulo-roles.component.html',
  styleUrls: ['./contenidos-titulo-roles.component.scss',
  "../../../../_shared/styles/modals.scss"]
})
export class ContenidosTituloRolesComponent implements OnInit {

  @Input() titulo: string[];
  @Output() evento = new EventEmitter<string>();
  @Input() permitsUser: permitsUserFetch;

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
  }

  openDialog(titulo: string) {
    const dialogRef = this.modalService.open(
            titulo === 'Crear rol' ? RolComponent :
              titulo === 'Crear grupos de roles' ? GestionarGrupoRolComponent : '',
      { size: 'xl', centered: true });
    dialogRef.componentInstance.sendedData = titulo;
    dialogRef.result.then((yes) => {
      switch (titulo) {
        case 'Crear grupos de roles':
          this.evento.next(yes);
          break;
        default:
          this.evento.next();
          break;
      }
    },
      (cancel) => { });
  }

  public actionRouterButton(routerType) {
    switch (routerType) {
      case "grupos":
        this.router.navigate(["gestionroles/" + routerType])
        break;
    }
  }

}

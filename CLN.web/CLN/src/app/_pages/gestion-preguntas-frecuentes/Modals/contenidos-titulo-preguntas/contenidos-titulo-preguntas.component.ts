import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { CrearComponent } from '../../components/crear/crear.component';
import { UtilidadComponent } from '../utilidad/utilidad.component';

@Component({
  selector: 'app-contenidos-titulo-preguntas',
  templateUrl: './contenidos-titulo-preguntas.component.html',
  styleUrls: ['./contenidos-titulo-preguntas.component.scss',
    "../../../../_shared/styles/modals.scss"]
})
export class ContenidosTituloPreguntasComponent implements OnInit {
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
      titulo === 'Crear pregunta' ? CrearComponent : titulo === 'Crear utilidad' ? UtilidadComponent : "",
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

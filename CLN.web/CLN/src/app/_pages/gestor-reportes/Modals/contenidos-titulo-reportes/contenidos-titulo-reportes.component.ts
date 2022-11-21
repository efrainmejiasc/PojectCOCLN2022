import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { ReportesComponent } from '../reportes/reportes.component';

@Component({
  selector: 'app-contenidos-titulo-reportes',
  templateUrl: './contenidos-titulo-reportes.component.html',
  styleUrls: ['./contenidos-titulo-reportes.component.scss',
    "../../../../_shared/styles/modals.scss"]
})
export class ContenidosTituloReportesComponent implements OnInit {

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
      titulo === 'Cargar reporte/consulta/tablero' ? ReportesComponent : '',
      { size: 'xl', centered: true });
    dialogRef.componentInstance.sendedData = titulo;
    dialogRef.result.then((yes) => {
      switch (yes) {
        case "no-roles":
          this.evento.next("no-roles");
          break;
        default:
          this.evento.next(yes);
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

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView } from 'angular-calendar';
import { format } from 'date-fns';
import { TipoEventoService } from 'src/app/_services/calendario/tipo-evento.service';

@Component({
  selector: 'app-tipo-evento-list',
  templateUrl: './tipo-evento-list.component.html',
  styleUrls: ['./tipo-evento-list.component.scss']
})
export class TipoEventoListComponent implements OnInit {

  view: CalendarView;
  viewDate: Date = new Date();

  tipoEventos: any[] = [];

  constructor(
    public modal: NgbActiveModal,
    private tipoEventoService: TipoEventoService
  ) { }

  ngOnInit() {
    switch (this.view) {
      case CalendarView.Month: {
         this.fetchTipoEventosMensual();
         break;
      }
      case CalendarView.Day: {
         this.fetchTipoEventosDiario();
         break;
      }
      default: {
         this.fetchTipoEventosSemanal();
         break;
      }
   }
  }

  fetchTipoEventosMensual() {
    this.tipoEventoService.getEventTypesbyMonth(format(this.viewDate, 'yyyy-MM-dd'))
      .subscribe(response => {
        this.tipoEventos = response;
      });
  }

  fetchTipoEventosSemanal() {
    this.tipoEventoService.getEventTypesbyDefault(format(this.viewDate, 'yyyy-MM-dd'))
      .subscribe(response => {
        this.tipoEventos = response;
      });
  }

  fetchTipoEventosDiario() {
    this.tipoEventoService.getEventTypesbyDay(format(this.viewDate, 'yyyy-MM-dd'))
      .subscribe(response => {
        this.tipoEventos = response;
      });
  }

}

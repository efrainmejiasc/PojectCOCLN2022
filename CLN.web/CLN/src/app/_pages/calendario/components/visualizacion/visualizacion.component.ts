import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';

// Services
import { CalendarioService } from 'src/app/_services/calendario/calendario.service';

// Utils
import { CalendarConfig } from '../../utils/calendar-config';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.scss']
})
export class VisualizacionComponent implements OnInit {

  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [{
    label: '<img src="assets/iconos/men/evs-ojo.svg" alt="Visualizar" class="link-btn-calendario">',
    a11yLabel: 'Visualizar',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.getEventDetail(event.id.toString());
    }
  }];
  evento: CalendarEvent;

  constructor(
    private calendarioService: CalendarioService
  ) {}

  ngOnInit() {
    this.fetchEventos();
  }

  fetchEventos() {
    const currentDate = new Date();
    this.calendarioService
      .getEventbyYear(currentDate.toDateString())
      .subscribe(response => {
        response.forEach(evento => {
          this.events = [
            ...this.events,
            CalendarConfig.convertinit(evento, this.actions)
          ];
        });
      });
    const nextyear = new Date(currentDate.getFullYear() + 1, 0, 1);
    this.calendarioService.getEventbyMonth(nextyear.toDateString())
    .subscribe(response => {
      response.forEach(evento => {
        this.events = [
          ...this.events,
          CalendarConfig.convertinit(evento, this.actions)
        ];
      });
    });
  }

  getEventDetail(id: string) {
    this.calendarioService.getEventDetail(id)
    .subscribe(response => {
      this.evento = response[0];
    });
  }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { format, addDays, isSameDay, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';

// Services
import { CalendarioService } from 'src/app/_services/calendario/calendario.service';

// Components
import { TipoEventoListComponent } from '../../modals/tipo-evento-list/tipo-evento-list.component';
import { CalendarConfig } from 'src/app/_pages/calendario/utils/calendar-config';

@Component({
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {

  @Input() id: string;

  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [{
    label: '<img src="assets/iconos/men/evs-ojo.svg" alt="Visualizar" class="link-btn-calendario">',
    a11yLabel: 'Visualizar',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.getEventDetail(event.id.toString());
    }
  }];

  evento: any = null;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  consultDate = format(new Date(), 'dd/MM/yyyy');

  locale = 'es';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  constructor(
    private modalService: NgbModal,
    public calendarioService: CalendarioService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchEventos();
  }

  fetchEventos() {
    const currentDate = new Date();
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.calendarioService
        .getEventbyMicrositeYear(this.id, currentDate.toDateString())
        .subscribe(response => {
          response.forEach(evento => {
            this.events = [
              ...this.events,
              CalendarConfig.convertinit(evento, this.actions)
            ];
          });
        });
    });

    const nextyear = new Date(currentDate.getFullYear() + 1, 0, 1);
    this.calendarioService.getEventbyMicrositeMonth(this.id, nextyear.toDateString())
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

  changeDate() {
    this.setView(CalendarView.Day);
    this.viewDate = new Date(this.consultDate);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  showListEventosModal() {
    const ref = this.modalService.open(TipoEventoListComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.view = this.view;
    ref.componentInstance.viewDate = this.viewDate;
    ref.componentInstance.idMicrositio = this.id;
  }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { format, addDays, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbDateAdapter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { MatDatepickerInputEvent } from '@angular/material';

// Services

// Components
import { TipoEventoListComponent } from '../../modals/tipo-evento-list/tipo-evento-list.component';

// Utils
import { CustomAdapter } from 'src/app/_shared/utils/customAdapter';

@Component({
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter }
  ]
})
export class CalendarioComponent implements OnInit {

  @Input() events: CalendarEvent[];
  @Input() actions: CalendarEventAction[];
  @Input() evento: any = null;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  consultDate = format(new Date(), 'dd/MM/yyyy');

  model: NgbDateStruct;

  locale = 'es';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  constructor(
    private modalService: NgbModal,
    private dateAdapter: NgbDateAdapter<string>
  ) {}

  ngOnInit() { }

  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
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
  }
}

import { CalendarEvent } from 'angular-calendar';

export class CalendarConfig {

  static convertinit(element: any, actionlist: any): CalendarEvent {
    return {
      id: element.id,
      start: new Date(element.start),
      end: new Date(element.end),
      title: element.title,
      color: {
        primary: element.color,
        secondary: element.color
      },
      actions: actionlist,
      // allDay?: boolean;
      // cssClass?: string;
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };
  }

  static getEvent(evento: any, actionlist: any): CalendarEvent {
    return {
      id: evento.id,
      start: new Date(`${evento.fechaEvento} ${evento.horaInicio}`),
      end: new Date(`${evento.fechaEvento} ${evento.horaFin}`),
      title: evento.nombre,
      color: {
        primary: evento.tipoColor,
        secondary: evento.tipoColor
      },
      actions: actionlist,
      allDay: evento.horaInicio === '07:00' &&  evento.horaFin === '21:00',
      // cssClass?: string;
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };
  }
}

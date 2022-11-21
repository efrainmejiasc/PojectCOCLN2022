import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CalendarEvent } from 'angular-calendar';
import { notification } from 'src/app/_model/calendario/notification.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  uri = `${environment.apiUrl}/api/evento`;
  uri_config = `${environment.apiUrl}/api/config`;

  constructor(
    private http: HttpClient
  ) { }

  getEventbyDefault(date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyDefault?date=${date}`);
  }

  getEventbyDay(date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyDay?date=${date}`);
  }

  getEventbyMonth(date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyMonth?date=${date}`);
  }

  getEventbyYear(date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyYear?date=${date}`);
  }
  getEventbyMicrositeYear(idMicrositio: string, date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyMicrositeYear?idMicrositio=${idMicrositio}&date=${date}`);
  }
  getEventDetail(id: string) {
    return this.http.get(`${this.uri}/getEventDetail/?id=${id}`);
  }

  createEvent(formData: FormData) {
    return this.http.post<any>(`${this.uri}/createEvent/`, formData);
  }

  updateEvent(formData: FormData) {
    return this.http.put<any>(`${this.uri}/updateEvent/`, formData);
  }

  deleteEvent(formData: FormData) {
    return this.http.put(`${this.uri}/deleteEvent/`, formData);
  }

  getEventDetailLite(id: string) {
    return this.http.get(`${this.uri}/getEventDetailLite?date=${id}`);
  }

  getEventbyMicrositeDefault(idMicrositio: string, date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyMicrositeDefault/?idMicrositio=${idMicrositio}&date=${date}`);
  }

  getEventbyMicrositeDay(idMicrositio: string, date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyMicrositeDay/?idMicrositio=${idMicrositio}&date=${date}`);
  }

  getEventbyMicrositeMonth(idMicrositio: string, date: string) {
    return this.http.get<CalendarEvent[]>(`${this.uri}/getEventbyMicrositeMonth/?idMicrositio=${idMicrositio}&date=${date}`);
  }
  sendEmailEvent(notification: notification) {
    return this.http.post<any>(`${this.uri}/sendEmailEvent`, notification);
  }
  getSettingsbyParameter(parameter: any) {
    return this.http.get<any>(`${this.uri_config}/getSettingsbyParameter?parameter=${parameter}`);
  }

}

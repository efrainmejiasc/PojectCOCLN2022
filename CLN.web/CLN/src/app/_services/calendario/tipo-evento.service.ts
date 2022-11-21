import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {

  uri = `${environment.apiUrl}/api/tipoEvento`;

  constructor(
    private http: HttpClient
  ) { }

  getEventTypesforList() {
    return this.http.get<any[]>(`${this.uri}/getEventTypesforList`);
  }

  createEventType(eventType: any) {
    const jsonEvenType = JSON.stringify(eventType);
    return this.http.post(`${this.uri}/createEventType?jsonEvenType=${jsonEvenType}`, { observe: 'response' });
  }

  updateEventType(eventType: any) {
    const jsonEvenType = JSON.stringify(eventType);
    return this.http.put(`${this.uri}/updateEventType?jsonEvenType=${jsonEvenType}`, { observe: 'response' });
  }

  deleteEventType(id: number) {
    return this.http.delete(`${this.uri}/deleteEventType?id=${id}`);
  }

  // Retorna los tipos de evento por semana
  getEventTypesbyDefault(date: string) {
    return this.http.get<any[]>(`${this.uri}/getEventTypesbyDefault?date=${date}`);
  }

  // Retorna los tipos de evento por día
  getEventTypesbyDay(date: string) {
    return this.http.get<any[]>(`${this.uri}/getEventTypesbyDay?date=${date}`);
  }
  // Retorna los tipos de evento por mes
  getEventTypesbyMonth(date: string) {
    return this.http.get<any[]>(`${this.uri}/getEventTypesbyMonth?date=${date}`);
  }
  // Retorna los tipos de evento por semana y micrositio
  getEventTypesbyMicrositeDefault(date: string, idMicrositio: string) {
    return this.http.get<any[]>(`${this.uri}/getEventTypesbyMicrositeDefault?idMicrositio=${idMicrositio}&date=${date}`);
  }

  // Retorna los tipos de evento por día y micrositio
  getEventTypesbyMicrositeDay(date: string, idMicrositio: string) {
    return this.http.get<any[]>(`${this.uri}/getEventTypesbyMicrositeDay?idMicrositio=${idMicrositio}&date=${date}`);
  }

  // Retorna los tipos de evento por mes y micrositio
  getEventTypesbyMicrositeMonth(date: string, idMicrositio: string) {
    return this.http.get<any[]>(`${this.uri}/getEventTypesbyMicrositeMonth?idMicrositio=${idMicrositio}&date=${date}`);
  }
}

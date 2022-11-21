import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReprogramarCitasService {

  constructor(private http: HttpClient) { }

  obtenerInformacionCita(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/GetScheduledVirtualAppointmentsCompanyEspecificId/${id}`);
  };

  obtenerEmpresaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/CAS/getUserCompanyInformation/${id}`);
  };
}

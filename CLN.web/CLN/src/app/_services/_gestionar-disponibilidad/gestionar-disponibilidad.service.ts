import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionarDisponibilidadService {

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<any>{
    const usuario = JSON.parse(localStorage.getItem("userCas"));
    return this.http.get<any>(`${environment.apiUrl}/api/User/GetUserCompaniestoAppointments?emailUser=${usuario.email}`);
  };

  getInfoEmpresa(id: number): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/CAS/getUserCompanyInformation/${id}`);
  };

  getHorariosDisponibles(nit: string): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/VirtualAppointments/GetAvailableHoursCompany/${nit}`);
  };

  updateHorariosDisponibles(data: any): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/api/VirtualAppointments/UpdateAvailableHoursCompany`, data);
  };

  getDisponibilidadEspecifica({ nit, startDate, endDate }): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/VirtualAppointments/GetAvailableHoursCompany/${nit}/${startDate}/${endDate}`);
  };

  updateHorariosEspecificos(data: any): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/api/VirtualAppointments/UpdateAvailableHoursCompanyEspecific`, data);
  };

  getCitasAsignadas({ nit }): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/GetScheduledVirtualAppointmentsCompany/${nit}/Guest`);
  };

  getCitasAsignadasHost({ nit }): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/GetScheduledVirtualAppointmentsCompany/${nit}/Host`);
  };
}

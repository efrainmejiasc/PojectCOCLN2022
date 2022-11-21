import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionarInvitacionCitasService {

  constructor(private http: HttpClient) { }

  obtenerInformacionEmpresa(companyId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/CAS/getUserCompanyInformation/${companyId}`);
  };

  getUserCompanies(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/User/getUserCompanies/${id}`);
  };
  
  // Obtine listado motivos para citas de negocios virtuales
  getReasonVirtualAppointments(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/GetReasonVirtualAppointments`);
  };
  // Crea una nueva cita virtual
  crearCitaVirtual(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/CreateScheduledVirtualAppointment`, data);
  };
// /api/ScheduledVirtualAppointments / 
  // Crea una nueva cita virtual
  actualizarCitaVirtual(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/UpdateScheduledVirtualAppointment`, data);
  };

  getHorariosDisponibles(nit: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/VirtualAppointments/GetAvailableHoursCompany/${nit}`);
  };
  
  // Obtiene listado de citas virtuales activas de una empresa como anfitrion o invitado
  getScheduledVirtualAppointmentsCompany(nit: string, type:string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/GetScheduledVirtualAppointmentsCompany/${nit}/${type}`);
  };

  actualizarInformacionCitaVirtual(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/UpdateScheduledVirtualAppointment`, {...data});
  };

  actualizarInformacionCitaVirtualPorTipo(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/UpdateSheduleVirtualAppointmentsManagement`, {...data});
  };
  
  actualizarHoraCitaVirtualPorTipo(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/UpdateScheduledVirtualAppointment`, {...data});
  };

  motivosRechazo(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/GetReasonVirtualAppointmentsRejection`);
  };

  motivosCancelacion(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/ScheduledVirtualAppointments/GetReasonVirtualAppointmentsCancel`);
  };

  getConsolidado(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/CitationFindingsForm/GetCitationFindingsForm/1/4`);
  };

  registrarRespuestaCitaVirtual(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/QuizAnswers/CreateQuizAnswer`, { ...data });
  };

  getRespuestaCitaVirtual(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/QuizAnswers/GetQuizAnswers/${id}`);
  };
}
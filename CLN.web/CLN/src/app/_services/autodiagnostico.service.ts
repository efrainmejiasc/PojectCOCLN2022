import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoService {

  constructor(
    private http: HttpClient
  ) {}

  public loadQuestions(id_user: any) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico?usuario=${id_user}`);
  }

  public descargarAutodiagnostigo(id_user, version) {
    const responseType: 'json' | 'arraybuffer' | 'blob' | 'text' = 'json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': responseType,
    });
    console.log(`${environment.apiUrl}/api/diagnostico/descargar?usuario=${id_user}&version=${version}`);
    return this.http.get(`${environment.apiUrl}/api/diagnostico/descargar?usuario=${id_user}&version=${version}`, {
      responseType: 'arraybuffer', headers: headers
    });
  }

  public saveAfirmation(idCalificacionAfirmacion, calificacion) {
    return this.http.put<any[]>(
      `${environment.apiUrl}/api/diagnostico/calificar/${idCalificacionAfirmacion}?calificacion=${calificacion}`,
      calificacion);
  }

  public terminado(id_user) {
    return this.http.get<boolean>(`${environment.apiUrl}/api/diagnostico/terminado?usuario=${id_user}`);
  }

  public finished(id_user) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico/terminar?usuario=${id_user}`);
  }

  public finishedNewVersion(id_user) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico/nuevo?usuario=${id_user}`);
  }

  public checkDiagnostico(id_user) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico/terminado?usuario=${id_user}`);
  }

  public sendEmail(id_user, emails) {
    return this.http.post<any[]>(`${environment.apiUrl}/api/diagnostico/enviareporte?usuario=${id_user}`, emails);
  }

  public getResultados(id_user){
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico/historial?usuario=${id_user}`);
  }

  public getVersion(id_user){
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico/version?usuario=${id_user}`);
  }
}

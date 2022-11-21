import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newsCapacidad } from 'src/app/_model/capacidad/newsCapacidad.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutodiagnosticoService {

  constructor(private http: HttpClient) { }
  apiAto = `${environment.apiUrl}/api/autodiagnostico/`;
  apiGuia = `${environment.apiUrl}/api/guia/`

  public getAutodiagnosisConfig() {
    return this.http.get<any>(`${this.apiAto}GetAutodiagnosisConfig`);
  }
  public getAutodiagnosis() {
    return this.http.get<any>(`${this.apiAto}getAutodiagnosis`);
  }
  public getAutodiagnosisNews() {
    return this.http.get<newsCapacidad[]>(`${this.apiAto}getAutodiagnosisNews`);
  }
  public registerAutodiagnosisValue(diagnostic: any) {
    return this.http.post<any>(`${this.apiAto}registerAutodiagnosisValue`, diagnostic);
  }
  public saveAutodiagnosis(diagnostic: any) {
    return this.http.post<any>(`${this.apiAto}saveAutodiagnosis`, diagnostic);
  }

  public getDocuments(url) {
    let urlToDownload: String = `${environment.apiUrl}/api/guia/downloadGuide/?ruta=${url}`;
    return this.http.get(`${urlToDownload}`, { responseType: 'blob' })
  }
  public getAutodiagnosisCompleted() {
    return this.http.get<any[]>(`${this.apiAto}/getAutodiagnosisCompleted`)
  }
  public getResult(id) {
    return this.http.get(`${this.apiAto}downloadAutodiagnosis/?id=${id}`, { responseType: 'blob' })
  }

  public haveAcces() {
    return this.http.get(`${this.apiAto}validateAutodiagnosisExistencebyEntity/`);
  }

  public terminado(id_user) {
    return this.http.get<boolean>(`${environment.apiUrl}/api/diagnostico/terminado?usuario=${id_user}`);
  }
  public getVersion(id_user) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico/version?usuario=${id_user}`);
  }
}

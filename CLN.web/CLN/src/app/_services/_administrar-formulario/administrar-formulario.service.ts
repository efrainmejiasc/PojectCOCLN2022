import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarFormularioService {

  url = `${environment.apiUrl}/api/CitationFindingsForm`;

  constructor(private http: HttpClient) { }

  // /api/CitationFindingsForm/GetCitationFindingsForm/{idUser}
  obtenerFormularioPorUsuario(idUser: number, idState:number): Observable<any> {
    return this.http.get<any>(`${this.url}/GetCitationFindingsForm/${idUser}/${idState}`);
  };

  // ​/api​/CitationFindingsForm​/CreateCitationFindingsForm
  crearFormulario(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/CreateCitationFindingsForm`, data);
  };

  // ​/api​/CitationFindingsForm​/UpdateCitationFindingsForm
  actualizarFormulario(data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/UpdateCitationFindingsForm`, data);
  };

  // ​/api​/CitationFindingsForm​/UpdateCitationFindingsForm
  actualizarFormularioPublicado(data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/UpdateCitationFindingsFormPublish`, data);
  };
}

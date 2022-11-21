import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { Template } from 'src/app/_model/micrositios/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  uri = `${environment.apiUrl}/api/micrositiotemplates`;

  constructor(
    private http: HttpClient
  ) { }

  getMicrositeTemplates() {
    return this.http.get<any>(`${this.uri}/getMicrositeTemplates`);
  }

  // Obtiene el template del micrositio con el id del micrositio
  getMicrositeTemplateDetail(id: number) {
    return this.http.get<any>(`${this.uri}/getMicrositeTemplateDetail?id=${id}`);
  }

  getMicrositeTemplateDetailByMicrositeId(id: number) {
    return this.http.get<any>(`${this.uri}/getMicrositeTemplateDetailByMicrositeId?id=${id}`);
  }

  /// Crea plantilla
  createMicrositeTemplate(template: any) {
    const json = JSON.stringify(template);
    // return this.http.post<Template>(`${this.uri}/createMicrositeTemplate?jsonMicrositeTemplate=${json}`, { observe: 'response' });
    return this.http.post<Template>(`${this.uri}/createMicrositeTemplate`, template);
  }

  updateMicrositeTemplate(template: any) {
    const json = JSON.stringify(template);
    // return this.http.put<Template>(`${this.uri}/updateMicrositeTemplate?jsonMicrositeTemplate=${json}`, { observe: 'response' });
    return this.http.put<Template>(`${this.uri}/updateMicrositeTemplate`, template);
  }

  updateMicrositeTemplateByMicrositeId(template: Template) {
    const json = JSON.stringify(template);
    // return this.http.put<Template>(`${this.uri}/updateMicrositeTemplate?jsonMicrositeTemplate=${template}`, { observe: 'response' });
    return this.http.put<Template>(`${this.uri}/updateMicrositeTemplateByMicrositeId`, template);
  }

  deleteMicrositeTemplate(id: number) {
    return this.http.delete(`${this.uri}/deleteMicrositeTemplate?id=${id}`);
  }
}
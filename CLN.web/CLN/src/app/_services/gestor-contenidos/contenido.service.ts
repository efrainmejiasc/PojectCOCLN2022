import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Contenido, ContenidoAsociado } from 'src/app/_model/contenidos/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  uri = `${environment.apiUrl}/api/contenido`;

  constructor(
    private http: HttpClient
  ) { }

  getContent(page: number, size: number) {
    return this.http.get<Contenido[]>(`${this.uri}/getContent/page/size?page=1&size=0`);
  }

  getContentDetail(id: number) {
    return this.http.get<Contenido>(`${this.uri}/getContentDetail?id=${id}`);
  }

  createContent(contenido: Contenido, formData?: FormData) {
    // const Ncontenido = JSON.stringify(contenido);
    // if (formData !== null) {
      return this.http.post<any>(`${this.uri}/createContent`, formData);  //?jsonContent=${Ncontenido}
    // }
    // return this.http.post<any>(`${this.uri}/createContent?jsonContent=${Ncontenido}`, { observe: 'response' });
  }

  createContentLite(formData?: FormData) {
    return this.http.post<any>(`${this.uri}/createContentLite`, formData);
  }

  updateContent(contenido: Contenido, formData: FormData) {
      return this.http.put<any>(`${this.uri}/updateContent`,  formData);
  }

  deleteContent(id: number) {
    return this.http.delete(`${this.uri}/deleteContent?id=${id}`);
  }

  enableDisableContent(id: number, estado: string) {
    return this.http.put(`${this.uri}/enable_DisableContent`, { id, estado });
  }

  getContentTypesAffirmationsforList(categoria: string) {
    return this.http.get<ContenidoAsociado[]>(`${this.uri}/GetContentTypesAffirmationsforList?categoria=${categoria}`);
  }

  getContentbyMicrositeTopic(tema: string, micrositio: string) {
    return this.http.get<any[]>(`${this.uri}/getContentbyMicrositeTopic?tema=${tema}&micrositio=${micrositio}`);
  }

  getContentbyTopic(tema: string) {
    return this.http.get<any[]>(`${this.uri}/getContentbyTopic?tema=${tema}`);
  }

  downloadContent(ruta: string) {
    return this.http.get<any[]>(`${this.uri}/downloadContent?ruta=${ruta}`);
  }
}

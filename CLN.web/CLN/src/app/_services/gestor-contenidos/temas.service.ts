import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Tema } from 'src/app/_model/contenidos/tema.model';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  uri = `${environment.apiUrl}/api/tema`;

  constructor(
    private http: HttpClient
  ) { }

  getTopics(page: number, size: number) {
    //return this.http.get<Tema[]>(`${this.uri}/getTopics/${page}/${size}`);
    return this.http.get<Tema[]>(`${this.uri}/getTopics?page=${page}&size=${size}`);
  }
  getTopicsUrl(page: number, size: number){ 
    return `${this.uri}/getTopics?page=${page}&size=${size}`
  }
  
  getTopicsbyDescription(page: number, size: number, desc: string) {
    return this.http.get(`${this.uri}/getTopicsbyDescription/${page}/${size}/${desc}`);
  }

  createTopic(tema: any) {
    tema=JSON.stringify(tema);
    return this.http.post(`${this.uri}/createTopic/?jsonTopic=${tema}`, tema);
  }

  updateTopic(tema: any) {
    tema=JSON.stringify(tema);
    return this.http.put(`${this.uri}/updateTopic/?jsonTopic=${tema}`, tema);
  }

  deleteTopic(id: number) {
    return this.http.post(`${this.uri}/deleteTopic/?id=${id}`, { id });
  }

  enableDisableTopic(id: number, estado: string) {
    return this.http.put(`${this.uri}/enable_DisableTopic/?id=${id}&estado=${estado}`, { id, estado });
  }

  getTopicsforList() {
    return this.http.get<any[]>(`${this.uri}/getTopicsforList`);
  }
}

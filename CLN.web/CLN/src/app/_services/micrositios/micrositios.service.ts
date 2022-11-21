import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { Micrositio } from './../../_model/micrositios/micrositio.model';

@Injectable({
  providedIn: 'root'
})

export class MicrositiosService {

  uri = `${environment.apiUrl}/api/micrositios`;

  constructor(
    private http: HttpClient
  ) { }

  getMicrosites(page: number, size: number) {
    return this.http.get<Micrositio[]>(`${this.uri}/getMicrosites?page=${page}&size=${size}`);
  }

  getMicrositeDetail(id: number) {
    return this.http.get<Micrositio>(`${this.uri}/getMicrositeDetail?id=${id}`);
  }

  createMicrosite(formData: FormData) {
    return this.http.post<any>(`${this.uri}/createMicrosite`, formData);
  }

  getAllMicrositiosSimpleList() {
    return this.http.get<any[]>(`${this.uri}/getSimpleList`);
  }

  getMicrositio(id: number) {
    return this.http.get<Micrositio>(`${this.uri}/get/${id}`);
  }

  updateMicrosite(formData: FormData) {
    return this.http.put<any>(`${this.uri}/updateMicrosite`, formData);
  }

  deleteMicrosite(id: number) {
    return this.http.post(`${this.uri}/deleteMicrosite`, { id });
  }

  cambiarEstado(id: number) {
    return this.http.post<Micrositio>(`${this.uri}/cambiarestado?id=${id}`, { observe: 'response' });
  }

  getMicrositiosPublicados() {
    return this.http.get<Micrositio[]>(`${this.uri}/getpublicados`);
  }

  ExisteNombre() {
    return this.http.get<boolean>(`${this.uri}/existenombre`);
  }

  getMicrositesforList() {
    return this.http.get(`${this.uri}/getMicrositesforList`);
  }
}

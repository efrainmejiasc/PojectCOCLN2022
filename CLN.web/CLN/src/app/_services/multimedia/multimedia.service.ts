import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Multimedia } from 'src/app/_model/multimedia/multimedia.model';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  uri = `${environment.apiUrl}/api/multimedia`;

  constructor(
    private http: HttpClient
  ) { }

  getAllMultimedias() {
    return this.http.get<Multimedia[]>(`${this.uri}/get`);
  }

  getMultimedia(id: number) {
    return this.http.get<Multimedia>(`${this.uri}/get/${id}`);
  }

  createMultimedia(multimedia: Multimedia) {
    return this.http.post<Multimedia>(`${this.uri}/post`, multimedia);
  }

  updateMultimedia(id: number, multimedia: Multimedia) {
    return this.http.put<Multimedia>(`${this.uri}/put/${id}`, multimedia);
  }

  deleteMultimedia(id: number) {
    return this.http.post(`${this.uri}/delete`, { id });
  }

  getMultimediasByMicrositioId(id: number) {
    return this.http.get<Multimedia[]>(`${this.uri}/getmultimediasbymicrositioid/${id}`);
  }

  getFilesByMicrositioId(id: number) {
    return this.http.get(`${this.uri}/getfilesbymicrositioid/${id}`);
  }

  postFile(idMicrositio: number, files: FormData) {
    return this.http.post(`${this.uri}/upload/${idMicrositio}`, files);
  }
}

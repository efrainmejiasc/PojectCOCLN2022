import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Biblioteca } from 'src/app/_model/contenidos/biblioteca.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  uri = `${environment.apiUrl}/api/biblioteca`;
  listRol = `${environment.apiUrl}/api/rol`;

  constructor(
    private http: HttpClient
  ) { }

  getLibraries(page: number, size: number) {
    return this.http.get<Biblioteca[]>(`${this.uri}/getLibraries?page=${page}&size=${size}`);
  }

  getLibrariesforlist() {
    return this.http.get<Biblioteca[]>(`${this.uri}/getLibrariesbyRolforList/`);
  }

  getLibraryDetail(id: number) {
    return this.http.get(`${this.uri}/getLibraryDetail?id=${id}`);
  }

  createLibrary(contenido: any) {
    contenido = JSON.stringify(contenido);
    return this.http.post(`${this.uri}/createLibrary?jsonLibrary=${contenido}`, { observe: 'response' });
  }

  updateLibrary(contenido: any) {
    contenido = JSON.stringify(contenido);
    return this.http.put(`${this.uri}/updateLibrary?jsonLibrary=${contenido}`, { observe: 'response' });
  }

  deleteLibrary(id: number) {
    return this.http.post(`${this.uri}/deleteLibrary`, { id });
  }

  enableDisableLibrary(id: number, estado: string) {
    return this.http.put(`${this.uri}/enable_DisableLibrary?id=${id}&estado=${estado}`, { id, estado });
  }

  getLibraryTypesforList() {
    return this.http.get(`${this.uri}/getLibraryTypesforList`);
  }

  getLibrariesbyRolforList() {
    return this.http.get(`${this.uri}/getLibrariesbyRolforList`);
  }

  /// Lista de roles para crear biblioteca
  getRolesforList() {
    return this.http.get<any[]>(`${this.listRol}/getRolesforList/`);
  }

  /// Lista de tipos de bibliotecas
  getLibraryTypes() {
    return this.http.get<any[]>(`${this.uri}/getLibraryTypes`);
  }
}

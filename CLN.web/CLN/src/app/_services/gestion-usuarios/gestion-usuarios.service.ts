import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/_model/user-data/user.module';
import { environment } from 'src/environments/environment';
import { fetchExistence } from './fetchExistence.model';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  constructor(private http: HttpClient) { }
  listUsers = `${environment.apiUrl}/api/usuario/`;

  public getUserList() {
    return this.http.get<user[]>(`${this.listUsers}getUsers/?page=1&size=0`);
  }

  public createUser(user: user) {
    return this.http.post<any>(`${this.listUsers}createUser`, user);
  }

  public fetchUserExistence(user: fetchExistence) {
    var json = JSON.stringify(user);
    return this.http.get<any>(`${this.listUsers}validateUsersExistence/?jsonUser=${json}`, { headers: new HttpHeaders({ "jsonUser": json }) });
  }
  public saveUser(usuario: user) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${this.listUsers}createUser`, usuario, httpOptions);
  }
  public updateUser(usuario: user) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.listUsers}updateUser`, usuario, httpOptions);
  }

  public deleteUser(user: String) {
    return this.http.delete<any>(`${this.listUsers}deleteUser?id=${user}`);
  }

  public activeInactiveUser(action: String, userId) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.listUsers}enable_DisableUser/?id=${userId}&estado=${action}`, httpOptions);
  }

  public getUserRolExistencebyEntity(id: number, secretaria: number) {
    return this.http.get<user[]>(`${this.listUsers}validateUserRolExistencebyEntity/?jsonUser={idRol:${id},idSecretaria:${secretaria}}`);
  }
}

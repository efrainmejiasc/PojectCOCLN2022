import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createRol } from 'src/app/_model/roles/createRol.model';
import { groups } from 'src/app/_model/roles/groups.model';
import { permits } from 'src/app/_model/roles/permits.model';
import { rolFetch } from 'src/app/_model/roles/rolFetch.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestorRolesService {

  listRol = `${environment.apiUrl}/api/rol`;
  listGroup = `${environment.apiUrl}/api/grupo`;
  listPermits = `${environment.apiUrl}/api/permiso`;
  constructor(
    private http: HttpClient
  ) { }

  //Lista de Roles
  getRolesforList() {
    return this.http.get<any[]>(`${this.listRol}/getRoles?page=1&size=10`);
  }
  getRolesLite() {
    return this.http.get<any[]>(`${this.listRol}/getRolesforListUsers`);
  }
  getGroupsforList() {
    return this.http.get<groups[]>(`${this.listGroup}/getGroupsforList`);
  }
  getPermitsforList(isAdmin: boolean) {
    return this.http.get<permits[]>(`${this.listPermits}/getPermitsforList/?isAdminMen=${isAdmin}`);
  }
  getRolesPagination(page, size) {
    return this.http.get<permits[]>(`${this.listRol}/getRoles?page=1&size=0`);
  }
  fetchRolExist(rol: rolFetch) {
    return this.http.get<any>(`${this.listRol}/validateRolesExistence?jsonRol={"nombre":"` + rol.nombre + `","grupo":"` + rol.grupo + `"}`);
  }
  getRolDetail(id: number) {
    return this.http.get<createRol>(`${this.listRol}/getRolDetail?id=${id}`);
  }
  saveRol(rol: any) {
    rol = JSON.stringify(rol);
    return this.http.post<any>(`${this.listRol}/createRol/?jsonRol=${rol}`, { observe: 'response' });
  }
  updateRol(rol: any) {
    rol = JSON.stringify(rol);
    return this.http.put<any>(`${this.listRol}/updateRol/?jsonRol=${rol}`, { observe: 'response' });
  }
  deleteRol(rol: number) {
    return this.http.delete<any>(`${this.listRol}/deleteRol?id=${rol}`);
  }
  getPermitsComponent(idItem: number) {
    return this.http.get<Array<any>>(`${this.listRol}/getPermitsbyMenuRol?menu=${idItem}`);
  }
  getMenubyRol() {
    return this.http.get<any>(`${this.listRol}/getMenubyRol`);
  }
}

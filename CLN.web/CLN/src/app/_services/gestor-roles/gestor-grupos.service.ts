import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rolGroup } from 'src/app/_model/roles/rolGroup.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestorGruposService {

  listGroup = `${environment.apiUrl}/api/grupo`;
  constructor(
    private http: HttpClient
  ) { }

  getRolGroups() {
    return this.http.get<rolGroup[]>(`${this.listGroup}/getGroups/?page=1&size=0`);
  }
  getGroupDetail(id: number) {
    return this.http.get<rolGroup>(`${this.listGroup}/getGroupDetail/?id=${id}`);
  }
  fetchGroupExist(group: rolGroup) {
    return this.http.get<any>(`${this.listGroup}/validateGroupsExistence?jsonGroup={"nombre":"` + group.grupo + `"}`);
  }
  saveGroup(group: rolGroup) {
    return this.http.post<any>(`${this.listGroup}/createGroup/?jsonGroup={"nombre":"${group.grupo}","descripcion":"${group.descripcion}"}`, { observe: 'response' });
  }
  updateGroup(group: rolGroup) {
    return this.http.put<any>(`${this.listGroup}/updateGroup/?jsonGroup={"id": "${group.id}","nombre":"${group.grupo}","descripcion":"${group.descripcion}"}`, { observe: 'response' });
  }
  deleteGroup(group: number) {
    return this.http.delete<any>(`${this.listGroup}/deleteGroup?id=${group}`);
  }
}

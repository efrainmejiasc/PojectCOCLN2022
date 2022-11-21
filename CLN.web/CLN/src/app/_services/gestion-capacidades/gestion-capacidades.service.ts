import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { capacidad } from 'src/app/_model/capacidad/capacidad.model';
import { guia } from 'src/app/_model/capacidad/guia.model';
import { tipoCapacidad } from 'src/app/_model/capacidad/tipoCapacidad.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionCapacidadesService {

  constructor(private http: HttpClient) { }
  listCapacidades = `${environment.apiUrl}/api/ability/`;
  listGuias = `${environment.apiUrl}/api/guia/`;

  public getCapacidades() {
    return this.http.get<any[]>(`${this.listCapacidades}getAbilities/?page=1&size=0`)
  }
  public getAbilityTypesforListAbilites() {
    return this.http.get<tipoCapacidad[]>(`${this.listCapacidades}getAbilityTypesforListAbilites`)
  }

  public saveCapacidad(capacidad: capacidad) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${this.listCapacidades}createAbility`, capacidad, httpOptions);
  }

  public updateCapacidad(capacidad: capacidad) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.listCapacidades}updateAbility`, capacidad, httpOptions);
  }

  public getAbilityDetail(id: number) {
    return this.http.get<any>(`${this.listCapacidades}getAbilityDetail/?id=${id}`)
  }

  public enableDisableAbility(id: number, estado: String) {
    return this.http.put<any>(`${this.listCapacidades}enable_DisableAbility/?id=${id}&estado=${estado}`, { observe: 'response' })
  }

  public getGuia() {
    return this.http.get<any>(`${this.listGuias}GetGuide`)
  }

  public updateGuia(formData: FormData) {
    return this.http.put<any>(`${this.listGuias}UpdateGuide`, formData)
  }
}

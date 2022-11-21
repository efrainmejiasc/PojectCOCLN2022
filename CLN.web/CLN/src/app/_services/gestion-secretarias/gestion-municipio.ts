import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GestionMunicipioService {

    constructor(private http: HttpClient) { }
    
    private listDepartamento = `${environment.apiUrl}/api/municipio`;

    public getDepartamento(id:number) {
        return this.http.get<any[]>(`${this.listDepartamento}?departamento=${id}`);
    }

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pbibody } from 'src/app/_model/reports/pbibody.model';
import { report } from 'src/app/_model/reports/report.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GestionDepartamentoService {

    private url = `${environment.apiUrl}/api/departamento`;
    constructor(private http: HttpClient) { }
    
    public getDepartamento() {
        return this.http.get<any[]>(`${this.url}`);
    }

    public getCoordenadas() {
        return this.http.get<any[]>(`${this.url}/coordinates`);
    }

    public geojson() {
        let link = '/assets/data/colombia.geo.json';
        return this.http.get(link);
    }
}
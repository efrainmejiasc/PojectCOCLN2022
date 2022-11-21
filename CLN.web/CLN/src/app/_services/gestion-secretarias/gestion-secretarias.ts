import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Integrante } from 'src/app/_model/Secretaria/integrante.model';
import { Secretaria, CambioEstado, SecretariaRender } from 'src/app/_model/Secretaria/Secretaria.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GestionSecretariasService {

    constructor(private http: HttpClient) { }
    private url = `${environment.apiUrl}/api/secretaria`;

    public getSecretarias(page: number, size: number) {
        return this.http.get<any[]>(`${this.url}/getSecretaries?page=${page}&size=${size}`);
    }

    public getSecretariasActive() {
        return this.http.get<any[]>(`${this.url}/getSecretariesActive`);
    }

    public getContentDetail(id: number) {
        return this.http.get<Secretaria>(`${this.url}/getSecretaryDetail?id=${id}`);
    }

    public saveSecretaria(modelo: Secretaria) {
        return this.http.post<any>(`${this.url}/createSecretary`, modelo);
    }

    public updateSecretaria(modelo: any) {
         return this.http.put<any>(`${this.url}/updateSecretary`, modelo);
    }

    public cambioEstado(idSecretaria: number, estado: string) {
        return this.http.put<any>(`${this.url}/enable_DisableSecretary?idSecretaria=${idSecretaria}&estado=${estado}`, { idSecretaria, estado });
    }

    public getSecretariaIntegrantes(idSecretaria: number) {
        return this.http.get<Integrante[]>(`${this.url}/getSecretaryTeambySecretary?idsecretaria=${idSecretaria}`);
    }

    public saveSecretariaIntegrantes(modelo: Integrante) {
        return this.http.post<any>(`${this.url}/createSecretaryTeam`, modelo);
    }

    public updateSecretariaIntegrantes(modelo: Integrante) {
        return this.http.put<any>(`${this.url}/updateSecretaryTeam`, modelo);
    }

    public deleteSecretariaIntegrante(id: number) {
        return this.http.delete<any>(`${this.url}/deleteSecretaryTeam?id=${id}`);
    }
}
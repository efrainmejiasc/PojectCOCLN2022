import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { templateStructure } from '../_model/home-editor/templateStructure.model';
import { attribute } from '../_model/home-editor/attribute.model';

@Injectable({
    providedIn: 'root'
})
export class QuieroAprenderService {

    constructor(private http: HttpClient) { }

    public getFormatoGuia(tipoFormato: number, estadoPublicado: number) {
        const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/plantilla/tipo/${tipoFormato}/publicada/${estadoPublicado}`)
            .pipe(map(data => {
                if (data && data.length > 0) {
                    var pNumero = data.find(x => x.NombrePropiedad == "plantillaNumero");
                    return {
                        id: 0,
                        name: '',
                        state: 'Activa',
                        idTemplate: (pNumero) ? pNumero.ValorPropiedad : 0,
                        attributes: data.map(x => new attribute(0, x.NombrePropiedad, x.ValorPropiedad))
                    }
                }

                return {} as templateStructure;
            }));

        return retorno;
    }

    public setFormatoGuia(tipoFormato: number, toUpdate: any) {
        var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const retorno = this.http.put<any[]>(`${environment.apiUrl}/api/plantilla/tipo/${tipoFormato}/update`, JSON.stringify(toUpdate), httpOptions);
        return retorno;
    }

    public publishFormatoGuia(tipoFormato: number, toUpdate: any) {
        var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const retorno = this.http.put<any[]>(`${environment.apiUrl}/api/plantilla/tipo/${tipoFormato}/publish`, JSON.stringify(toUpdate), httpOptions);
        return retorno;
    }
}

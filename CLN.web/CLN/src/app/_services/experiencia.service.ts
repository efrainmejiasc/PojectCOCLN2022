import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, reduce } from 'rxjs/operators'
import { templateStructure } from '../_model/home-editor/templateStructure.model';
import { attribute } from '../_model/home-editor/attribute.model';


@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http: HttpClient) { }

  public obtenerTemas(estado: any) {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/experiencia/tema/${estado}`);
    return retorno;
  }

  public crearTema(tema: any) {
    var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const retorno = this.http.post<any[]>(`${environment.apiUrl}/api/experiencia/tema`, JSON.stringify(tema), httpOptions);
    return retorno;
  }

  public actualizarTema(tema: any) {
    var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const retorno = this.http.put<any[]>(`${environment.apiUrl}/api/experiencia/tema/${tema.id}`, JSON.stringify(tema), httpOptions);
    return retorno;
  }

  public actualizarEstadoTema(tema: any) {
    var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const retorno = this.http.put<any[]>(`${environment.apiUrl}/api/experiencia/tema/${tema.id}/estado`, JSON.stringify(tema), httpOptions);
    return retorno;
  }

  public obtenerExperiencias(secretarias: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/experiencia/${secretarias}`)
      .pipe(
        map(data => {
          return data.map(d => {
            d.estado = (d.EsPublico) ? 'Publicada' : 'Cargada';
            return d;
          });
        })
      );
  }

  public obtenerExperienciasPublicas(temaId: number, secretarias: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/experiencia/tema/${temaId}/publicada/1`)
      .pipe(map(data => {
        var group = data.reduce((acc, obj) => {
          const property = obj['Id'];
          acc[property] = acc[property] || [];
          acc[property].push(obj);
          return acc;
        }, {});

        return Object.values(group).map((data: any[]) => {
          var pNumero = data.find(x => x.NombrePropiedad == "plantillaNumero");
          var secretarias = data.find(x => x.NombrePropiedad == "secretarias");
          return {
            secretaria: (secretarias) ? secretarias.ValorPropiedad : "",
            id: data[0].TemaExperienciaFK,
            nombre: '',
            estado: 'Activa',
            plantilla: (pNumero) ? pNumero.ValorPropiedad : 0,
            atributos: data.map(x => new attribute(0, x.NombrePropiedad, x.ValorPropiedad))
          }
        });
      }));
  }

  public obtenerExperiencia(idExperiencia: number, estadoPublicado: number) {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/experiencia/tema/formato/${idExperiencia}`)
      .pipe(map(data => {
        if (data && data.length > 0) {
          var pNumero = data.find(x => x.NombrePropiedad == "plantillaNumero");
          return {
            id: data[0].TemaExperienciaFK,
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

  public crearExperiencia(temaExperiencia: number, nombre: string, toUpdate: any) {
    var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const retorno = this.http.post<number>(`${environment.apiUrl}/api/experiencia/tema/${temaExperiencia}/formato`, JSON.stringify({
      nombre: nombre,
      atributos: toUpdate
    }), httpOptions);
    return retorno;
  }

  public actualizarExperiencia(idExperiencia: number, temaExperiencia: number, nombre: string, toUpdate: any) {
    var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const retorno = this.http.put<number>(`${environment.apiUrl}/api/experiencia/tema/${temaExperiencia}/formato/${idExperiencia}/update`, JSON.stringify({
      nombre: nombre,
      atributos: toUpdate
    }), httpOptions);
    return retorno;
  }

  public publicarExperiencia(idExperiencia: number, temaExperiencia: number, nombre: string, toUpdate: any) {
    var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const retorno = this.http.put<number>(`${environment.apiUrl}/api/experiencia/tema/${temaExperiencia}/formato/${idExperiencia}/publish`, JSON.stringify({
      nombre: nombre,
      atributos: toUpdate
    }), httpOptions);
    return retorno;
  }

  public eliminarExperiencia(idExperiencia: number) {
    return this.http.delete(`${environment.apiUrl}/api/experiencia/tema/formato/${idExperiencia}`);
  }

}

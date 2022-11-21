import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntasServiceService {

  constructor(private http: HttpClient) { }

  public loadPreguntas() {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/pregunta`);
    return retorno;
  }
  public getFAQByMicrosite(id) {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/preguntafrecuente/getFAQByMicrosite/?id=${id}`);
    return retorno;
  }

  public getFAQByMicrositeFav(id) {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/preguntafrecuente/getFAQByMicrositeFav/?id=${id}`);
    return retorno;
  }

  public getUtiltodelete(id) {
    const retorno = this.http.get<any>(`${environment.apiUrl}/api/preguntafrecuente/getUtilsToDelete/?id=${id}`);
    return retorno;
  }

  public updateFAQ(json) {
    const retorno = this.http.put<any>(`${environment.apiUrl}/api/preguntafrecuente/updateFAQ/?jsonFAQ=${json}`, null);
    return retorno;
  }
  public updateOrder(json) {
    const retorno = this.http.post<any>(`${environment.apiUrl}/api/preguntafrecuente/updateOrder/`, json);
    return retorno;
  }

  public getFAQDetail(id) {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/preguntafrecuente/getFAQDetail/?id=${id}`);
    return retorno;
  }
  public createFAQ(json) {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/preguntafrecuente/createFAQ/?jsonFAQ=${json}`);
    return retorno;
  }

  public deleteFAQDetail(id) {
    const retorno = this.http.delete<any[]>(`${environment.apiUrl}/api/preguntafrecuente/deleteFAQ/?id=${id}`);
    return retorno;
  }
  public getUtils() {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/preguntafrecuente/getUtils/`);
    return retorno;
  }
  public getActiveUtils() {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/preguntafrecuente/getActiveUtils/`);
    return retorno;
  }
  public createUtils(util: any) {
    const retorno = this.http.post<any>(`${environment.apiUrl}/api/preguntafrecuente/createUtils/`, util);
    return retorno;
  }
  public updateUtils(util: any) {
    const retorno = this.http.post<any>(`${environment.apiUrl}/api/preguntafrecuente/updateUtils/`, util);
    return retorno;
  }
  public enable_DisableUtils(util: any) {
    const retorno = this.http.put<any>(`${environment.apiUrl}/api/preguntafrecuente/enable_DisableUtil/`, util);
    return retorno;
  }
  public createQuestion(jsonFAQ: string) {
    const retorno = this.http.post<any>(`${environment.apiUrl}/api/preguntafrecuente/createFAQ/?jsonFAQ=${jsonFAQ}`, null);
    return retorno;
  }

  public getUtilsByMicrositeAndQuestion(idPreguntaFrecuente: any) {
    const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/preguntafrecuente/getUtilsByMicrositeAndQuestion/?idMicrositio=0&idPreguntaFrecuente=${idPreguntaFrecuente}`);
    return retorno;
  }

  public createUtilQuestion(PreguntaUtilidad: { idPregunta: any; idUtilidad: any; esBorrado: string; }) {
    const retorno = this.http.post<any>(`${environment.apiUrl}/api/preguntafrecuente/createUtilQuestion/`, PreguntaUtilidad);
    return retorno;
  }

  public createLikesQuestion(PreguntaLikes) {
    const retorno = this.http.post<any>(`${environment.apiUrl}/api/preguntafrecuente/createLikeQuestion/`, PreguntaLikes);
    return retorno;
  }
}

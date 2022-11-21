import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { category } from '../_model/quieroaprender/category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  public getSecretarias() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/secretarias`);
  }

  public updateSecretaria(id_secretaria, datos) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(datos);
    return this.http.put<any>(`${environment.apiUrl}/api/secretarias/${id_secretaria}`, datos);
  }

  // QUIERO APRENDER
  public getTematicas() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/contenido/getContentTypesAffirmationswithAmountforList?categoria=induccion`);
  }

  public getDocumentosInduccion(idTematica, idSecretaria) {
    // return this.http.get<any[]>(`${environment.apiUrl}/api/secretaria/contenido?tematica=${idTematica}&secretaria=${idSecretaria}`);
    return this.http.get<any[]>(`${environment.apiUrl}/api/secretaria/contenido?tematica=${idTematica}&secretaria=${idSecretaria}`);
  }

  public takeDocument(url) {
    const responseType: 'json' | 'arraybuffer' | 'blob' | 'text' = 'json';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${environment.apiUrl}/api/contenido/downloadContent/?ruta=${url}`, { headers: headers, responseType: 'arraybuffer' });
  }

  //-------CONTENIDO CAPACIDADES -----//
  public getListCapacidades() {
    return this.http.get<category[]>(`${environment.apiUrl}/api/contenido/GetContentTypesAffirmationsforList?categoria=capacidades`);
  }

  public getListCapacidadesAmount() {
    return this.http.get<category[]>(`${environment.apiUrl}/api/contenido/getContentTypesAffirmationswithAmountforList?categoria=capacidades`);
  }

  public SaveContenidoInduccion(id_user, titulo, id_tematica, descripcion, formData) {
    console.log("guardando ?");
    console.log(id_user, titulo, id_tematica, descripcion, formData);
    return this.http.post<any[]>(
      `${environment.apiUrl}/api/secretaria/contenido/subir
        ?usuario=${id_user}
        &tematica=${id_tematica}
        &titulo=${titulo}
        &descripcion=${descripcion}`, formData);
  }

  public getListContenidoInduccion(idSecretaria) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/secretaria/contenido?secretaria=${idSecretaria}`);
  }

  public updateContenidoInduccion(idContenido, idUsuario, idTematica, titulo, descripcion, formData) {
    return this.http.put<any>(
      `${environment.apiUrl}/api/secretaria/contenido/update/${idContenido}
        ?usuario=${idUsuario}
        &tematica=${idTematica}
        &titulo=${titulo}
        &descripcion=${descripcion}`, '');
  }

  public deleteContenido(idContenido, idUsuario, idTematica) {
    return this.http.delete<any>(
      `${environment.apiUrl}/api/secretaria/contenido/delete/${idContenido}
        ?usuario=${idUsuario}
        &tematica=${idTematica}`);
  }

  //-----------PREGUNTAS FREQUENTES ---------------//
  public savePreguntasFrequentes(idUsuario, pregunta, respuesta) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = {
      pregunta: pregunta,
      respuesta: respuesta
    };

    return this.http.post<any[]>(`${environment.apiUrl}/api/preguntafrecuente?usuario=${idUsuario}`, data);
  }

  /*public getListPreguntasFreq() {
    return this.http.get<any>(`${environment.apiUrl}/api/preguntafrecuente`);
  }*/

  public updatePreguntaFreq(idPregunta, pregunta, respuesta, idUsuario) {
    return this.http.put<any[]>(
      `${environment.apiUrl}/api/preguntafrecuente/${idPregunta}
        ?pregunta=${pregunta}
        &respuesta=${respuesta}
        &usuarioModifica=${idUsuario}`, '');
  }

  public deletePreguntaFreq(idPregunta) {
    return this.http.delete<any>(`${environment.apiUrl}/api/preguntafrecuente/${idPregunta}`);
  }

  /////////////////////---CONFIG-----///////////////////////////
  public getConfig() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/config/getSettings`);
  }

  public updateCorreoAsistencia(email) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = {
      parametro: "correoAsistenciaTecnica",
      valor: email
    };
    return this.http.put<any[]>(`${environment.apiUrl}/api/config/updateSettings?jsonSettings=${JSON.stringify(data)}`, { headers: new HttpHeaders({}) });
  }

  public updateVideoEstrategias(urlVideo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    var data = {
      parametro: "videoEstrategia",
      valor: urlVideo
    };
    return this.http.put<any[]>(`${environment.apiUrl}/api/config/updateSettings?jsonSettings=${JSON.stringify(data)}`, { headers: new HttpHeaders({}) });
  }

  public updateBannerActived(id_user, email, is_bannerAcknow, urlVideo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    var data = {
      correoAsistenciaTecnica: email,
      bannerReconocimiento: is_bannerAcknow,
      videoEstrategia: urlVideo
    };
    return this.http.put<any[]>(`${environment.apiUrl}/api/config?usr=${id_user}`, data);
  }

  //------------FORTALECER CAPACIDADES -----------//
  public getListContenidoFort(param) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/diagnostico/afirmacion/contenido?categoria=${param}`);
  }

  public SaveContenidoFort(idUsuario, idAfirmacion, nombredoc, descripcion, formData) {
    return this.http.post<any[]>(
      `${environment.apiUrl}/api/diagnostico/afirmacion/contenido/subir
        ?usuario=${idUsuario}
        &afirmacion=${idAfirmacion}
        &titulo=${nombredoc}
        &descripcion=${descripcion}`,
      formData);
  }

  public updateContenidoFort(idUsuario, idContenido, idAfirmacion, titulo, descripcion, formData) {
    // console.log(idUsuario, idAfirmacion, idContenido, titulo, descripcion, formData);
    return this.http.put<any>(
      `${environment.apiUrl}/api/diagnostico/afirmacion/contenido/update/${idContenido}
        ?usuario=${idUsuario}
        &afirmacion=${idAfirmacion}
        &titulo=${titulo}
        &descripcion=${descripcion}`,
      formData);
  }

  public deleteContenidoFort(idContenido, idAfirmacion, idUsuario) {
    return this.http.delete<any>(
      `${environment.apiUrl}/api/diagnostico/afirmacion/contenido/delete/${idContenido}
        ?usuario=${idUsuario}
        &tematica=${idAfirmacion}`);
  }

  //--------------ASISTENCIA TECNICA ------------------------//
  public SendAsistencia(idUsuario, idAfirmacion, idSecretaria, idCategoria, solicitud, email) {
    return this.http.post<any[]>(`
    ${environment.apiUrl}/api/secretaria/asistencia
      ?usuario=${idUsuario}
      &secretaria=${idSecretaria}
      &dimension=${idCategoria}
      &afirmacion=${idAfirmacion}
      &solicitud=${solicitud}`,
      email);
  }

  public SendAsistenciaMulti(idUsuario, idAfirmacion, idSecretaria, idCategoria, solicitud, email, afirmaciones) {
 /*    return this.http.post<any[]>(
      `${environment.apiUrl}/api/secretaria/asistencia_multi
        ?usuario=${idUsuario}&secretaria=${idSecretaria}
        &dimension=${idCategoria}
        &afirmacion=${idAfirmacion}
        &solicitud=${solicitud}
        &correo=${email[0]}`,
      afirmaciones); */
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      var entity = { usuario : idUsuario,
        afirmacion  : 0,//idAfirmacion,
        secretaria : idSecretaria,
        dimension : idCategoria,
        solicitud : solicitud,
        correo : email[0],
        idAfirmacion : afirmaciones
      };
      console.log(entity);
          return this.http.post<any>(`${environment.apiUrl}/api/secretaria/asistencia_multi`, entity, httpOptions);
  }

  // CREATE USERS
  public NewUser(primerNombre, segundoNombre, primerApellido, segundoApellido, numeroIdentificacion, tipoDocumento, genero, celular, correoElectronico, idRol, idSecretaria, idCreadoUsuario, cargo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = {
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      numeroIdentificacion: numeroIdentificacion,
      tipoDocumento: tipoDocumento,
      genero: genero,
      celular: celular,
      correoElectronico: correoElectronico,
      idRol: idRol,
      idSecretaria: idSecretaria,
      idCreadoUsuario: idCreadoUsuario,
      cargo: cargo
    };
    console.log(primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDocumento, genero, celular, correoElectronico, idRol, idSecretaria, idCreadoUsuario, cargo);
    var link: string = window.location.origin + "/login";
    return this.http.post<any[]>(`${environment.apiUrl}/api/usuario?link=${link}`, data)
      .pipe(map(response => {
        return response;
      }));
  }
  //edit users

  //CREATE USERS
  public EditUser(idUsuario, primerNombre, segundoNombre, primerApellido, segundoApellido, numeroIdentificacion, tipoDocumento, genero, celular, correoElectronico, idRol, idSecretaria, idCreadoUsuario, cargo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = {
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      numeroIdentificacion: numeroIdentificacion,
      tipoDocumento: tipoDocumento,
      genero: genero,
      celular: celular,
      correoElectronico: correoElectronico,
      idRol: idRol,
      idSecretaria: idSecretaria,
      idCreadoUsuario: idCreadoUsuario,
      cargo: cargo
    };
    console.log(primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDocumento, genero, celular, correoElectronico, idRol, idSecretaria, idCreadoUsuario, cargo);
    return this.http.put<any[]>(`${environment.apiUrl}/api/usuario/${idUsuario}`, data)
      .pipe(map(response => {
        return response;
      })
      );
  }

  public getListUsers() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/usuario`);
  }

  public DisableUser(idUsuario, idUserToChange) {
    return this.http.put<any>(`${environment.apiUrl}/api/usuario/desactivar/${idUserToChange}?usuarioModifica=${idUsuario}`, '');
  }

  public EnableUser(idUsuario, idUserToChange) {
    var link: string = window.location.origin + '/login';
    return this.http.put<any>(`${environment.apiUrl}/api/usuario/activar/${idUserToChange}?usuarioModifica=${idUsuario}&link=${link}`, '');
  }

  // REPORTES
  public getReporte_byAcceso(idUsuario, idSecretarias) {

    const responseType: 'json' | 'arraybuffer' | 'blob' | 'text' = 'json';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': responseType,
    });
    return this.http.post(`${environment.apiUrl}/api/accionusuario/reporte/s?usuario=${idUsuario}`, idSecretarias, {
      responseType: 'arraybuffer', headers
    });
  }

  public getReporte_byAsistencias(idUsuario, idSecretarias) {
    const responseType: 'json' | 'arraybuffer' | 'blob' | 'text' = 'json';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': responseType,
    });
    return this.http.post(`${environment.apiUrl}/api/accionusuario/reporte/asistencias/s?usuario=${idUsuario}`, idSecretarias, {
      responseType: 'arraybuffer', headers: headers
    });
  }

  // Consultar Contenidos por id Afirmacion
  public getContenidoAfirmacion(idAfirmacion) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/contenido/getContentbyAffirmation?idAfirmacion=${idAfirmacion}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private http: HttpClient) { }

  getTipoNotificaciones(){
    return this.http.get(`${environment.apiUrl}/api/Common/getNotificationType`);
  };

  getTipoIdentificacion(){
    return this.http.get(`${environment.apiUrl}/api/Common/getPersonType`);
  };

  getSectores(){
    return this.http.get(`${environment.apiUrl}/api/Common/getSectorsList`);
  };

  getCaracterizaciones(){
    return this.http.get(`${environment.apiUrl}/api/Common/getCharacterizationList`);
  };

  getInformacionesComerciales(){
    return this.http.get(`${environment.apiUrl}/api/Common/getCommercialInfoList`);
  };

  getFrecuenciasEnvio(){
    return this.http.get(`${environment.apiUrl}/api/Common/getFrequencyList`);
  };

  setAlerta( data: any ){
    return this.http.post(`${environment.apiUrl}/api/Common/postAlerts`, { ...data });
  }

  saveImage( pFile: File ){
    const formData = new FormData();
    formData.append('pFile', pFile, pFile.name);
    return this.http.post(`${environment.apiUrl}/api/Common/saveImageForAlerts`, formData);
  }

  getAlerta(){
    return this.http.get(`${environment.apiUrl}/api/Common/getAlerts`);
  }

  getAlertaById( id: number ){
    return this.http.get(`${environment.apiUrl}/api/Common/getAlertsById?id=${ id }`);
  }

  eliminarAlerta( id: number ){
    return this.http.get(`${environment.apiUrl}/api/Common/deleteAlert?idAlert=${id}`);
  }

  cambiarEstadoAlerta( id: number, estado: boolean){
    return this.http.get(`${environment.apiUrl}/api/Common/putStateAlert?idAlert=${ id }&isActive=${ estado }`);
  }
}

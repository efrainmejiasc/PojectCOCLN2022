import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient,) { }

  getEmpresas(){
    const usuario = JSON.parse(localStorage.getItem("userCas"));
    return this.http.get(`${environment.apiUrl}/api/User/getUserCompaniestoManage?emailUser=${usuario.email}`);
  };

  infoEmpresa(id: number){
    return this.http.get(`${environment.apiUrl}/api/CAS/getUserCompanyInformation/${id}`);
  }

  getDepartamentos(){
    return this.http.get(`${environment.apiUrl}/api/Common/getTerritorialentities`);
  };

  getEntidadesPorEmpresa(idEmpresa: number, option: string){
    if( option === "PROCESOS DE COMPRAS PÚBLICAS")
      return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getEntitiesByIdCompanyForProcess?idCompany=${idEmpresa}`);
    
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/getEntitiesByIdCompanyForAcquisition?idCompany=${idEmpresa}`);
  };

  getModalidadesPorEmpresa(idEmpresa: number, option: string){
    if( option === "PROCESOS DE COMPRAS PÚBLICAS")
      return this.http.get(`${environment.apiUrl}/api/HirigProcess/getModalitiesByCompanyIdForProcess?idCompany=${idEmpresa}`);
    
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/getModalitiesByCompanyIdForAcquisition?idCompany=${idEmpresa}`);
  };

  getOfertaById(id: number){
    return this.http.get(`${environment.apiUrl}/api/HirigProcess/getProcessPurchaseById?idProcess=${id}`);
  }

  getAdquisicionesById(id: number){
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/getAcquisitionPurchaseById?idAcquisition=${id}`);
  }

  descargarExcel(opcion: string, company: string, cadena: string) {
    if(opcion === 'PROCESOS DE COMPRAS PÚBLICAS') {
      return this.http.get(`${environment.apiUrl}/api/CompanyInterest/ExportarProcessExcel?company=${company}&${cadena}`);
    }else if(opcion === 'PLANES ANUALES DE ADQUISICIONES') {
      return this.http.get(`${environment.apiUrl}/api/CompanyInterest/ExportarAcquisitionsExcel?company=${company}&${cadena}`);
    }
  }




  getPlanes(cadena: string, company: string, opcion: string){
    
    if(opcion === 'PROCESOS DE COMPRAS PÚBLICAS') {
      return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getProcessCompanyByFilter?company=${company}&${cadena}`);
    }else if(opcion === 'PLANES ANUALES DE ADQUISICIONES') {
      return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getAcquisitionsCompanyByFilter?company=${company}&${cadena}`);
    }
    
  };

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsolidadosService {

  constructor(private http: HttpClient,) { }

  getConsolidados(){
    return this.http.get(`${environment.apiUrl}/api/Common/getTittleConsolidados`);
  };

  getZeroNivel(esColombiaProductiva: boolean, { strPDP, strCP }){
    if( esColombiaProductiva )
      return this.http.get(`${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCPCIIUUNSPSCCLNCorrelativeProductsSectors?strPDP=${strPDP}&&strCP=${strCP}`);
    else
      return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getProductsUNSPSCZeroLevel`);
  };

  getPrimerNivel(grupo: any, esColombiaProductiva = false){
    if( esColombiaProductiva )
      return this.http.get(`${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCPCIIUUNSPSCCLNCorrelativeProductsGroupsBySector?sector=${grupo.description}`);
    else
      return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getProductsUNSPSCFirstLevel?grupo=${grupo.description}`);
  };

  getSegundoNivel(item: any, esColombiaProductiva = false){
    if( esColombiaProductiva )
      return this.http.get(`${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCPCIIUUNSPSCCLNCorrelativeProductsSegmentsByGroup?grupo=${item.description}`);
    else
      return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getProductsUNSPSCBySegmentCodeSecondLevel?segment=${item.id}`);
  };

  getTercerNivel(item: any, esColombiaProductiva = false){
    
    if( esColombiaProductiva )
      return this.http.get(`${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/setCPCIIUUNSPSCCLNCorrelativeProductsFamilysBySegment?segment=${item.id}`);
    else
      return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getProductsUNSPSCByFamilyCodeThirdLevel?family=${item.id}`);
  };

  getCuartoNivel(item: any, esColombiaProductiva = false, { strPDP, strCP }){
    if( esColombiaProductiva )
      return this.http.get(`${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCPCIIUUNSPSCCLNCorrelativeProductsClassesByFamily?family=${item.description}&&strPDP=${strPDP}&&strCP=${strCP}`);
    else
      return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getProductsUNSPSCByClassCodeFourthLevel?clase=${item.id}`);
  };

  getQuintoNivel(item: any, esColombiaProductiva = false, { strPDP, strCP }){
    if( esColombiaProductiva )
      return this.http.get(`${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCPCIIUUNSPSCCLNCorrelativeProductsByClass?clase=${item.id}&&strPDP=${strPDP}&&strCP=${strCP}`);
    else
      return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getProductsUNSPSCByClassCodeFourthLevel?clase=${item.id}`);
  };
}

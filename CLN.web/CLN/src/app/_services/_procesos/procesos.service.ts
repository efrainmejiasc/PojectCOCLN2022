import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  constructor(private http: HttpClient) { }

  getDepartamentos(){
    return this.http.get(`${environment.apiUrl}/api/Common/getTerritorialentities`);
  };

  getProcesosByString( cadena: string ){
    return this.http.get(`${environment.apiUrl}/api/HirigProcess/filterHiringProcessProcessNumber?processNumber=${cadena}`);
  };

  getObjetoByString( cadena: string ){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/filterProcessByObjectWord?objectFilter=${cadena}`);
  };

  getModalidades( ){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getHiringProcessesMode`);
  };

  getFasesEstados( ){
    return this.http.get(`${environment.apiUrl}/api/HirigProcess/getHiringProcessActualStages`);
  };

  getTotalProcesosContratacion( ){
    return this.http.get(`${environment.apiUrl}/api/HirigProcess/getHiringProcessTotalCountandSuma`);
  };

  getFiltroProcesos(data: any){
    return this.http.post(`${environment.apiUrl}/api/HirigProcess/getHiringProcessesByFilter`, { ...data });
  }

  getEntidadesByString( cadena: string ){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/filterCompaniesNameWithHiringProcess?companyNameFilter=${cadena}`);
  };

  getExcelProcesos(data: any){
    return this.http.post(`${environment.apiUrl}/api/HirigProcess/downloadHiringProcessesExcel`, { ...data });
  }

  getExcelProcesos2(data: any){
    let url = `${environment.apiUrl}/api/HirigProcess/downloadHiringProcessesFilterExcel`
    return this.http.post(url,{ ...data },{observe: 'response', responseType: 'blob'})
    .pipe(
      map((response: any) => {
        console.log('downloadDocByType',response)
        var contentDisposition = response.headers.get('Content-Disposition');
        var filename: string;
        console.log('contentDisposition',contentDisposition)

        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) { 
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        let data = {
                  file: new Blob([response.body], {type: response.headers.get('Content-Type')}),
                  filename: filename//response.headers.get('File-Name') 
                }
        return data;
      }),      
      catchError((err) => {
        return Observable.throw(err);
      })
    );
  }

  getSectoresProductos(){
    return this.http.get(`${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCorrelativeSectorsAndProducts`);
  }


  getProcesoById(id: number){
    return this.http.get(`${environment.apiUrl}/api/HirigProcess/GetHiringProcessesById?idHiringProcess=${id}`,);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GenerarReportesCitasService {

  constructor(private http: HttpClient) { }

  getVirtualAppointmentsReports() {
    let dir = `${environment.apiUrl}/api/ReportVirtualAppointments/GetVirtualAppointmentsReports`;
    return this.http.get<any>(dir);
  }

  getVirtualAppointmentsReportsExcel(startDate: any, endDate: any) {
    //return this.http.get<any>(dir);
    let dir = `${environment.apiUrl}/api/ReportVirtualAppointments/GetVirtualAppointmentsReportsExcel?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(dir, { observe: 'response', responseType: 'blob' })
      .pipe(
        map((response: any) => {
          console.log('archivo de citas', response)
          var contentDisposition = response.headers.get('Content-Disposition');
          var filename: string = '';
          console.log('contentDisposition', contentDisposition)

          if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(contentDisposition);
            console.log('mathces',matches)
            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
              console.log('filename',filename);
            }
          }
          let data = {
            file: new Blob([response.body], { type: response.headers.get('Content-Type') }),
            filename: filename//response.headers.get('File-Name') 
          }
          return data;
        }),
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }
}

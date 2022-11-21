import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pbibody } from 'src/app/_model/reports/pbibody.model';
import { report } from 'src/app/_model/reports/report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionReportesService {

  constructor(private http: HttpClient) { }
  private listReports = `${environment.apiUrl}/api/report/`;
  private listReportsPBI = `${environment.apiUrl}/api/reports/`;
  private listRol = `${environment.apiUrl}/api/rol/`;

  public getReports() {
    return this.http.get<any[]>(`${this.listReports}getReports/?page=1&size=0`);
  }
  public getReportsByRol() {
    return this.http.get<any[]>(`${this.listReports}getreportsbyRol/?page=1&size=0`);
  }

  public getPowerBIReport(pbibody: pbibody) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${this.listReportsPBI}getPowerBIReport`, pbibody, httpOptions);
  }

  public getRolesforListReports() {
    return this.http.get<any[]>(`${this.listRol}getRolesforListReports`);
  }

  public getReportDetail(id: number) {
    return this.http.get<any>(`${this.listReports}getReportDetail?id=${id}`);
  }
  public validateReportExistence(id: any) {
    let data = [{nombre:id}]
    return this.http.get<any>(`${this.listReports}validateReportExistence?jsonReport=${JSON.stringify(data[0])}`);
  }
  public saveReport(rep: report) {
    let report = JSON.stringify(rep);
    return this.http.post<any>(`${this.listReports}createReport/?jsonReport=${report}`, { observe: 'response' });
  }
  public updateReport(rep: report) {
    let report = JSON.stringify(rep);
    return this.http.put<any>(`${this.listReports}updateReport/?jsonReport=${report}`, { observe: 'response' });
  }
  public deleteReport(rol: number) {
    return this.http.delete<any>(`${this.listReports}deleteReport?id=${rol}`);
  }
}

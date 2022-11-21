import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SupplyChainService {
  uri = `${environment.apiUrl}/api/SupplyChain`;

  constructor(private http: HttpClient) {}

  public getSupplyElements() {
    return this.http.get<any>(`${this.uri}/getSupplyElements`);
  }

  public getSupplyElementTemplates() {
    return this.http.get<any>(`${this.uri}/getSupplyElementTemplates`);
  }

  public getSupplyChainbyCompanyAndUser(companyId: string | number, user: string = '') {
    return this.http.get<any>(`${this.uri}/getSupplyChainbyCompanyAndUser?companyId=${companyId}&user=${user}`);
  }

  public manageSupplyChain(payload: any) {
    if( payload.idSupplyChain > 0 ) return this.http.post<any>(`${this.uri}/updateSupplyChain`, { ...payload });
    else return this.http.post<any>(`${this.uri}/createSupplyChain`, { ...payload });
  }

  public downloadSupplyChainbyCompanyAndUser(companyId: string | number, user: string = '') {
    return this.http.get<any>(`${this.uri}/DownloadSupplyChainbyCompanyAndUser?companyId=${companyId}`);
  }

  public deleteSupplyChainElement(payload: any) {
    return this.http.post<any>(`${this.uri}/deleteSupplyChainElement`, { ...payload });
  }
}

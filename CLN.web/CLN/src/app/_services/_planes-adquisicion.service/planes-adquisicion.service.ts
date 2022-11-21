import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanesAdquisicionService {

  constructor(private http: HttpClient) { }

  getAcquisitionPlanById(id: number) {
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/getAcquisitionPlanById?idAcquisition=${id}`);
  };

  getAcquisitionPlansByFilter(query: string) {
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/getAcquisitionPlansByFilter?${query}`);
  };

  getAcquisitionPlanMaximumValue() {
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/geAcquisitionPlanMaximumValue`);
  };
  
  getAcquisitionPlansTotalCount() {
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/getAcquisitionPlansTotalCount`);
  };
  
  getAcquisitionPlansModalities() {
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/getAcquisitionPlansMode`);
  };

  exportAcquisitionPlansByFilterToExcel(query: string) {
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/ExportarAcquisitionPlansExcel?${query}`);
  };
  
  getEntitiesNamesWithAcquisitionPlansByPhrase(word:string) {
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/filterCompaniesNameWithAcquisitionPlans?companyNameFilter=${word}`);
  };

  getTerritorialEntitiesInHiringProcess() {
    return this.http.get(`${environment.apiUrl}/api/Common/getTerritorialentities`);
  };
}
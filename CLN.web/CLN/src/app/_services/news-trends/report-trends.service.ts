import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportTrendsService {

  constructor(private http: HttpClient) { }
  apiReportTrends = `${environment.apiUrl}/api/ReportTrends/`;

  getReportTrendsUrls() {
    return this.http.get(`${this.apiReportTrends}GetReportTrendsUrls`);
  };
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleTrendsService {

  constructor(private http: HttpClient) { }
  apiGoogleTrends = `${environment.apiUrl}/api/GTrends/`;

  getGoogleTrendsJsonModelByKeyWord(keyWord: any) {
    return this.http.get(`${this.apiGoogleTrends}GetGoogleTrendsJsonModel/${keyWord}`);
  };
  getGoogleTrendsJsonModel() {
    return this.http.get(`${this.apiGoogleTrends}GetGoogleTrendsJsonModel`);
  };
}
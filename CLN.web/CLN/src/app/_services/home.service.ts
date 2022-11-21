import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {

  }
   public loadHome() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/contenido?modulo=home`);
  }
}

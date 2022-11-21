import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecretariasService {

  uri = `${environment.apiUrl}/api/secretarias`;

  constructor(
    private http: HttpClient
  ) { }

  public getSecretarias() {
    return this.http.get<any[]>(`${this.uri}`);
  }
}

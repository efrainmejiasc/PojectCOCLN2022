import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminWebService {

  constructor(
    private http: HttpClient
  ) { }

  public updateCorreoLogHistorico(email: String) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = {
      parametro: "cuentaCorreoLogHistorico",
      valor: email
    };
    console.log(`${environment.apiUrl}/api/config/updateSettings?jsonSettings=${JSON.stringify(data)}`)
    return this.http.put<any[]>(`${environment.apiUrl}/api/config/updateSettings?jsonSettings=${JSON.stringify(data)}`, { observe: 'response' });
  }
  public getCorreoLogHistorico() {
    var data = {
      parametro: "cuentaCorreoLogHistorico"
    };
    return this.http.get<any>(`${environment.apiUrl}/api/config/getSettingsbyParameter?parameter=${data.parametro}`);
  }
}

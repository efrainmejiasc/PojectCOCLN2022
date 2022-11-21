import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  private url = `${environment.apiUrl}/api/tablero`;

  constructor(private http: HttpClient) { }

  public getBoards(page: number, size: number) {
      return this.http.get<any[]>(`${this.url}/getBoards?page=${page}&size=${size}`);
  }

  public getBoardDetail(id: number) {
      return this.http.get<any>(`${this.url}/getBoardDetail?id=${id}`);
  }

  public createBoard(modelo: any) {
      return this.http.post<any>(`${this.url}/createBoard`, modelo);
  }

  public updateBoard(modelo: any) {
      return this.http.put<any>(`${this.url}/updateBoard`, modelo);
  }

  public deleteBoard(id: number) {
      return this.http.delete<any>(`${this.url}/deleteBoard?id=${id}`);
  }
}

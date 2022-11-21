import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FreeMarketService {

  constructor(private http: HttpClient) { }

  apiFreeMarket = `${environment.apiUrl}/api/FreeMarket/`;

  // Devuelve tendencias de Mercado Libre Colombia
  GetFreeMarketTrendsAsync() {
    return this.http.get(`${this.apiFreeMarket}GetFreeMarketTrendsAsync`);
  };

  // Devuelve datos de un producto por palabra clave
  GetFreeMarketProductAsync(id: any) {
    return this.http.get(`${this.apiFreeMarket}GetFreeMarketProductAsync/${id}`);
  };

  // Devuelve todas las categorias
  GetFreeMarketCategoriesAsync() {
    return this.http.get(`${this.apiFreeMarket}GetFreeMarketCategoriesAsync`);
  };

  // Devuelve tendencias de Mercado Libre Colombia de una categoria especifica
  GetFreeMarketTrendsCategorieAsync(id:any) {
    return this.http.get(`${this.apiFreeMarket}GetFreeMarketTrendsCategorieAsync/${id}`);
  };

  // Devuelve sub categorias
  GetFreeMarketEspecificCategorieAsync(id: number) {
    return this.http.get(`${this.apiFreeMarket}GetFreeMarketEspecificCategorieAsync/${id}`);
  };

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = `${environment.apiAuthUrl}/product/`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  createProduct(product: any) {
    return this.http.post<any>(this.productUrl, product, {
      headers: this.headers,
    });
  }

  getProducts() {
    return this.http.get<any>(this.productUrl, {
      headers: this.headers,
    });
  }
}

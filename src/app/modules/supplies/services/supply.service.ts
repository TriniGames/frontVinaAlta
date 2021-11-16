import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  private supplyUrl = `${environment.apiAuthUrl}/supply/`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  createSupply(supply: any) {
    return this.http.post<any>(this.supplyUrl, supply, {
      headers: this.headers,
    });
  }

  getSupplies() {
    return this.http.get<any>(this.supplyUrl, {
      headers: this.headers,
    });
  }
}

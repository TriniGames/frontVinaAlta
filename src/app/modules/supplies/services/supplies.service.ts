import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  authenticateUrl = 'supplies';

  constructor(
    private http: HttpClient
  ) { }
}

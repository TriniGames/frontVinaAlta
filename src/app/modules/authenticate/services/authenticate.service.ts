import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginInfo } from 'src/app/shared/models/authenticate/login-info.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  authenticateUrl = 'user';
  private jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  login(loginInfo: LoginInfo): Observable<any> {

    const json = loginInfo;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const loginUrl = `${environment.apiAuthUrl}/${this.authenticateUrl}/login`;

    return this.http.post<any>(loginUrl, loginInfo, { headers });
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelperService.isTokenExpired(token);
  }
}

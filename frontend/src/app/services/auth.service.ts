import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpOptionsService } from './http-options.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginInfo } from '../models/login-info';
import { SessionInfo } from '../models/session-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpointUrl = environment.apiUrl + '/login';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  public userTokenKey = 'user-token';
  public sessionInfoKey = 'session-info';
  public idTiendaActualKey = 'id-tienda-actual';

  loginRequest(loginInfo: LoginInfo): Observable<any> {
    // console.log(loginInfo);
    return this.http.post<any>(this.endpointUrl, loginInfo, this.httpOptions);
  }

  // requestPassResetRequest(usuario: string, loginType: LoginTypes): Observable<any> {
  //   const body = {
  //     "usuario": usuario,
  //     "loginType": loginType
  //   };

  //   return this.http.post<any>(this.endpointUrl + '/request-pass-reset', body, this.httpOptions);
  // }

  // resetPassRequest(newPassword: string, token: string) {
  //   const body = {
  //     "newPassword": newPassword,
  //     "token": token
  //   };

  //   return this.http.post<any>(this.endpointUrl + '/reset-pass', body, this.httpOptions);
  // }

  saveSessionInfo(userToken: string, sessionInfo: SessionInfo): void {
    localStorage.setItem(this.userTokenKey, userToken);
    localStorage.setItem(this.sessionInfoKey, JSON.stringify(sessionInfo));
  }

  getCurrentUserToken(): string {
    const storedUserToken = localStorage.getItem(this.userTokenKey);

    if (storedUserToken == null) {
      return '';
    }

    return storedUserToken;
  }

  getCurrentSessionInfo(): SessionInfo {
    const storedSessionInfo =  JSON.parse(localStorage.getItem(this.sessionInfoKey)) as SessionInfo;
    return storedSessionInfo;
  }

  logout(): void{
    localStorage.removeItem(this.userTokenKey);
    localStorage.removeItem(this.sessionInfoKey);
  }

  saveIdTiendaActual(idtienda: number): void {
    localStorage.setItem(this.idTiendaActualKey, idtienda.toString());
  }

  getIdTiendaActual(): number {
    return +localStorage.getItem(this.idTiendaActualKey);
  }
}

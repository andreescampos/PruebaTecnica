import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoTaza } from '../models/tipoTaza';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class TazaService {

  private endpointUrl = environment.apiUrl + '/taza';

  constructor(
    private http: HttpClient,
    private httpOptions: HttpOptionsService
  ) { }

  public userTokenKey = 'user-token';
  public sessionInfoKey = 'session-info';



  postTazaRequest(request): Observable<any> {
    return this.http.post<any>(this.endpointUrl, request, this.httpOptions);
  }

  getTazasRequest(): Observable<any> {
    return this.http.get<any>(this.endpointUrl + '/all', this.httpOptions);
  }

  postIngresoRequest(request): Observable<any> {
    return this.http.post<any>(this.endpointUrl + '/ingreso', request, this.httpOptions);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoTaza } from '../models/tipoTaza';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class TipoTazaService {

  private endpointUrl = environment.apiUrl + '/tipotaza';

  constructor(
    private http: HttpClient,
    private httpOptions: HttpOptionsService
  ) { }

  public userTokenKey = 'user-token';
  public sessionInfoKey = 'session-info';


  getTipoTazasRequest(): Observable<any> {
    return this.http.get<any>(this.endpointUrl + '/all', this.httpOptions);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private endpointUrl = environment.apiUrl + '/pedido';

  constructor(
    private http: HttpClient,
    private httpOptions: HttpOptionsService
  ) { }

  public userTokenKey = 'user-token';
  public sessionInfoKey = 'session-info';

  postPedidoRequest(request): Observable<any> {
    return this.http.post<any>(this.endpointUrl, request, this.httpOptions);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransportadoraModel } from './transportadoras/transportadora.model';

@Injectable({
  providedIn: 'root'
})
export class TransportadorasService {

  constructor(private http: HttpClient) { }

  deletarTransportadora(id:any) : Observable<any>{
  return this.http.delete("http://localhost:8080/transportadoras/".concat(id));  

  }

  atualizarTransportadora(id: any, transportadora: TransportadoraModel) : Observable<any>{
  return this.http.put("http://localhost:8080/transportadoras/".concat(id),transportadora);  

  }

  cadastrarTransportadora(transportadora: TransportadoraModel) : Observable<any>{
  return  this.http.post("http://localhost:8080/transportadoras",transportadora);

  }

  listarUfs() : Observable<any>{
  return this.http.get("http://localhost:8080/transportadoras/ufs");

  }

  listarCidades() : Observable<any>{
  return this.http.get("http://localhost:8080/transportadoras/cidades");

  }

  listarModais() : Observable<any>{
  return this.http.get("http://localhost:8080/transportadoras/modais");

  }

  listarTransportadora() : Observable<any>{
  return this.http.get("http://localhost:8080/transportadoras");

  }

}

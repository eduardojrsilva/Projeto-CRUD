import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from './estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseURL = "http://localhost:8080/estados";
  constructor(private HttpClient: HttpClient) { }

  listaEstados(): Observable<Estado[]>{
    return this.HttpClient.get<Estado[]>(`${this.baseURL}`);
  }

  criarEstado(estado: Estado): Observable<any>{
    return this.HttpClient.post(`${this.baseURL}`, estado);
  }

  BuscarEstadoPorId(id:number): Observable<Estado>{
    return this.HttpClient.get<Estado>(`${this.baseURL}/${id}`);
  }

  atualizarEstado(id:number, estado: Estado): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`, estado);
  }

  excluirEstado(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}

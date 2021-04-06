import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cidade } from './cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseURL = "http://localhost:8080/cidades";
  constructor(private HttpClient: HttpClient) { }

  listaCidades(): Observable<Cidade[]>{
    return this.HttpClient.get<Cidade[]>(`${this.baseURL}`);
  }

  criarCidade(cidade: Cidade): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`, cidade);
  }

  BuscarCidadePorId(id:number): Observable<Cidade>{
    return this.HttpClient.get<Cidade>(`${this.baseURL}/${id}`);
  }

  atualizarCidade(id:number, cidade: Cidade): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`, cidade);
  }

  excluirCidade(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}

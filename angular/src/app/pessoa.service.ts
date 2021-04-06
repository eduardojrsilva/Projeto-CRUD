import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from './pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private baseURL = "http://localhost:8080/pessoas";
  constructor(private HttpClient: HttpClient) { }

  listaPessoas(): Observable<Pessoa[]>{
    return this.HttpClient.get<Pessoa[]>(`${this.baseURL}`);
  }

  criarPessoa(pessoa: Pessoa): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`, pessoa);
  }

  BuscarPessoaPorId(id:number): Observable<Pessoa>{
    return this.HttpClient.get<Pessoa>(`${this.baseURL}/${id}`);
  }

  atualizarPessoa(id:number, pessoa: Pessoa): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`, pessoa);
  }

  excluirPessoa(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}

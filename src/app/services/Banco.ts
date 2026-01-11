import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioRequest {
  nome: string;
  senha?: string;
  admin?: boolean;
}

export interface Conta {
  id?: number;
  numero: string;
  saldo: number;
  usuario?: any;
}

export interface OperacaoRequest {
  numeroConta: string;
  valor: number;
}

export interface TransferenciaRequest {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
}

export interface ExtratoRequest {
  numeroConta: string;
  agencia: string;
}

export interface ExtratoResponse {
  titular: string
  numeroConta: string;
  agencia: string;
  saldo: number;
}

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/contas';

  criarConta(request: UsuarioRequest): Observable<Conta> {
    return this.http.post<Conta>(this.apiUrl, request);
  }

  creditar(request: OperacaoRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/creditar`, request);
  }

  debitar(request: OperacaoRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/debitar`, request);
  }

  transferir(request: TransferenciaRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transferir`, request);
  }

  extrato(request: ExtratoRequest): Observable<ExtratoResponse> {
  return this.http.post<ExtratoResponse>(`${this.apiUrl}/extrato`, request);
}
}

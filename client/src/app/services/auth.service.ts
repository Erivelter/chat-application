import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiURL = 'http://localhost:4600';
   private userName:string = '';
  constructor(private http: HttpClient, private router: Router) { }

  // Método para registrar um novo usuário
  register(nome: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, { nome, senha }).pipe(
      tap(response => {
        console.log('Registro bem-sucedido:', response);
      }),
      catchError(error => {
        console.error('Erro ao registrar:', error);
        throw error;
      })
    );
  }

  login(nome: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, { nome, senha }).pipe(
      tap((response: any) => {
        console.log('Login bem-sucedido:', response);
        const userName =  response.nome || nome; // Verifica o campo correto
        this.setUserName(userName);
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        throw error;
      })
    );
  }

// Método para verificar se o usuário está logado
isLoggedIn(): boolean {
  const user = localStorage.getItem('userName'); // Verifica no localStorage
  return !!user; // Retorna true se o usuário estiver armazenado
}


  // Armazena o nome do usuário
  setUserName(name: string): void {
    this.userName = name;
    localStorage.setItem('userName', name);
  }

  // Recupera o nome do usuário
  getUserName(): string {
    return this.userName || localStorage.getItem('userName') || '';
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) {}

  login(usuario: { email: string, senha: string }): Observable<any> {
    return this.httpClient.get<Array<{ id: string, nome: string, email: string, senha: string, perfil: string }>>(this.apiUrl).pipe(
      map(usuarios => {

        const user = usuarios.find(u => u.email === usuario.email && u.senha === usuario.senha);
        return user ? user : null; 
      })
    );
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
  }
}

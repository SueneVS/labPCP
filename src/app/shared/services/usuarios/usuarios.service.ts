import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosInterface } from '../../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) {}
  private apiUrl = 'http://localhost:3000/usuarios';

  getUsuarios() {
    return this.httpClient.get<Array<UsuariosInterface>>(this.apiUrl);
  }

  getUsuario(id: string) {
    return this.httpClient.get<UsuariosInterface>(this.apiUrl + `/${id}`);
  }
  postUsuario(usuario: UsuariosInterface) {
    return this.httpClient.post<any>(this.apiUrl, usuario);
  }

  putUsuario(usuario: UsuariosInterface) {
    return this.httpClient.put<any>(this.apiUrl + `/${usuario.id}`, usuario);
  }

  delete(id: string) {
    return this.httpClient.delete<any>(this.apiUrl + `/${id}`);
  }
}


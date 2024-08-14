import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurmasInterface } from '../../interfaces/turmas';
import { NotasInterface } from '../../interfaces/notas';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private httpClient: HttpClient) {}
  private apiNotasUrl = 'http://localhost:3000/cadastro-notas';


  getNotas(): Observable<NotasInterface[]> {
    return this.httpClient.get<NotasInterface[]>(this.apiNotasUrl);
  }

  getTurma(id: string): Observable<NotasInterface> {
    const url = `${this.apiNotasUrl}/${id}`;
    return this.httpClient.get<NotasInterface>(url);
  }
}

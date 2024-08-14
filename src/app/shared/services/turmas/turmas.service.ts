import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TurmasInterface } from '../../interfaces/turmas';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  constructor(private httpClient: HttpClient) {}
  private apiTurmasUrl = 'http://localhost:3000/turmas';

  getTotalTurmas(): Observable<number> {
    return this.httpClient.get<Array<any>>(this.apiTurmasUrl).pipe(
      map(turmas => turmas.length)
    );
  }

  getTurmas(): Observable<TurmasInterface[]> {
    return this.httpClient.get<TurmasInterface[]>(this.apiTurmasUrl);
  }

  getTurma(id: string): Observable<TurmasInterface> {
    const url = `${this.apiTurmasUrl}/${id}`;
    return this.httpClient.get<TurmasInterface>(url);
  }
}

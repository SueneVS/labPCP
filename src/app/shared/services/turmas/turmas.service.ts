import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
}

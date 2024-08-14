import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MateriasInterface } from '../../interfaces/materias';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private httpClient: HttpClient) {}
  private apiMateriasUrl = 'http://localhost:3000/materias';

  getTotalMaterias(): Observable<number> {
    return this.httpClient.get<Array<any>>(this.apiMateriasUrl).pipe(
      map(materias => materias.length)
    );
  }

  getMaterias(): Observable<MateriasInterface[]> {
    return this.httpClient.get<MateriasInterface[]>(this.apiMateriasUrl);
  }

  getMateria(id: string): Observable<MateriasInterface> {
    const url = `${this.apiMateriasUrl}/${id}`;
    return this.httpClient.get<MateriasInterface>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private profesoresUrl = 'http://localhost:8080/api/profesores/listado'; 

  private agregarAuthorizationHeader() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }

  constructor(private http: HttpClient) { }

  getProfesoresByCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.profesoresUrl}?categoria=${categoria}`, { headers: this.agregarAuthorizationHeader() });
  }
}


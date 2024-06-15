import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
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

  private apiUrl = 'http://localhost:8080/api/cursos/categorias'; // Asegúrate de que la URL sea correcta
  private conteoUrl = 'http://localhost:8080/api/cursos/conteo-por-categoria';
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl, { headers: this.agregarAuthorizationHeader() });
  }
  getConteoPorCategoria(categoria: string): Observable<any> {
    return this.http.get<any>(`${this.conteoUrl}?categoria=${categoria}`, { headers: this.agregarAuthorizationHeader() });
  }

}


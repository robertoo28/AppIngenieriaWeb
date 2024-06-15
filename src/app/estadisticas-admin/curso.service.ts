import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  private apiUrl = 'http://localhost:8080/api/cursos/categorias';
  private conteoUrl = 'http://localhost:8080/api/cursos/conteo-por-categoria';
  private cursosUrl = 'http://localhost:8080/api/cursos';
  private promedioUrl = 'http://localhost:8080/api/notas_subtema/promedio';
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl, { headers: this.agregarAuthorizationHeader() });
  }
  getConteoPorCategoria(categoria: string): Observable<any> {
    return this.http.get<any>(`${this.conteoUrl}?categoria=${categoria}`, { headers: this.agregarAuthorizationHeader() });
  }
  getCursos(): Observable<string[]> {
    return this.http.get<any[]>(this.cursosUrl, { headers: this.agregarAuthorizationHeader() }).pipe(
      map(cursos => cursos.map(cursoArray => cursoArray[1], console.log(cursos)))
    );
  }

  getCursosID():Observable<number[]>{
    return this.http.get<any[]>(this.cursosUrl, { headers: this.agregarAuthorizationHeader() }).pipe(
      map(cursos => cursos.map(cursoArray => cursoArray[2], console.log(cursos)))
    );
  }
  getCursosG():Observable<any[]>{
    return this.http.get<any[]>(this.cursosUrl, { headers: this.agregarAuthorizationHeader() })
  }
  findCursoByNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.cursosUrl}/nombre/${nombre}`, { headers: this.agregarAuthorizationHeader() });
  }
  getPromedioNotasSubtema(cursoId: number, startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.promedioUrl}?cursoId=${cursoId}&startDate=${startDate}&endDate=${endDate}`, { headers: this.agregarAuthorizationHeader() });
  }
}


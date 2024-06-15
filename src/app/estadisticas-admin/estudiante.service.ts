import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from './estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
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

  private apiUrl = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  getTotalEstudiantes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count` , { headers: this.agregarAuthorizationHeader() });
  }
  getPromedio(categoria:string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/promedio` , { headers: this.agregarAuthorizationHeader(), params:{categoria} });
  }
  getEstudiantesByCategoria(categoria: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Listestudiantes`, { headers: this.agregarAuthorizationHeader(),params:{categoria} });
  }
}

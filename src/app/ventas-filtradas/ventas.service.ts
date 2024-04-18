
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private baseUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) { }
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
  getVentasPorFechas(fechaInicio: string, fechaFin: string): Observable<any> {
    const headers = this.agregarAuthorizationHeader();
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    return this.http.get(`${this.baseUrl}/por-fecha`, { headers: headers, params: params });
  }
}


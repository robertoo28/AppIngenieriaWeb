import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public produccion = 'https://dazzling-spontaneity-production.up.railway.app/api/clientes';
  public testing = 'http://localhost:8080/api/clientes';
  private urlEndpoint:string = this.produccion;

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

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndpoint, { headers: this.agregarAuthorizationHeader() });
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndpoint, cliente, { headers: this.agregarAuthorizationHeader() });
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`, { headers: this.agregarAuthorizationHeader() });
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, { headers: this.agregarAuthorizationHeader() });
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, { headers: this.agregarAuthorizationHeader() });
  }
}

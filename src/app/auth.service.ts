import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const produccion = 'https://dazzling-spontaneity-production.up.railway.app/api/auth/signin';
    const testing = 'http://localhost:8080/api/auth/signin';
    return this.http.post<any>(testing, { username, password })
      .pipe(map(user => {
        // Asumiendo que tu backend devuelve un objeto con una propiedad 'token'
        if (user && user.token) {
          // Almacenar los detalles del usuario y el token jwt en el almacenamiento local para mantener al usuario logueado entre recargas de página
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          // Correctamente almacenando el token en localStorage
          localStorage.setItem('jwtToken', user.token);
        }

        return user;
      }));
  }
  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return token != null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken');
    console.log('eliminadoooo'); // Porfavor eliminate te lo suplico
    this.currentUserSubject.next(null);
  }
}

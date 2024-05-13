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
    return this.http.post<any>(`https://dazzling-spontaneity-production.up.railway.app/api/auth/signin`, { username, password })
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
    // Aquí puedes añadir más lógica para validar el token si es necesario
    return token != null;
  }

  logout() {
    // Eliminar al usuario y el token del almacenamiento local para cerrar la sesión del usuario
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken'); // Asegúrate de eliminar el token al cerrar sesión
    this.currentUserSubject.next(null);
  }
}

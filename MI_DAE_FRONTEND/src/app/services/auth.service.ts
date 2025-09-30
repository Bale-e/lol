import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

// Interfaces para el manejo de datos
export interface LoginRequest {
  correo: string;
  clave: string;
}

export interface User {
  correo: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  tipo: { nombre: string };
  loginTime: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
      tokenType: string;
      expiresIn: string;
    };
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_BASE_URL = 'http://localhost:3000/api';
  private readonly LOGIN_ENDPOINT = '/usuarios/login';
  
  // Lista de correos de administradores
  private readonly ADMIN_EMAILS = [
    'benjamin.rojas71@inacapmail.cl'
    // Aquí puedes agregar más correos de admin en el futuro
  ];

  // Subject para el estado de autenticación
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromStorage());

  // Observables públicos
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Realiza el login del usuario
   */
  login(loginData: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(
      `${this.API_BASE_URL}${this.LOGIN_ENDPOINT}`,
      loginData,
      { headers }
    ).pipe(
      map((response: LoginResponse) => {
        if (response.success) {
          // Guardar tokens y usuario en localStorage
          this.setSession(response.data);
          
          // Actualizar subjects
          this.isLoggedInSubject.next(true);
          this.currentUserSubject.next(response.data.user);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(() => error.error || error);
      })
    );
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    
    // Actualizar subjects
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  /**
   * Verificar si el usuario está logueado
   */
  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  /**
   * Verificar si el usuario actual es administrador
   */
  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    
    return this.ADMIN_EMAILS.includes(currentUser.correo);
  }

  /**
   * Obtener el usuario actual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtener el token de acceso
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Verificar si existe un token válido
   */
  private hasValidToken(): boolean {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('currentUser');
    
    // Verificación básica - aquí podrías agregar validación de expiración
    return !!(token && user);
  }

  /**
   * Guardar datos de sesión
   */
  private setSession(data: LoginResponse['data']): void {
    localStorage.setItem('accessToken', data.tokens.accessToken);
    localStorage.setItem('refreshToken', data.tokens.refreshToken);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
  }

  /**
   * Obtener usuario desde localStorage
   */
  private getCurrentUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Redirigir según el rol del usuario
   */
  redirectBasedOnRole(): void {
    if (this.isAdmin()) {
      this.router.navigate(['/home-admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}

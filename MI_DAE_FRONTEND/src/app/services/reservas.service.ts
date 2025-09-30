import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reserva, ReservaDTO, ApiResponse } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api/reservas'; // Nuevo endpoint

  constructor(private http: HttpClient) {}

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
      console.error('Error completo del servidor:', error);
    }
    console.error('Error en API:', errorMessage);
    return throwError(() => errorMessage);
  }

  // Obtener todas las reservas
  getAll(): Observable<Reserva[]> {
    console.log('Haciendo petición GET a:', this.apiUrl);
    return this.http.get<ApiResponse<Reserva[]>>(this.apiUrl).pipe(
      map(response => response.data || []),
      catchError(this.handleError)
    );
  }

  // Obtener reserva por ID
  getById(id: number): Observable<Reserva> {
    console.log(`Haciendo petición GET a: ${this.apiUrl}/${id}`);
    return this.http.get<ApiResponse<Reserva>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Crear reserva
  create(reserva: ReservaDTO): Observable<Reserva> {
    console.log('Haciendo petición POST a:', this.apiUrl, 'con datos:', reserva);
    return this.http.post<ApiResponse<Reserva>>(this.apiUrl, reserva).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Actualizar reserva
  update(id: number, reserva: ReservaDTO): Observable<Reserva> {
    console.log(`Haciendo petición PUT a: ${this.apiUrl}/${id}`, 'con datos:', reserva);
    return this.http.put<ApiResponse<Reserva>>(`${this.apiUrl}/${id}`, reserva).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Eliminar reserva
  delete(id: number): Observable<any> {
    console.log(`Haciendo petición DELETE a: ${this.apiUrl}/${id}`);
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Obtener reservas por usuario (nuevo método)
  getByUser(usuariofk: string): Observable<Reserva[]> {
    console.log(`Haciendo petición GET a: ${this.apiUrl}/user/${usuariofk}`);
    return this.http.get<ApiResponse<Reserva[]>>(`${this.apiUrl}/user/${usuariofk}`).pipe(
      map(response => response.data || []),
      catchError(this.handleError)
    );
  }

  // Obtener reservas por rango de fechas (nuevo método)
  getByDateRange(fechaInicio: string, fechaFin: string): Observable<Reserva[]> {
    console.log(`Haciendo petición GET a: ${this.apiUrl}/range?start=${fechaInicio}&end=${fechaFin}`);
    return this.http.get<ApiResponse<Reserva[]>>(`${this.apiUrl}/range?start=${fechaInicio}&end=${fechaFin}`).pipe(
      map(response => response.data || []),
      catchError(this.handleError)
    );
  }

  // Verificar si horario está ocupado (nuevo método)
  checkAvailability(hora_inicio: string, hora_fin: string, espaciofk?: number): Observable<boolean> {
    const params = { hora_inicio, hora_fin, espaciofk: espaciofk?.toString() || '' };
    console.log('Verificando disponibilidad:', params);
    return this.http.get<ApiResponse<{ available: boolean }>>(`${this.apiUrl}/check-availability`, { params }).pipe(
      map(response => response.data.available),
      catchError(this.handleError)
    );
  }

  // Método para probar la conexión con el backend
  testConnection(): Observable<any> {
    console.log('Probando conexión con el backend...');
    return this.http.get(`${this.apiUrl}/test`).pipe(
      catchError(this.handleError)
    );
  }
}

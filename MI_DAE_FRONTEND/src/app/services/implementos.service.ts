import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Implemento {
  id: number;
  nombreImplemento: string;
  stock: number;
  detalle: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImplementosService {
  private apiUrl = 'http://localhost:3000/api/implementos'; // Ajusta la URL base

  constructor(private http: HttpClient) {}

  getAll(): Observable<Implemento[]> {
    return this.http.get<Implemento[]>(this.apiUrl);
  }

  add(implemento: Omit<Implemento, 'id'>): Observable<{ insertId: number }> {
    return this.http.post<{ insertId: number }>(this.apiUrl, implemento);
  }

  update(id: number, implemento: Omit<Implemento, 'id'>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, implemento);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

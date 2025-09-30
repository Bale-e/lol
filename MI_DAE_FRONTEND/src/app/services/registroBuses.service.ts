import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroBus, RegistroBusesResponse } from '../interfaces/registro-bus.interface';

// Mantenemos esta interfaz para compatibilidad hacia atrás
export interface UsoBus {
  busesfk: number;
  usuariofk: string;
  fechaHoraUso: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroBusesService {
  private apiUrl = 'http://localhost:3000/api'; // Usando proxy, no necesitamos la URL completa

  constructor(private http: HttpClient) { }

  // Método para obtener todos los registros de uso de buses
  // Endpoint: /bususeroute que ejecuta SELECT * FROM usoBuses ORDER BY fechaHoraUso DESC
  getRegistrosBuses(): Observable<RegistroBusesResponse> {
    return this.http.get<RegistroBusesResponse>(`${this.apiUrl}/bususeroute`);
  }
}
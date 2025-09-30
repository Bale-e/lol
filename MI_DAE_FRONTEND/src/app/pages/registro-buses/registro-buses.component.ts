import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroBusesService, UsoBus } from '../../services/registroBuses.service';
import { RegistroBus, RegistroBusesResponse } from '../../interfaces/registro-bus.interface';

@Component({
  selector: 'app-registro-buses',
  imports: [CommonModule],
  templateUrl: './registro-buses.html',
  styleUrl: './registro-buses.css'
})
export class RegistroBuses implements OnInit, AfterViewInit, OnDestroy {
  registrosBuses: RegistroBus[] = [];  // Cambiamos a RegistroBus[] para mejor tipado
  error = '';
  datosObtenidos = false; // Para saber si ya intentamos cargar datos
  private eventListener?: () => void;

  constructor(private registroBusesService: RegistroBusesService) {}

  ngOnInit(): void {
    // Intentar cargar inmediatamente
    this.cargarRegistros();
    
    // Agregar listener para el evento personalizado de recarga
    this.eventListener = () => {
      console.log('Evento de recarga recibido desde home-admin');
      this.cargarRegistros();
    };
    window.addEventListener('recargarRegistrosBuses', this.eventListener);
  }

  ngAfterViewInit(): void {
    // Si después de que la vista se inicializa y no hay datos, intentar de nuevo
    setTimeout(() => {
      if (!this.datosObtenidos && this.registrosBuses.length === 0 && !this.error) {
        console.log('Reintentando carga automática después de AfterViewInit...');
        this.cargarRegistros();
      }
    }, 1500);
  }

  ngOnDestroy(): void {
    // Limpiar el event listener cuando el componente se destruya
    if (this.eventListener) {
      window.removeEventListener('recargarRegistrosBuses', this.eventListener);
    }
  }

  cargarRegistros(): void {
    this.error = '';
    this.datosObtenidos = false;
    
    console.log('Iniciando carga de registros...');
    
    this.registroBusesService.getRegistrosBuses().subscribe({
      next: (response: RegistroBusesResponse) => {
        console.log('Respuesta completa de la API:', response);
        console.log('Tipo de respuesta:', typeof response);
        console.log('Success:', response.success);
        console.log('Message:', response.message);
        console.log('Count:', response.count);
        console.log('Data array:', response.data);
        console.log('Es array el data?', Array.isArray(response.data));
        console.log('Longitud del array:', response.data?.length);
        
        // AQUÍ ESTÁ EL CAMBIO IMPORTANTE: extraer el array data
        this.registrosBuses = response.data || [];
        this.datosObtenidos = true;
        
        console.log('registrosBuses después de asignar:', this.registrosBuses);
        console.log('Es array registrosBuses?', Array.isArray(this.registrosBuses));
      },
      error: (err) => {
        console.error('Error completo:', err);
        this.error = 'Error al cargar los registros: ' + err.message;
        this.registrosBuses = [];
        this.datosObtenidos = true; // Marcamos como obtenidos para evitar reintentos infinitos
      }
    });
  }

  // Método para refrescar los datos
  refrescar(): void {
    this.cargarRegistros();
  }

  // Método para formatear la fecha
  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // TrackBy function para mejorar el rendimiento de ngFor
  trackByRegistro(index: number, registro: RegistroBus): string {
    return `${registro.busesfk}-${registro.usuariofk}-${registro.fechaHoraUso}`;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reservas.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];
  nuevaReserva: any = { id_reserva: 0, hora_reserva: '', usuariofk: 0, espaciofk: 0, implementosfk: 0 };
  mensaje: string = '';
  error: string = '';
  editando: boolean = false;

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    console.log('Inicializando componente de reservas...');
    this.cargarReservas();
  }

  cargarReservas(): void {
    console.log('Cargando reservas...');
    this.error = '';
    this.mensaje = '';
    
    this.reservaService.getAll().subscribe({
      next: (data: any[]) => {
        console.log('Reservas cargadas exitosamente:', data);
        this.reservas = data;
      },
      error: (errorMessage: string) => {
        console.error('Error al cargar reservas:', errorMessage);
        this.error = `Error al cargar reservas: ${errorMessage}`;
        this.reservas = [];
      }
    });
  }

  crearReserva(): void {
    console.log('Creando reserva:', this.nuevaReserva);
    this.error = '';
    this.mensaje = '';
    
    this.reservaService.create(this.nuevaReserva).subscribe({
      next: (response) => {
        console.log('Reserva creada exitosamente:', response);
        this.mensaje = 'Reserva creada con éxito';
        this.resetFormulario();
        this.cargarReservas();
      },
      error: (errorMessage: string) => {
        console.error('Error al crear reserva:', errorMessage);
        this.error = `Error al crear reserva: ${errorMessage}`;
      }
    });
  }

  eliminarReserva(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
      console.log('Eliminando reserva con ID:', id);
      this.error = '';
      this.mensaje = '';
      
      this.reservaService.delete(id).subscribe({
        next: (response) => {
          console.log('Reserva eliminada exitosamente:', response);
          this.mensaje = 'Reserva eliminada con éxito';
          this.cargarReservas();
        },
        error: (errorMessage: string) => {
          console.error('Error al eliminar reserva:', errorMessage);
          this.error = `Error al eliminar reserva: ${errorMessage}`;
        }
      });
    }
  }

  editarReserva(reserva: any): void {
    this.editando = true;
    this.nuevaReserva = { ...reserva };
  }

  actualizarReserva(): void {
    console.log('Actualizando reserva:', this.nuevaReserva);
    this.error = '';
    this.mensaje = '';
    
    this.reservaService.update(this.nuevaReserva.id_reserva, this.nuevaReserva).subscribe({
      next: (response) => {
        console.log('Reserva actualizada exitosamente:', response);
        this.mensaje = 'Reserva actualizada con éxito';
        this.resetFormulario();
        this.cargarReservas();
        this.editando = false;
      },
      error: (errorMessage: string) => {
        console.error('Error al actualizar reserva:', errorMessage);
        this.error = `Error al actualizar reserva: ${errorMessage}`;
      }
    });
  }

  resetFormulario(): void {
    this.nuevaReserva = { id_reserva: 0, hora_reserva: '', usuariofk: 0, espaciofk: 0, implementosfk: 0 };
    this.mensaje = '';
    this.error = '';
    this.editando = false;
  }

  // Método para probar la conexión con el backend
  probarConexion(): void {
    console.log('Probando conexión con el backend...');
    this.reservaService.testConnection().subscribe({
      next: (response) => {
        console.log('Conexión exitosa:', response);
        this.mensaje = 'Conexión con el backend exitosa';
      },
      error: (errorMessage: string) => {
        console.error('Error de conexión:', errorMessage);
        this.error = `Error de conexión: ${errorMessage}`;
      }
    });
  }
}

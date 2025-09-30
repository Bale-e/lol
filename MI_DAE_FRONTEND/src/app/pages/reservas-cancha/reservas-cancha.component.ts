import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reservas.service';
import { RouterModule } from '@angular/router';
import { Reserva, ReservaDTO, ReservaLocal } from '../../interfaces/reserva.interface';

// Importa funciones de date-fns para manejo de fechas
import { startOfWeek, endOfWeek, parseISO } from 'date-fns';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reservas-cancha.component.html',
  styleUrls: ['./reservas-cancha.component.css']
})
export class ReservasComponent implements OnInit {
  // Datos desde backend
  reservas: Reserva[] = [];

  // Overlays locales optimistas (pintan al instante)
  ocupacionesLocales: ReservaLocal[] = [];

  // Form/estado - Actualizado para nueva estructura
  nuevaReserva: Reserva = { 
    id_reserva: 0, 
    hora_inicio_reserva: '', 
    hora_fin_reserva: '',
    usuariofk: '', // Ahora es email
    espaciofk: null, 
    implementosfk: null 
  };
  mensaje: string = '';
  error: string = '';
  editando: boolean = false;

  // Usuario actual (deberías obtenerlo del servicio de autenticación)
  readonly DEFAULT_USUARIO_EMAIL = 'benjamin.rojas71@inacapmail.cl'; // Temporalmente hardcodeado
  readonly DEFAULT_ESPACIO_ID = null; // Cancha genérica
  readonly DEFAULT_IMPLEMENTO_ID = null; // Sin implemento específico

  // Días y tramos
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  horas: string[] = [
    '08:30 - 09:15', '09:15 - 10:00', '10:00 - 10:45', '10:45 - 11:30',
    '11:30 - 12:15', '12:15 - 13:00','13:00 - 13:45','13:45 - 14:30',
    '14:30 - 15:15', '15:15 - 16:00', '16:00 - 16:45', '16:45 - 17:30',
    '17:30 - 18:15', '18:15 - 19:00', '19:00 - 19:45', '19:45 - 20:30',
    '20:30 - 21:15',
  ];

  // Mock para demo si el backend no devuelve nada
  reserva: any[] = [
    { dia: 'Lunes',   hora: '10:00 - 10:45', titulo: 'basketball', inicio: '2025-04-21', fin: '2025-07-31', usuario: 'Benjamin rojas', usuariofk: 1 },
    { dia: 'Martes',  hora: '10:00 - 10:45', titulo: 'Futbol',     inicio: '2025-04-21', fin: '2025-07-31', usuario: 'Benjamin salazar', usuariofk: 1 },
    { dia: 'Jueves',  hora: '10:00 - 10:45', titulo: 'Futbol',     inicio: '2025-04-24', fin: '2025-07-31', usuario: 'Benjamin Rojas', usuariofk: 2 },
    { dia: 'Viernes', hora: '11:30 - 12:15', titulo: 'Tenis',      inicio: '2025-04-24', fin: '2025-07-31', usuario: 'Benjamin Salazar', usuariofk: 1 },
  ];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.error = '';
    this.mensaje = '';
    this.reservaService.getAll().subscribe({
      next: (data: any[]) => {
        this.reservas = Array.isArray(data) ? data : [];
      },
      error: (errorMessage: string) => {
        this.error = `Error al cargar reservas: ${errorMessage}`;
        this.reservas = [];
      }
    });
  }

  crearReserva(): void {
    this.error = '';
    this.mensaje = '';
    
    // Crear DTO con los campos requeridos
    const dto: ReservaDTO = {
      hora_inicio_reserva: this.nuevaReserva.hora_inicio_reserva,
      hora_fin_reserva: this.nuevaReserva.hora_fin_reserva,
      usuariofk: this.nuevaReserva.usuariofk,
      espaciofk: this.nuevaReserva.espaciofk,
      implementosfk: this.nuevaReserva.implementosfk
    };
    
    this.reservaService.create(dto).subscribe({
      next: () => {
        this.mensaje = 'Reserva creada con éxito';
        this.resetFormulario();
        this.cargarReservas();
      },
      error: (errorMessage: string) => {
        this.error = `Error al crear reserva: ${errorMessage}`;
      }
    });
  }

  eliminarReserva(reserva: any): void {
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) return;
    this.error = '';
    this.mensaje = '';
    // Si tiene id_reserva, eliminar del backend
    if (reserva.id_reserva) {
      this.reservaService.delete(reserva.id_reserva).subscribe({
        next: () => {
          this.mensaje = 'Reserva eliminada con éxito';
          this.cargarReservas();
        },
        error: (errorMessage: string) => {
          this.error = `Error al eliminar reserva: ${errorMessage}`;
        }
      });
    } else {
  // Si es local, eliminar solo la reserva local seleccionada por id_local
  this.ocupacionesLocales = this.ocupacionesLocales.filter(o => o.id_local !== reserva.id_local);
  this.mensaje = 'Reserva local eliminada';
    }
  }

  editarReserva(reserva: any): void {
    this.editando = true;
    this.nuevaReserva = { ...reserva };
  }

  actualizarReserva(): void {
    this.error = '';
    this.mensaje = '';
    
    if (!this.nuevaReserva.id_reserva) {
      this.error = 'ID de reserva no válido';
      return;
    }
    
    // Crear DTO con los campos requeridos
    const dto: ReservaDTO = {
      hora_inicio_reserva: this.nuevaReserva.hora_inicio_reserva,
      hora_fin_reserva: this.nuevaReserva.hora_fin_reserva,
      usuariofk: this.nuevaReserva.usuariofk,
      espaciofk: this.nuevaReserva.espaciofk,
      implementosfk: this.nuevaReserva.implementosfk
    };
    
    this.reservaService.update(this.nuevaReserva.id_reserva, dto).subscribe({
      next: () => {
        this.mensaje = 'Reserva actualizada con éxito';
        this.resetFormulario();
        this.cargarReservas();
        this.editando = false;
      },
      error: (errorMessage: string) => {
        this.error = `Error al actualizar reserva: ${errorMessage}`;
      }
    });
  }

  resetFormulario(): void {
    this.nuevaReserva = { 
      id_reserva: 0, 
      hora_inicio_reserva: '', 
      hora_fin_reserva: '',
      usuariofk: this.DEFAULT_USUARIO_EMAIL, 
      espaciofk: this.DEFAULT_ESPACIO_ID, 
      implementosfk: this.DEFAULT_IMPLEMENTO_ID 
    };
    this.mensaje = '';
    this.error = '';
    this.editando = false;
  }

  // Normalización para comparaciones robustas
  private normalizar(s: any): string {
    return String(s ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Unifica campos independientemente del origen (API/mock/local)
  private unificar(r: any) {
    return {
      ...r,
      dia: r?.dia ?? this.obtenerDiaDeSemana(r?.hora_inicio_reserva || r?.fecha_reserva),
      hora: r?.hora ?? this.formatearRangoHora(r?.hora_inicio_reserva, r?.hora_fin_reserva),
      titulo: r?.titulo ?? 'Reservado',
      inicio: r?.inicio ?? r?.fecha_reserva?.slice(0, 10) ?? r?.hora_inicio_reserva?.slice(0, 10) ?? '',
      fin: r?.fin ?? r?.hora_fin_reserva?.slice(0, 10) ?? '',
      usuario: r?.usuario ?? r?.usuariofk ?? 'Reservado',
      usuariofk: r?.usuariofk ?? '',
    };
  }

  // Obtener día de la semana desde una fecha
  private obtenerDiaDeSemana(fechaStr?: string): string {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[fecha.getDay()] || '';
  }

  // Formatear rango de hora desde timestamps
  private formatearRangoHora(inicio?: string, fin?: string): string {
    if (!inicio || !fin) return '';
    const horaInicio = new Date(inicio).toTimeString().slice(0, 5);
    const horaFin = new Date(fin).toTimeString().slice(0, 5);
    return `${horaInicio} - ${horaFin}`;
  }

  // Combina backend/mock con ocupaciones locales y filtra por día/hora
  getReservas(dia: string, hora: string) {
    const baseFuente = (this.reservas && this.reservas.length) ? this.reservas : this.reserva;
    const base = baseFuente.map(r => this.unificar(r));
    const locales = this.ocupacionesLocales.map(r => this.unificar(r));

    // Evitar duplicados entre base y locales
    const combinadas = [
      ...base,
      ...locales.filter(l => !base.some(b =>
        this.normalizar(b.dia) === this.normalizar(l.dia) &&
        this.normalizar(b.hora) === this.normalizar(l.hora)
      ))
    ];

    return combinadas.filter(r =>
      this.normalizar(r.dia) === this.normalizar(dia) &&
      this.normalizar(r.hora) === this.normalizar(hora)
    );
  }


  // Contar reservas que usuario tiene en el día
  private contarReservasEnDia(usuarioEmail: string, dia: string): number {
    const reservasUsuario = (this.reservas && this.reservas.length) ? this.reservas : this.reserva;
    return reservasUsuario.filter(r =>
      this.normalizar(r.dia) === this.normalizar(dia) &&
      r.usuariofk === usuarioEmail
    ).length;
  }

  // Contar reservas que usuario tiene en la semana actual (backend + locales)
  private contarReservasEnSemana(usuarioEmail: string): number {
    const reservasBackend = (this.reservas && this.reservas.length) ? this.reservas : this.reserva;
    const reservasLocales = this.ocupacionesLocales;
    const hoy = new Date();
    const inicioSemana = startOfWeek(hoy, { weekStartsOn: 1 }); // Lunes
    const finSemana = endOfWeek(hoy, { weekStartsOn: 1 });

    // Unificar ambas fuentes
    const todas = [...reservasBackend, ...reservasLocales];

    return todas.filter(r => {
      if (r.usuariofk !== usuarioEmail) return false;
      // Usar hora_inicio_reserva o fecha_reserva o inicio
      const fechaStr = r.hora_inicio_reserva || r.fecha_reserva || r.inicio;
      if (!fechaStr) return false;
      // Si viene con hora, tomar solo la fecha
      const fechaReserva = parseISO(fechaStr.slice(0, 10));
      return fechaReserva >= inicioSemana && fechaReserva <= finSemana;
    }).length;
  }

  // Ocupar una celda libre al hacer clic (optimista + POST al backend)
  ocuparCelda(dia: string, hora: string): void {
    this.error = '';
    this.mensaje = '';

    const reservasEnDia = this.contarReservasEnDia(this.DEFAULT_USUARIO_EMAIL, dia);
    const reservasEnSemana = this.contarReservasEnSemana(this.DEFAULT_USUARIO_EMAIL);

    // Validar límite semanal
    if (reservasEnSemana >= 2) {
      this.error = 'Has alcanzado el límite de 2 reservas por semana';
      return;
    }

    // Validar límite por día (máximo 2 por día)
    if (reservasEnDia >= 2) {
      this.error = `Solo puedes reservar 2 veces el día ${dia}`;
      return;
    }

    // Ya ocupada, no hacer nada
    if (this.getReservas(dia, hora).length > 0) return;

    // Calcular horarios basados en la hora seleccionada
    const { inicio, fin } = this.calcularHorarios(dia, hora);

    // 1) Ocupación local inmediata con id_local único
    const overlay: ReservaLocal = {
      id_local: Date.now() + Math.random(),
      hora_inicio_reserva: inicio,
      hora_fin_reserva: fin,
      usuariofk: this.DEFAULT_USUARIO_EMAIL,
      espaciofk: this.DEFAULT_ESPACIO_ID,
      implementosfk: this.DEFAULT_IMPLEMENTO_ID,
      dia,
      hora,
      titulo: 'Reservado',
      inicio: this.hoyISO(),
      fin: '',
      usuario: 'Reservado'
    };
    this.ocupacionesLocales.push(overlay);

    // 2) Persistir en backend con el DTO que tu servicio espera
    const dto: ReservaDTO = {
      hora_inicio_reserva: inicio,
      hora_fin_reserva: fin,
      usuariofk: this.DEFAULT_USUARIO_EMAIL,
      espaciofk: this.DEFAULT_ESPACIO_ID,
      implementosfk: this.DEFAULT_IMPLEMENTO_ID
    };

    this.reservaService.create(dto).subscribe({
      next: () => {
        this.mensaje = `Reserva creada en ${dia} - ${hora}`;
        // Opcional: this.cargarReservas(); // Si tu backend luego incluye 'dia', habilítalo
      },
      error: (e: any) => {
        this.error = `No se pudo crear la reserva (${e}). Se revierte la ocupación.`;
        // Revertir overlay local
        this.ocupacionesLocales = this.ocupacionesLocales.filter(
          o => o.id_local !== overlay.id_local
        );
      }
    });
  }

  private hoyISO(): string {
    return new Date().toISOString().slice(0, 10);
  }

  // Calcular horarios completos basados en día y tramo horario
  private calcularHorarios(dia: string, hora: string): { inicio: string, fin: string } {
    const hoy = new Date();
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    const indiceDia = diasSemana.indexOf(dia.toLowerCase());
    
    // Calcular la fecha del día solicitado en la semana actual
    const fechaObjetivo = new Date(hoy);
    const diferenciasDias = indiceDia - (hoy.getDay() - 1); // Lunes = 0
    fechaObjetivo.setDate(hoy.getDate() + diferenciasDias);
    
    // Si la fecha ya pasó esta semana, usar la próxima semana
    if (fechaObjetivo < hoy) {
      fechaObjetivo.setDate(fechaObjetivo.getDate() + 7);
    }
    
    const fechaStr = fechaObjetivo.toISOString().slice(0, 10);
    
    // Parsear el rango horario (ej: "10:00 - 10:45")
    const [horaInicio, horaFin] = hora.split(' - ');
    
    const inicio = `${fechaStr} ${horaInicio}:00`;
    const fin = `${fechaStr} ${horaFin}:00`;
    
    return { inicio, fin };
  }

  // Test backend
  probarConexion(): void {
    this.reservaService.testConnection().subscribe({
      next: () => this.mensaje = 'Conexión con el backend exitosa',
      error: (errorMessage: string) => this.error = `Error de conexión: ${errorMessage}`
    });
  }
}

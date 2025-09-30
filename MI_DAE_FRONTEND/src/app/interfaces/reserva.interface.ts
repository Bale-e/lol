// Interfaz para una reserva individual (respuesta del backend)
export interface Reserva {
  id_reserva?: number;
  hora_reserva?: string | null;
  hora_inicio_reserva: string;
  hora_fin_reserva: string;
  usuariofk: string; // Ahora es email del usuario
  espaciofk?: number | null;
  implementosfk?: number | null;
  espacio?: string | null; // Nombre del espacio
  implemento?: string | null; // Nombre del implemento
  fecha_reserva?: string;
  
  // Campos adicionales para compatibilidad con el componente actual
  dia?: string;
  hora?: string;
  titulo?: string;
  inicio?: string;
  fin?: string;
  usuario?: string;
}

// DTO para crear/actualizar reservas (datos que envías al backend)
export interface ReservaDTO {
  hora_reserva?: string; // Opcional según el backend
  hora_inicio_reserva: string;
  hora_fin_reserva: string;
  usuariofk: string; // Email del usuario
  espaciofk?: number | null;
  implementosfk?: number | null;
}

// Interfaz para reservas locales temporales
export interface ReservaLocal extends Reserva {
  id_local: string | number;
}

// Interfaz para la respuesta de la API (estructura que devuelve tu backend)
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

// Tipo específico para la respuesta de reservas
export type ReservasResponse = ApiResponse<Reserva[]>;
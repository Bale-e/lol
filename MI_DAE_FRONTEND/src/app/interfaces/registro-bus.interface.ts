// Interfaz para un registro individual de uso de bus
export interface RegistroBus {
  busesfk: number;
  usuariofk: string;
  fechaHoraUso: string;
}

// Interfaz para la respuesta de la API
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  count: number;
}

// Tipo específico para la respuesta de registros de buses
export type RegistroBusesResponse = ApiResponse<RegistroBus[]>;

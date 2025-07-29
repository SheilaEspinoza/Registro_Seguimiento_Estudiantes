export type Estudiante = {
  nombre: string;
  apellido: string;
  cedula: string;
  correo: string;
  carrera: string;
  nivel: number;
  pais:string;
  ciudad: string;
  direccion: string;
  telefono: string;
  foto: File | null;

};

export interface Tarea {
  id: number;
  texto: string;
  prioridad: "alta" | "media" | "baja";
  estado: "pendiente" | "completo";
}

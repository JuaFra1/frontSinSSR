export interface Arrendatario {
    id: number;
    usuario: string;
    contrasena: string;
    nombre: string;
    status: number;
    correo: string;
    solicitudes: [];
    calificaciones: [];
    calificacionPromedio: number;
}
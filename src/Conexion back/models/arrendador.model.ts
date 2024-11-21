export interface Arrendador {
    id: number;
    usuario: string;
    contrasena: string;
    nombre: string;
    correo: string;
    status: number;
    propiedades: [];
    calificaciones: [];
    calificacionPromedio: number;
}
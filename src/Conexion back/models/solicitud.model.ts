export interface Solicitud {
    id?: number;
    fechaLlegada: Date;
    fechaPartida: Date;
    aceptacion: boolean;
    cantidadPersonas: number;
    status?: number;
    propiedadId: number;
    arrendatarioId: number;
}
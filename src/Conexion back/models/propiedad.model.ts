export interface Propiedad {
    id: number;
    nombre: string;
    ubicacion:string;
    parqueadero:boolean;
    piscina:boolean;
    cuartos:number;
    camas:number;
    area:number;
    capacidad:number;
    disponible:boolean;
    precioXnoche:number;
    status:number;
    arrendadorId:number;
    calificaciones:[];
    solicitudes:[];  
    calificacionPromedio: number;
    lavanderia: boolean,
    wifi: boolean,
    mascotas: boolean,
    gimnasios: boolean,
    zonaJuegos: boolean,
    alimentacion: boolean,
    propiedad: string,
    imagenes: [string]

}


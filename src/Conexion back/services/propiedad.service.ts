import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Propiedad } from '../../Conexion back/models/propiedad.model'; // Suponiendo que tienes un modelo definido para Propiedad
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService{
  private apiUrl = 'http://localhost:8080/api/propiedad';  // Cambia la URL al puerto y host correcto de tu backend
  private propiedades: Propiedad[] = []; // Almacena todas las propiedades obtenidas del backend
  private propiedadesFiltradasSubject = new BehaviorSubject<Propiedad[]>([]); // Usamos BehaviorSubject para emitir cambios

  private verDetalle = new BehaviorSubject<boolean>(false);
  private verEdicion = new BehaviorSubject<boolean>(false);
  private idPropiedad = new BehaviorSubject<number | null>(null);
  // Observables para que los componentes se suscriban
  verDetalle$ = this.verDetalle.asObservable();
  verEdicion$ = this.verEdicion.asObservable();
  idPropiedad$ = this.idPropiedad.asObservable();

  propiedadesFiltradas$ = this.propiedadesFiltradasSubject.asObservable(); // Observable para suscribirse desde el componente

  constructor(private http: HttpClient, private userService: UsuarioService) {  }

  private obtenerToken(): string | null {
    return this.userService.getCookie('token');
  }

  private crearHeaders(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // Métodos para cambiar el estado
  mostrarDetalles(id: number) {
    this.idPropiedad.next(id);
    this.verDetalle.next(true);
  }

  editarDetalles(propiedad: Propiedad, id: number): Observable<any> {
    const url = `${this.apiUrl}/actualizarPropiedad/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, propiedad, { headers: this.crearHeaders() });
  }
  
  editarPropiedad(id:number){
    this.idPropiedad.next(id);
    this.verEdicion.next(true);

  }

  ocultarDetalles() {
    this.verDetalle.next(false);
    this.verEdicion.next(false);
  }

  // Obtener información propiedad específica
  getPropiedadEspecifica(id: number): Observable<Propiedad> {
    const url = `${this.apiUrl}/propiedad/${id}`;
    return this.http.get<Propiedad>(url, { headers: this.crearHeaders() });
  }

  // Obtener todas las propiedades del backend
  getPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.apiUrl}/propiedades`, { headers: this.crearHeaders() });
  }

  getPropiedadesArrendador(id: number): Observable<Propiedad[]> {
    const url = `${this.apiUrl}/arrendador/${id}/propiedades`;
    return this.http.get<Propiedad[]>(url, { headers: this.crearHeaders() });
  }

  // Aplicar filtros locales
  aplicarFiltros(filtros: { capacidad?: number, disponibles?: boolean, parqueadero?: boolean, piscina?: boolean, gimnasios?: boolean, zonaJuegos?: boolean, alimentacion?: boolean, wifi?: boolean, lavanderia?: boolean, mascotas?: boolean, ubicacion?:string, nombre?:string }) {
    const propiedadesFiltradas = this.propiedades.filter(propiedad => {
      // Filtrar por capacidad
      const coincideCapacidad = filtros.capacidad ? propiedad.capacidad >= filtros.capacidad : true;

      // Filtrar por disponibilidad
      const coincideDisponibles = filtros.disponibles ? propiedad.disponible === filtros.disponibles : true;

      // Filtrar por parqueadero
      const coincideParqueadero = filtros.parqueadero ? propiedad.parqueadero === filtros.parqueadero : true;

      // Filtrar por piscina
      const coincidePiscina = filtros.piscina ? propiedad.piscina === filtros.piscina : true;

      // Filtrar por gym
      const coincideGimnasios = filtros.gimnasios ? propiedad.gimnasios === filtros.gimnasios : true;

      // Filtrar por wifi
      const coincideWifi = filtros.wifi ? propiedad.wifi === filtros.wifi : true;

      // Filtrar por comida
      const coincideAlimentacion = filtros.alimentacion ? propiedad.alimentacion === filtros.alimentacion : true;

      // Filtrar por juegos
      const coincideZonaJuegos = filtros.zonaJuegos ? propiedad.zonaJuegos === filtros.zonaJuegos : true;

      // Filtrar por mascotas
      const coincideMascotas = filtros.mascotas ? propiedad.mascotas === filtros.mascotas : true;

      // Filtrar por mascotas
      const coincideUbicacion = filtros.ubicacion ? propiedad.ubicacion === filtros.ubicacion : true;

      // Filtrar por mascotas
      const coincideNombre = filtros.nombre ? propiedad.nombre === filtros.nombre : true;

      // Retornar la propiedad si cumple con todos los filtros
      return coincideCapacidad && coincideParqueadero && coincidePiscina && coincideAlimentacion && coincideGimnasios && coincideMascotas && coincideWifi && coincideZonaJuegos && coincideUbicacion && coincideNombre;
    });

    // Emitir las propiedades filtradas
    this.propiedadesFiltradasSubject.next(propiedadesFiltradas);
  }

  crearPropiedad(propiedadData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearPropiedad`, propiedadData, { headers: this.crearHeaders() });
  }

  eliminarPropiedad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarPropiedad/${id}`);
  }
}
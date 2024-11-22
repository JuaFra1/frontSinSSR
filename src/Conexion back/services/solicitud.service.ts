import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Solicitud } from '../models/solicitud.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
    private apiUrl = 'http://localhost:8080/api/solicitud'; 
    constructor(private http: HttpClient, private userService: UsuarioService) {
    

    }
  
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

  getAllSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes`, { headers: this.crearHeaders() });
  }

  getSolicitud(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/solicitud/${id}`, { headers: this.crearHeaders() });
  }

  getSolicitudesByEstado(estado: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes/estado/${estado}`, { headers: this.crearHeaders() });
  }

  getSolicitudesByArrendatarioId(arrendatarioId: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes/arrendatario/${arrendatarioId}`, { headers: this.crearHeaders() });
  }

  getSolicitudesByPropiedadId(propiedadId: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes/propiedad/${propiedadId}`, { headers: this.crearHeaders() });
  }

  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.apiUrl}/crearSolicitud`, solicitud, { headers: this.crearHeaders() });
  }

  actualizarSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/actualizarSolicitud/${id}`, solicitud, { headers: this.crearHeaders() });
  }

  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarSolicitud/${id}`, { headers: this.crearHeaders() });
  }

  aceptarSolicitud(id: number): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/aceptarSolicitud/${id}`, { headers: this.crearHeaders() });
  }
}
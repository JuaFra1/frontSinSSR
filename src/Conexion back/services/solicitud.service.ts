import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
    private apiUrl = 'http://localhost:8080/api/solicitud'; 
    constructor(private http: HttpClient) {}

  getAllSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes`);
  }

  getSolicitud(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/solicitud/${id}`);
  }

  getSolicitudesByEstado(estado: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes/estado/${estado}`);
  }

  getSolicitudesByArrendatarioId(arrendatarioId: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes/arrendatario/${arrendatarioId}`);
  }

  getSolicitudesByPropiedadId(propiedadId: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes/propiedad/${propiedadId}`);
  }

  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.apiUrl}/crearSolicitud`, solicitud);
  }

  actualizarSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/actualizarSolicitud/${id}`, solicitud);
  }

  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarSolicitud/${id}`);
  }

  aceptarSolicitud(id: number): Observable<Solicitud> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Solicitud>(`${this.apiUrl}/aceptarSolicitud/${id}`, { headers });
  }
}
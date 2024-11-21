import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/calificacion.model';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
    private apiUrl = 'http://localhost:8080/api/calificacion'; 
    constructor(private http: HttpClient) {}

  getAllCalificaciones(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/calificaciones`);
  }

  getCalificacion(id: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(`${this.apiUrl}/calificaciones/${id}`);
  }

  getCalificacionesByArrendatarioId(arrendatarioId: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/arrendatario/${arrendatarioId}/calificaciones`);
  }

  getCalificacionesByArrendadorId(arrendadorId: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/arrendador/${arrendadorId}/calificaciones`);
  }

  getCalificacionesByPropiedadId(propiedadId: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/propiedad/${propiedadId}/calificaciones`);
  }

  crearCalificacion(calificacion: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(`${this.apiUrl}/crearCalificacion`, calificacion);
  }

  actualizarcalificacion(id: number, calificacion: Calificacion): Observable<Calificacion> {
    return this.http.put<Calificacion>(`${this.apiUrl}/actualizarCalificacion/${id}`, calificacion);
  }

  eliminarcalificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarCalificacion/${id}`);
  }

}
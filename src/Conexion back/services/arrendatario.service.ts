import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arrendatario } from '../models/arrendatario.model';

@Injectable({
  providedIn: 'root'
})
export class ArrendatarioService {
  private apiUrl = 'http://localhost:8080/api/arrendatario';

  constructor(private http: HttpClient) {}

  obtenerArrendatario(id: number): Observable<any> {
    return this.http.get<Arrendatario>(`${this.apiUrl}/arrendatario/${id}`);
  }

  getArrendatario = (id: number): Observable<Arrendatario> => {
    return this.http.get<Arrendatario>(`${this.apiUrl}/arrendatario/${id}`);
  }

  crearArrendatario(arrendatarioData: Arrendatario): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearArrendatario`, arrendatarioData);
  }

  modificarUsuarioArrendatario(arrendatario: Arrendatario, id: number): Observable<any> {
    const url = `${this.apiUrl}/actualizarArrendatario/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, arrendatario, { headers });
  }

  eliminarArrendatario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarArrendatario/${id}`);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Arrendador } from '../models/arrendador.model';
import { Arrendatario } from '../models/arrendatario.model';
import { ArrendadorService } from './arrendador.service';
import { ArrendatarioService } from './arrendatario.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private arrendadorService: ArrendadorService,
    private arrendatarioService: ArrendatarioService,
    private http: HttpClient
  ) { }

  // Simulación de inicio de sesión sin autenticación
  accesoUsuarioDemo(id: number, esArrendador: boolean) {
    if (esArrendador) {
      this.arrendadorService.obtenerArrendador(id).subscribe(arrendador => {
        const usuarioData = {
          id: arrendador.id,
          nombre: arrendador.nombre,
          tipoUsuario: 'arrendador'
        };
        sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
      });
    } else {
      this.arrendatarioService.obtenerArrendatario(id).subscribe(arrendatario => {
        const usuarioData = {
          id: arrendatario.id,
          nombre: arrendatario.nombre,
          tipoUsuario: 'arrendatario'
        };
        sessionStorage.setItem('usuario', JSON.stringify(usuarioData));

      });
    }
  }

  // Método para actualizar solo el nombre del usuario
actualizarNombreUsuario() {
  const usuario = sessionStorage.getItem('usuario');
  
  if (!usuario) {
    console.error('No hay usuario almacenado en sessionStorage.');
    return;
  }

  const usuarioData = JSON.parse(usuario);
  const { id, tipoUsuario } = usuarioData;

  if (tipoUsuario === 'arrendador') {
    this.arrendadorService.obtenerArrendador(id).subscribe(arrendador => {
      usuarioData.nombre = arrendador.nombre;
      sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
    });
  } else if (tipoUsuario === 'arrendatario') {
    this.arrendatarioService.obtenerArrendatario(id).subscribe(arrendatario => {
      usuarioData.nombre = arrendatario.nombre;
      sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
    });
  } else {
    console.error('Tipo de usuario no válido.');
  }
}

  // Método de logout para limpiar el sessionStorage
  logout() {
    sessionStorage.removeItem('usuario');
  }

  // Recupera los datos de usuario desde sessionStorage
  getUsuarioData(): Observable<Arrendador | Arrendatario | null> {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined') {
      const token = this.getCookie('token');
      const tipo = this.getCookie('type');

      if (token) {
        // Si el token está presente, realizar la solicitud HTTP según el tipo de usuario
        if (tipo === 'arrendador') {
          return this.http.get<Arrendador>(`${this.apiUrl}/arrendador/arrendador/arrendador-actual`, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
          });
        } else if (tipo === 'arrendatario') {
          return this.http.get<Arrendatario>(this.apiUrl + '/arrendatario/arrendatario/arrendatario-actual', {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
          });
        }
      }
    }

    // Si no hay token o tipo, devolver null
    return of(null);
}


  login(username: string, password: string, type: number, callback: () => void) {
    const body = { username, password, type };
    const tipo = type === 1 ? 'arrendador' : 'arrendatario';
    const headers = {
      'Content-Type': 'application/json',
    };
  
    this.http.post<{ token: string }>(this.apiUrl + '/auth/login', body, { headers })
      .subscribe(
        (response) => {
          this.setCookie('token', response.token, 1); // Guarda el token en cookies
          this.setCookie('type', tipo, 1); // Guarda el tipo en cookies
          console.log('Login exitoso:', response);
          callback(); // Llama al callback después de establecer las cookies
        },
        (error) => {
          console.error('Error en el login:', error);
        }
      );
  }

  
  // Método para guardar datos en cookies
  setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Método para obtener datos de cookies
  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Método para obtener el token de las cookies
  getToken(): string | null {
    return this.getCookie('token');
  }

  // Método para obtener el tipo de usuario de las cookies
  getType(): string | null {
    return this.getCookie('type');
  }

}






  /* Ejemplo de método accesoUsuario con autenticación basada en tokens (comentado)
  accesoUsuario(credentials: { username: string, password: string }) {
    return this.http.post<{ token: string }>('/api/authenticate', credentials)
      .pipe(
        tap(response => {
          sessionStorage.setItem('token', response.token);
          // Aquí se puede agregar lógica para almacenar más datos según el token recibido
        })
      );
  }
  */


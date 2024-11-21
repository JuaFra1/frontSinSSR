import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArrendadorService } from '../../Conexion back/services/arrendador.service';
import { ArrendatarioService } from '../../Conexion back/services/arrendatario.service';

import { UsuarioService } from '../../Conexion back/services/usuario.service';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  id: number = 0;
  nombre: string = '';
  usuario: string = '';
  contrasena: string = '';
  correo: string = '';
  tipoUsuario: string = 'arrendatario'; // Predeterminado

  constructor(
    private arrendadorService: ArrendadorService,
    private arrendatarioService: ArrendatarioService,

    private usuarioService: UsuarioService,
    private router: Router
  ) { }


  onSubmit() {
    const usuarioData = {
      nombre: this.nombre,
      usuario: this.usuario,
      contrasena: this.contrasena,
      correo: this.correo,
      status: 0 // Status inicial predeterminado
    };

    if (this.tipoUsuario === 'arrendador') {
      this.arrendadorService.crearArrendador(usuarioData).subscribe(
        () => alert('Arrendador registrado exitosamente'),
        (error) => console.error(error)
      );

      this.usuarioService.accesoUsuarioDemo(1, true);
      const routePath = '/arrendador';
      this.router.navigate([routePath]);
    } else {
      this.arrendatarioService.crearArrendatario({
        id: this.id,
        nombre: this.nombre,
        usuario: this.usuario,
        contrasena: this.contrasena,
        status: 0, // Status inicial predeterminado
        correo: this.correo,
        solicitudes: [],
        calificaciones: [],
        calificacionPromedio: 0
      }).subscribe(
        () => alert('Arrendatario registrado exitosamente'),
        (error) => console.error(error)
      );

      this.usuarioService.accesoUsuarioDemo(1, false);
      const routePath = '/arrendatario';
      this.router.navigate([routePath]);

      console.log("Se ejecutó la condición para crear arrendatario")
    }

  }
}

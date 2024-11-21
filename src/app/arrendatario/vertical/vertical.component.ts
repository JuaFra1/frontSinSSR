import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../Conexion back/services/usuario.service';

@Component({
  selector: 'app-vertical-arrendatario',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './vertical.component.html',
  styleUrl: './vertical.component.css'
})
export class VerticalComponentArrendatario {
  nombreUsuario?:string;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.nombreUsuario = "antonio";
  }
  cerrarSesion(){
    this.usuarioService.logout();
  }
}
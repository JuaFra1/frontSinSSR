import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { VerticalComponentArrendador } from "../vertical/vertical.component";
import { PropiedadesArrendadorComponent } from "../propiedades-arrendador/propiedades-arrendador.component";
import { DetallesPropiedadComponentArrendador } from "../detalles-propiedad/detalles-propiedad.component";

@Component({
  selector: 'app-inicio-arrendador',
  standalone: true,
  imports: [CommonModule, VerticalComponentArrendador, PropiedadesArrendadorComponent, DetallesPropiedadComponentArrendador],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponentArrendador implements OnInit {
  verCuenta: boolean = false;
  propiedades: Propiedad[] = [];
  propiedadesFiltradas: Propiedad[] = [];
  verDetalle: boolean = false;
  idArrendador: number = 0;

  constructor(
    private propiedadService: PropiedadService
  ) {}

  ngOnInit(): void {
    this.getUsuarioDatos();
    if (this.idArrendador) {
      this.propiedadService.getPropiedadesArrendador(this.idArrendador).subscribe((data: Propiedad[]) => {
        this.propiedades = data;
      });
    }
  }

  getUsuarioDatos(): void {
    // Verificar si sessionStorage está disponible
    if (typeof sessionStorage !== 'undefined') {
      const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData) {
        const usuario = JSON.parse(usuarioData);
        if (usuario.tipoUsuario === 'arrendador') {
          this.idArrendador = usuario.id;
        }
      }
    }
  }

  mostrarCuenta() {
    this.verCuenta = !this.verCuenta;
  }
}
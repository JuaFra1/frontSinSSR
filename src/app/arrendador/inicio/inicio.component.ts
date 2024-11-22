import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { VerticalComponentArrendador } from "../vertical/vertical.component";
import { PropiedadesArrendadorComponent } from "../propiedades-arrendador/propiedades-arrendador.component";
import { DetallesPropiedadComponentArrendador } from "../detalles-propiedad/detalles-propiedad.component";
import { UsuarioService } from '../../../Conexion back/services/usuario.service';

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
    private propiedadService: PropiedadService, private userService: UsuarioService
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
    this.userService.getUsuarioData().subscribe(usuario => {
      if (!usuario) {  // Aquí verificamos si usuario es undefined o null
        console.error('No hay usuario almacenado en sessionStorage.');
        return;
      } else {
        this.idArrendador = usuario.id;
      }
    });
  }

  mostrarCuenta() {
    this.verCuenta = !this.verCuenta;
  }
}
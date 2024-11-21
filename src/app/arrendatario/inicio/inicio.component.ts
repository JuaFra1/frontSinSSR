import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { DetallesPropiedadComponentArrendatario } from '../detalles-propiedad/detalles-propiedad.component';
import { ListaPropiedadesComponentArrendatario } from "../lista-propiedades/lista-propiedades.component";
import { VerticalComponentArrendatario } from "../vertical/vertical.component";

@Component({
  selector: 'app-inicio-arrendatario',
  standalone: true,
  imports: [VerticalComponentArrendatario, CommonModule, ListaPropiedadesComponentArrendatario, DetallesPropiedadComponentArrendatario],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponentArrendatario {
  verCuenta: boolean = false;
  propiedades: Propiedad[] = [];
  propiedadesFiltradas: Propiedad[] = [];
  
  verDetalle: boolean = false;

  constructor(private propiedadDetalleService: PropiedadService) {}

  ngOnInit() {
    this.propiedadDetalleService.verDetalle$.subscribe((ver) => {
      this.verDetalle = ver;
    });
  }

  mostrarCuenta() {
    this.verCuenta = !this.verCuenta;
  }

}

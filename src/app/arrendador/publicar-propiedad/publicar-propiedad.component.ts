import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';

@Component({
  selector: 'app-publicar-propiedad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicar-propiedad.component.html',
  styleUrl: './publicar-propiedad.component.css'
})
export class PublicarPropiedadComponent {
  id: number = 0;
  nombre: string = '';
  ubicacion: string = '';
  parqueadero: boolean = false;
  piscina: boolean = false;
  cuartos: number = 0;
  camas: number = 0;
  area: number = 0;
  capacidad: number = 0;
  disponible: boolean = false;
  precioXnoche: number = 0;
  arrendadorId: number = 1;
  lavanderia: boolean = false;
  wifi: boolean = false;
  mascotas: boolean = false;
  gimnasios: boolean = false;
  zonaJuegos: boolean = false;
  alimentacion: boolean = false;
  propiedad: String = '';

  constructor(
    private router: Router,
    private propiedadService: PropiedadService
  ) { }

  onSubmit() {
    const propiedadData = {
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      parqueadero: this.parqueadero,
      piscina: this.piscina,
      cuartos: this.cuartos,
      camas: this.camas,
      area: this.area,
      capacidad: this.capacidad,
      disponible: this.disponible,
      precioXnoche: this.precioXnoche,
      arrendadorId: this.arrendadorId,
      lavanderia: this.lavanderia,
      wifi: this.wifi,
      mascotas: this.mascotas,
      gimnasios: this.gimnasios,
      zonaJuegos: this.zonaJuegos,
      alimentacion: this.alimentacion,
      propiedad: this.propiedad,
      calificaciones: [],
      solicitudes: [],
      imagenes: [],
      status: 0 // Status inicial predeterminado
    };

    this.propiedadService.crearPropiedad(propiedadData).subscribe(
      () => alert('Propiedad publicada exitosamente'),
      (error) => console.error(error)
    );

    const routePath = '/arrendador';
    this.router.navigate([routePath]);
  }
}

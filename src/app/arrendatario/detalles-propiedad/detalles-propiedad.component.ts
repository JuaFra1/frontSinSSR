import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Arrendador } from '../../../Conexion back/models/arrendador.model';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { CalificacionService } from '../../../Conexion back/services/calificacion.service';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { AlquilerComponent } from '../alquiler/alquiler.component';

@Component({
  selector: 'app-detalles-propiedad-arrendatario',
  standalone: true,
  imports: [CommonModule, AlquilerComponent],
  templateUrl: './detalles-propiedad.component.html',
  styleUrl: './detalles-propiedad.component.css'
})

export class DetallesPropiedadComponentArrendatario implements OnInit {
  isExpanded: boolean = false; // Inicialmente contraído
  propiedad: any = {
    calificacionPromedio: 0,
    nombre: 'Casa de Playa',
    ubicacion: 'Cancún, México',
    precioXnoche: 150,
    area: 120,
    capacidad: 6,
    camas: 3,
    cuartos: 8,
    parqueadero: true,
    piscina: true,
    disponible: true,
    arrendadorNombre: 'Juan Pérez',
    descripcion: 'Una hermosa casa de playa ideal para unas vacaciones relajantes con amigos o familia.',
    imagenes: [
      'https://via.placeholder.com/400x300?text=Casa+1',
      'https://via.placeholder.com/400x300?text=Casa+2',
      'https://via.placeholder.com/400x300?text=Casa+3',
      'https://via.placeholder.com/400x300?text=Casa+4',
      'https://via.placeholder.com/400x300?text=Casa+5',
      'https://via.placeholder.com/400x300?text=Casa+6',
      'https://via.placeholder.com/400x300?text=Casa+7',
    ],
    calificaciones: [
    ]
  };
  
  propiedadPedida?: Propiedad;
  idP: number = 0;
  imagenActual: number = 0;
  arrendadorNombre: string = '';

  //MOSTRAR ALQUILER Y PAGO
  mostrarFormularioAlquiler: boolean = false;

  cerrarFormularioAlquiler() {
    this.mostrarFormularioAlquiler = false;
  }

  constructor(
    private propiedadService: PropiedadService,
    private arrendadorService: ArrendadorService,
    private calificacionService: CalificacionService
  ) {
    this.propiedadService.idPropiedad$.subscribe(id => {
      this.idP = id !== null ? id : 0; 
    });
  }

  ngOnInit() {
    this.propiedadService.idPropiedad$.subscribe((id) => {
      if (id) {
        this.propiedadService.getPropiedadEspecifica(id).subscribe((data) => {
          this.propiedadPedida = data;
          if (this.propiedadPedida && this.propiedadPedida.arrendadorId) {
            this.arrendadorService.obtenerArrendador(this.propiedadPedida.arrendadorId).subscribe((arrendador: Arrendador) => {
              this.arrendadorNombre = arrendador.nombre;
              this.propiedad.arrendadorNombre = this.arrendadorNombre; 
            });
            this.calificacionService.getCalificacionesByPropiedadId(this.propiedadPedida.id).subscribe((calificaciones) => {
              this.propiedad.calificaciones = calificaciones;
              this.propiedad.calificacionPromedio = calificaciones.reduce((acc, calificacion) => acc + calificacion.calificacion, 0) / calificaciones.length;
            });
          }
        });
      }
    });
  }

  abrirFormularioAlquiler() {
    this.mostrarFormularioAlquiler = true;
  }

  anteriorImagen() {
    this.imagenActual = (this.imagenActual > 0) ? this.imagenActual - 1 : this.propiedad.imagenes.length - 1;
  }

  siguienteImagen() {
    this.imagenActual = (this.imagenActual < this.propiedad.imagenes.length - 1) ? this.imagenActual + 1 : 0;
  }

  volver() {
    this.propiedadService.ocultarDetalles()
  }
}
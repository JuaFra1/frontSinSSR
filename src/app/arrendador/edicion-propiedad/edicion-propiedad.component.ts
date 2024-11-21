import { Component, Input } from '@angular/core';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { Router } from '@angular/router';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edicion-propiedad',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edicion-propiedad.component.html',
  styleUrl: './edicion-propiedad.component.css'
})
export class EdicionPropiedadComponent {
  idP: number = 0;
  propiedadPedida?: Propiedad;

  nombre: string = "";
  calificacionPromedio :number = 0;
  calificaciones: [] = [];
  ubicacion:string = "";
  parqueadero:boolean = false;
  piscina:boolean = false;
  cuartos:number = 0;
  camas:number = 0;
  area:number = 0;
  capacidad:number = 0;
  disponible:boolean = false;
  precioXnoche:number = 0;
  //status:number;
  arrendadorId:number = 0;
  lavanderia:boolean = false;
  wifi:boolean = false;
  mascotas:boolean = false;
  gimnasios:boolean = false;
  zonaJuegos:boolean = false;
  alimentacion:boolean = false;
  propiedad: string = "";
  imagenes: [string] = [""];

  constructor(
    private propiedadService: PropiedadService,
    private router: Router,
    private arrendadorService: ArrendadorService,

  ){
    this.propiedadService.idPropiedad$.subscribe(id => {
      this.idP = id !== null ? id : 0; 
    });
  }

  ngOnInit() {
    this.propiedadService.idPropiedad$.subscribe((id) => {
      if (id) {
        this.propiedadService.getPropiedadEspecifica(id).subscribe((data) => {
          this.propiedadPedida = data;
          this.nombre = data.nombre;
          this.ubicacion= data.ubicacion;
          this.parqueadero= data.parqueadero;
          this.piscina= data.piscina;
          this.cuartos= data.cuartos;
          this.camas= data.camas;
          this.area= data.area;
          this.capacidad= data.capacidad;
          this.disponible= data.disponible;
          this.precioXnoche= data.precioXnoche;
          //status:number;
          //this.arrendadorId= data.arrendadorId;
          this.lavanderia= data.lavanderia;
          this.wifi= data.wifi;
          this.mascotas= data.mascotas;
          this.gimnasios= data.gimnasios;
          this.zonaJuegos= data.zonaJuegos;
          this.alimentacion= data.alimentacion;
          this.propiedad= data.propiedad;
          this.imagenes= data.imagenes;
          this.calificacionPromedio = data.calificacionPromedio;
          this.calificaciones = data.calificaciones;
          this.arrendadorId= data.arrendadorId
        });
      }
    });
  }

  modificarPropiedad(){
    // Llamada al servicio para actualizar el arrendador
    const propiedad1 : Propiedad = {
      id: this.idP,
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      parqueadero: this.parqueadero,
      piscina: this.piscina,
      cuartos: this.cuartos,
      camas: this.camas,
      area: this.area,
      capacidad: this.capacidad,
      disponible: true,
      precioXnoche: this.precioXnoche,
      status: 0, 
      arrendadorId: this.arrendadorId,
      calificaciones:[],
      solicitudes:[],
      calificacionPromedio: this.calificacionPromedio,
      lavanderia: this.lavanderia,
      wifi: this.wifi,
      mascotas: this.mascotas,
      gimnasios: this.gimnasios,
      zonaJuegos: this.zonaJuegos,
      alimentacion: this.alimentacion,
      propiedad: this.propiedad,
      imagenes: this.imagenes,
    };
    this.propiedadService.editarDetalles(propiedad1, this.idP)
      .subscribe({
        next: (response) => {
          alert("Propiedad actualizada exitosamente");
        },
        error: (err) => {
          console.error('Error al actualizar propiedad:', err);
          alert("Hubo un error al guardar los cambios de la propiedad");
        }
      });
      this.router.navigate(['/arrendador']);
  }
  

  eliminarPropiedad() {
    this.propiedadService.eliminarPropiedad(this.idP).subscribe(
      (response: string) => {
        alert('Propiedad eliminada exitosamente');
      },
      error => {
        alert('Propiedad eliminada exitosamente');
      }
    );
    this.volver()
  }

  volver() {
    this.propiedadService.ocultarDetalles()
    this.router.navigate(['/arrendador']);
  }
}

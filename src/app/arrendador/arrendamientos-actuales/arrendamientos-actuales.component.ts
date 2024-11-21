import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { VerticalComponentArrendador } from '../vertical/vertical.component';

@Component({
  selector: 'app-arrendamientos-actuales',
  standalone: true,
  imports: [CommonModule, RouterLink, VerticalComponentArrendador],
  templateUrl: './arrendamientos-actuales.component.html',
  styleUrl: './arrendamientos-actuales.component.css'
})
export class ArrendamientosActualesComponent {
  propiedades: Propiedad[] = [];
  propiedadesArr: Propiedad[] = [];
  fechaLlegada: Date = new(Date);
  fechaPartida: Date = new(Date);
  nombreArrendador: string = "Pepito Perez";
  nombrePropiedad: string = "Apto fantastico";
  solicitudes: Solicitud[] = [];
  propiedad?: Propiedad
  solicitudId: number = 0;

  constructor(private propiedadService: PropiedadService,
    private solicitudService: SolicitudService,
    private arrendadorService: ArrendadorService
  ) { }

  ngOnInit(): void {
    this.propiedadService.getPropiedadesArrendador(1).subscribe((data: Propiedad[]) => {
      this.propiedadesArr = data;
      this.propiedadesArr.forEach(propiedadR => {
        this.solicitudService.getSolicitudesByPropiedadId(propiedadR.id).subscribe((data: Solicitud[]) => {
          this.solicitudes = data;
          this.solicitudes.forEach(solicitud => {
            if (!solicitud.aceptacion) {
              this.fechaLlegada = solicitud.fechaLlegada;
              this.fechaPartida = solicitud.fechaPartida;
              if (solicitud.id !== undefined) {
                this.solicitudId = solicitud.id;
              }
              this.propiedadService.getPropiedadEspecifica(solicitud.propiedadId).subscribe((propiedad: Propiedad) => {
                this.propiedades.push(propiedad);
                this.propiedad = propiedad;
                this.arrendadorService.obtenerArrendador(propiedad.arrendadorId).subscribe((arrendador: any) => {
                  this.nombreArrendador = arrendador.nombre;
                });
              });
            }
          });
        });
      });
      
    });
    
  }

  eliminarSolicitud(id: number) {
    this.solicitudService.eliminarSolicitud(id).subscribe(
      () => {
        alert('Propiedad eliminada exitosamente');
      },
      error => {
        alert('Solicitud eliminada exitosamente');
      }
    );
  }

}

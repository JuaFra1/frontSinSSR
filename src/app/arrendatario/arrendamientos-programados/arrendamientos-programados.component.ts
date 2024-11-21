import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';

@Component({
  selector: 'app-arrendamientos-programados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arrendamientos-programados.component.html',
  styleUrls: ['./arrendamientos-programados.component.css']
})
export class ArrendamientosProgramadosComponent implements OnInit {
  propiedades: { [key: number]: Propiedad } = {};
  solicitudes: Solicitud[] = [];
  nombreArrendadores: { [key: number]: string } = {};
  idArrendatario: number = 0;

  constructor(
    private propiedadService: PropiedadService,
    private solicitudService: SolicitudService,
    private arrendadorService: ArrendadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsuarioDatos();
    this.cargarSolicitudes();
  }

  private cargarSolicitudes(): void {
    this.solicitudService.getSolicitudesByArrendatarioId(this.idArrendatario).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.filter(solicitud => solicitud.aceptacion);

      this.solicitudes.forEach(solicitud => {
        this.propiedadService.getPropiedadEspecifica(solicitud.propiedadId).subscribe((propiedad: Propiedad) => {
          this.propiedades[solicitud.propiedadId] = propiedad;

          this.arrendadorService.obtenerArrendador(propiedad.arrendadorId).subscribe((arrendador: any) => {
            this.nombreArrendadores[propiedad.arrendadorId] = arrendador.nombre;
          });
        });
      });
    });
  }

  getUsuarioDatos(): void {
    if (typeof sessionStorage !== 'undefined') {
      const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData) {
        const usuario = JSON.parse(usuarioData);
        if (usuario.tipoUsuario === 'arrendatario') {
          this.idArrendatario = usuario.id;
        }
      }
    }
  }

  eliminarSolicitud(id: number): void {
    this.solicitudService.eliminarSolicitud(id).subscribe(
      () => {
        alert('Solicitud eliminada exitosamente');
        this.solicitudes = this.solicitudes.filter(solicitud => solicitud.id !== id);
        delete this.propiedades[id];
      },
      error => {
        alert('Error al eliminar la solicitud');
      }
    );
  }

  volver(): void {
    this.router.navigate(['/arrendatario']);
  }
}
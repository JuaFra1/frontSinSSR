import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';

@Component({
  selector: 'app-historial-arrendatario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-arrendatario.component.html',
  styleUrl: './historial-arrendatario.component.css'
})
export class HistorialArrendatarioComponent implements OnInit {
  historialSolicitudes: Solicitud[] = [];
  propiedades: { [key: number]: Propiedad } = {};
  nombreArrendadores: { [key: number]: string } = {};
  fechaActual: Date = new Date();
  idArrendatario: number = 0;

  constructor(
    private solicitudService: SolicitudService,
    private propiedadService: PropiedadService,
    private arrendadorService: ArrendadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsuarioDatos();
    this.cargarHistorialArrendatario();
  }

  private cargarHistorialArrendatario(): void {
    this.solicitudService.getSolicitudesByArrendatarioId(this.idArrendatario).subscribe((solicitudes: Solicitud[]) => {
      this.historialSolicitudes = solicitudes.filter(solicitud => new Date(solicitud.fechaPartida) < this.fechaActual);

      this.historialSolicitudes.forEach(solicitud => {
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

  calificarArrendador(id: number, tipo: number): void {
    this.router.navigate(['/calificar', id, tipo]);  }

  calificarPropiedad(id: number, tipo: number): void {
    this.router.navigate(['/calificar', id, tipo]);  }

  volver() {
    this.router.navigate(['/arrendatario']);
  }
}
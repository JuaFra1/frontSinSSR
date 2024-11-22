import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { ArrendatarioService } from '../../../Conexion back/services/arrendatario.service';
import { UsuarioService } from '../../../Conexion back/services/usuario.service';

@Component({
  selector: 'app-historial-arrendador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-arrendador.component.html',
  styleUrl: './historial-arrendador.component.css'
})
export class HistorialArrendadorComponent implements OnInit {
  propiedades: Propiedad[] = [];
  solicitudesAceptadas: { [key: number]: Solicitud[] } = {};
  nombreArrendatarios: { [key: number]: string } = {};
  idArrendador: number = 0;

  constructor(
    private solicitudService: SolicitudService,
    private propiedadService: PropiedadService,
    private arrendatarioService: ArrendatarioService,
    private router: Router,
    private userService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getUsuarioDatos();
    this.cargarPropiedades();
  }

  private cargarPropiedades(): void {
    this.propiedadService.getPropiedadesArrendador(this.idArrendador).subscribe((propiedades: Propiedad[]) => {
      this.propiedades = propiedades;

      this.propiedades.forEach(propiedad => {
        if (propiedad.id !== undefined) {
          this.solicitudService.getSolicitudesByPropiedadId(propiedad.id).subscribe((solicitudes: Solicitud[]) => {
            this.solicitudesAceptadas[propiedad.id] = solicitudes.filter(solicitud => solicitud.aceptacion);

            this.solicitudesAceptadas[propiedad.id].forEach(solicitud => {
              if (solicitud.id !== undefined && solicitud.arrendatarioId !== undefined) {
                this.arrendatarioService.getArrendatario(solicitud.arrendatarioId).subscribe(arrendatario => {
                  if (arrendatario && solicitud.id !== undefined) {
                    this.nombreArrendatarios[solicitud.id] = arrendatario.nombre;
                  }
                });
              }
            });
          });
        }
      });
    });
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

  calificar(id: number, tipo: number): void {
    this.router.navigate(['/calificar', id, tipo]);
  }

  volver() {
    this.router.navigate(['/arrendador']);
  }
}
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { ArrendatarioService } from '../../../Conexion back/services/arrendatario.service';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { SolicitudCardComponent } from "../solicitud-card/solicitud-card.component";


@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [CommonModule, SolicitudCardComponent],
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {
  @Input() idPropiedad: number = 0;
  solicitudes: Solicitud[] = [];
  nombrePropiedades: { [key: number]: string } = {};
  nombreArrendatarios: { [key: number]: string } = {};
  calificacionesPromedio: { [key: number]: number } = {};

  constructor(
    private propiedadService: PropiedadService,
    private solicitudService: SolicitudService,
    private arrendatarioService: ArrendatarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes(this.idPropiedad);
  }

  cargarSolicitudes(idPropiedad: number): void {
    this.solicitudService.getSolicitudesByPropiedadId(idPropiedad).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
      this.solicitudes.forEach(solicitud => {
        if (solicitud && solicitud.id !== undefined) {
          this.propiedadService.getPropiedadEspecifica(solicitud.propiedadId).subscribe(propiedad => {
            this.nombrePropiedades[solicitud.id!] = propiedad.nombre;
          });
          this.arrendatarioService.getArrendatario(solicitud.arrendatarioId).subscribe(arrendatario => {
            this.nombreArrendatarios[solicitud.id!] = arrendatario.nombre;
            this.calificacionesPromedio[solicitud.id!] = arrendatario.calificacionPromedio;
          });
        }
      });
    });
  }

  volver(){
    this.router.navigate(['/arrendador']);
  }
}
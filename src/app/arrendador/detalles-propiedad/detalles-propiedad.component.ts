import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { VerticalComponentArrendador } from "../vertical/vertical.component";
import { ListaSolicitudesComponent } from "../lista-solicitudes/lista-solicitudes.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-propiedad-arrendador',
  standalone: true,
  imports: [ListaSolicitudesComponent, VerticalComponentArrendador, CommonModule],
  templateUrl: './detalles-propiedad.component.html',
  styleUrls: ['./detalles-propiedad.component.css']
})
export class DetallesPropiedadComponentArrendador implements OnInit {
  propiedadPedida?: Propiedad;
  verDetalle: boolean = false;
  solicitudes: Solicitud[] = [];
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // El signo + convierte el parámetro a número
      this.cargarDetallesPropiedad(this.id);
    });
  }

  cargarDetallesPropiedad(id: number): void {
    this.propiedadService.getPropiedadEspecifica(id).subscribe((propiedad: Propiedad) => {
      this.propiedadPedida = propiedad;
      this.cargarSolicitudes(propiedad.id);
    });
  }

  cargarSolicitudes(propiedadId: number): void {
    this.solicitudService.getSolicitudesByPropiedadId(propiedadId).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
    });
  }
}
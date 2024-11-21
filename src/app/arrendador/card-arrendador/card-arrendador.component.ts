import { Component, Input } from '@angular/core';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-arrendador',
  standalone: true,
  imports: [],
  templateUrl: './card-arrendador.component.html',
  styleUrls: ['./card-arrendador.component.css']
})
export class CardArrendadorComponent {
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() imagenUrl: string = '';
  @Input() id: number = 0;

  constructor(private propiedadDetalleService: PropiedadService, private router: Router) {}

  verSolicitudes() {
    this.propiedadDetalleService.mostrarDetalles(this.id);
    this.router.navigate(['/arrendador/detalles-propiedad', this.id]);
    console.log("Se pulsó el botón detalles en el card" + this.id);
  }

  ajustarPropiedad(){
    this.propiedadDetalleService.editarPropiedad(this.id);
    this.router.navigate(['/arrendador/edicionPropiedad', this.id]);
    console.log("Se pulsó el botón ajustar propiedad en el card" + this.id);
  }
  
}
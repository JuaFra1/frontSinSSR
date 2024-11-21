import { Component, Input } from '@angular/core';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';

@Component({
  selector: 'app-card-propiedad-arrendatario',
  standalone: true,
  templateUrl: './card-propiedad.component.html',
  styleUrls: ['./card-propiedad.component.css']
})
export class CardPropiedadComponentArrendatario {
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() precio: number = 0;
  @Input() imagenUrl: string = '';

  @Input() id: number =0;

  constructor(private propiedadDetalleService: PropiedadService) {}

  mostrarDetalles() {
    this.propiedadDetalleService.mostrarDetalles(this.id);
    console.log("Se pulsó el botón detalles en el card" + this.id)
  }
}
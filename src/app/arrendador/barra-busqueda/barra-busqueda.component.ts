import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';

@Component({
  selector: 'app-barra-busqueda-arrendador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css'
})
export class BarraBusquedaComponent {
  ubicacion:string = "";
  nombre:string = "";

  constructor(
    private propiedadService: PropiedadService
  ){  }

  onSubmit(event: Event, form: NgForm) {
    this.ubicacion = form.value.lugar;
    this.nombre = form.value.palabraClave;
    this.filtrar()
    console.log("Se hizo submit desde el boton")
  }

  filtrar() {
    this.propiedadService.aplicarFiltros({
      ubicacion: this.ubicacion
    });
    this.propiedadService.ocultarDetalles()
  }


}

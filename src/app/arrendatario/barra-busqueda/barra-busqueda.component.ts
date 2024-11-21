import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';

@Component({
  selector: 'app-barra-busqueda-arrendatario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barra-busqueda-arrendatario.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponentArrendatario {

  //APLICAR FILTROS DE BÚSQUEDA
  capacidad: number = 0;
  mostrarDisponibles: boolean = true;
  parqueadero: boolean = false;
  piscina: boolean = false;
  gimnasio: boolean = false;
  wifi: boolean = false;
  zonaJuegos: boolean = false;
  lavanderia: boolean = false;
  alimentacion: boolean = false;
  ubicacion:string = "";
  nombre:string = "";

  // Emitir evento con todos los filtros
 // @Output() filtroAplicado = new EventEmitter<{ capacidad?: number, disponibles?: boolean, parqueadero?: boolean, piscina?: boolean }>();

  constructor(
    private propiedadService: PropiedadService // Usamos propiedadService para los filtros
  ) { }

  aplicarFiltros() {
    this.capacidad = this.adultos + this.ninos + this.bebes + this.mascotas;
    this.propiedadService.aplicarFiltros({
      capacidad: this.capacidad,
      disponibles: this.mostrarDisponibles,
      parqueadero: this.parqueadero,
      piscina: this.piscina,
      gimnasios: this.gimnasio,
      wifi: this.wifi,
      zonaJuegos: this.zonaJuegos,
      lavanderia: this.lavanderia,
      alimentacion: this.alimentacion,
      mascotas: (this.mascotas > 0),
      ubicacion: this.ubicacion,
      nombre: this.nombre
    });
    this.propiedadService.ocultarDetalles()
  }

  // Variable para controlar si el dropdown está abierto o cerrado
  isDropdownOpen: boolean = false;

  // Cantidades de personas
  adultos: number = 1; // Comenzamos con 1 adulto
  ninos: number = 0;   // Comenzamos con 0 niños
  bebes: number = 0;   // Comenzamos con 0 bebés
  mascotas: number = 0; // Comenzamos con 0 mascotas

  // Método para alternar el dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Método para cerrar el dropdown cuando se haga clic fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.dropdown-toggle') && !targetElement.closest('.dropdown-menu')) {
      this.isDropdownOpen = false;
    }
  }

  // Métodos para aumentar/disminuir adultos, niños, bebés, mascotas
  aumentarAdultos() {
    this.adultos++;
  }

  disminuirAdultos() {
    if (this.adultos > 0) {
      this.adultos--;
    }
  }

  aumentarNinos() {
    this.ninos++;
    
  }

  disminuirNinos() {
    if (this.ninos > 0) {
      this.ninos--;
    }
  }

  aumentarBebes() {
    this.bebes++;
  }

  disminuirBebes() {
    if (this.bebes > 0) {
      this.bebes--;
    }
  }

  aumentarMascotas() {
    this.mascotas++;
  }

  disminuirMascotas() {
    if (this.mascotas > 0) {
      this.mascotas--;
    }
  }
}

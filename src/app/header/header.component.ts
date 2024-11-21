import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PropiedadService } from '../../Conexion back/services/propiedad.service'; // Usamos PropiedadService
import { BarraBusquedaComponent } from '../arrendador/barra-busqueda/barra-busqueda.component';
import { VerticalComponentArrendador } from "../arrendador/vertical/vertical.component";
import { BarraBusquedaComponentArrendatario } from '../arrendatario/barra-busqueda/barra-busqueda.component';
import { VerticalComponentArrendatario } from "../arrendatario/vertical/vertical.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BarraBusquedaComponentArrendatario, VerticalComponentArrendatario, BarraBusquedaComponent, VerticalComponentArrendador],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  verBarraBusqueda: boolean = true;
  verBusquedaArrendatario: boolean = false;
  verBusquedaArrendador: boolean = false;
  rolArrendatario: boolean = true;
  verInicio: boolean = true;
  verCuenta: boolean = false;
  isDropdownOpen: boolean = false;
  isLoggedIn: boolean = true;

  constructor(
    private router: Router,
    private propiedadService: PropiedadService // Usamos propiedadService para los filtros
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes('/arrendatario')) {
          this.verInicio = false;
          this.rolArrendatario = true;
        } else if (event.url.includes('/arrendador')) {
          this.verInicio = false;
          this.rolArrendatario = false;
        } else {
          this.verInicio = true;
        }
      });
  }
  /*
 aplicarFiltros(filtro: any) {
   // Aplicamos los filtros localmente a través del propiedadService
   this.propiedadService.aplicarFiltros(filtro);
 }
   */

  mostrarBusqueda() {
    this.verBarraBusqueda = !this.verBarraBusqueda;
    if (this.rolArrendatario) {
      this.verBusquedaArrendatario = this.verBarraBusqueda;
    } else {
      this.verBusquedaArrendador = this.verBarraBusqueda;
    }
  }

  mostrarCuenta() {
    this.verCuenta = !this.verCuenta;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  irAPublicarPropiedad() {
    this.router.navigate(['/publicar-propiedad']);
  }

  redirectToHome() {
    if (this.rolArrendatario) {
      this.router.navigate(['/arrendatario']); // Ruta para arrendatarios
    } else {
      this.router.navigate(['/arrendador']); // Ruta para arrendadores
    }
  }

  

}

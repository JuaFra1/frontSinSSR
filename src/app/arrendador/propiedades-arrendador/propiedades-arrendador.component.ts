import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { UsuarioService } from '../../../Conexion back/services/usuario.service';
import { CardArrendadorComponent } from '../card-arrendador/card-arrendador.component';

@Component({
  selector: 'app-propiedades-arrendador',
  standalone: true,
  imports: [CommonModule, CardArrendadorComponent],
  templateUrl: './propiedades-arrendador.component.html',
  styleUrl: './propiedades-arrendador.component.css'
})
export class PropiedadesArrendadorComponent implements OnInit {
  descripcionGenerica: string = "Esta es una descripción de la propiedad.";
  imagenGenerica: string = "https://picsum.photos/200/300";
  propiedades: Propiedad[] = [];
  idArrendador: number = 0;

  constructor(private propiedadService: PropiedadService, private userService: UsuarioService) { }

  ngOnInit(): void {
    this.getPropiedadesLogged();
  }

  getPropiedadesLogged(): void {
    // Verificar si sessionStorage está disponible
    this.userService.getUsuarioData().subscribe(usuario => {
      if (!usuario) {  // Aquí verificamos si usuario es undefined o null
        console.error('No hay usuario almacenado en sessionStorage.');
        return;
      }

      // Si llegamos aquí, significa que usuario no es undefined o null
      this.idArrendador = usuario.id;
      console.log('ID del arrendador:', this.idArrendador);
      this.propiedadService.getPropiedadesArrendador(this.idArrendador).subscribe(propiedades => {
        this.propiedades = propiedades;
      });
    });
  }
}

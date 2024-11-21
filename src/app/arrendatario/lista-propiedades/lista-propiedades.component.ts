import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { CardPropiedadComponentArrendatario } from '../card-propiedad/card-propiedad.component';

@Component({
  selector: 'app-lista-propiedades-arrendatario',
  standalone: true,
  imports: [CommonModule, CardPropiedadComponentArrendatario],
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponentArrendatario implements OnInit {
 // descripcionGenerica: string = "Esta es una descripción de la propiedad.";
  imagenGenerica: string = "https://picsum.photos/200/300";
  propiedades: Propiedad[] = [];

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject de propiedades filtradas
    this.propiedadService.propiedadesFiltradas$.subscribe((data: Propiedad[]) => {
      this.propiedades = data;
    });
  }
}

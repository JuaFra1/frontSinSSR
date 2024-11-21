import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Calificacion } from '../../Conexion back/models/calificacion.model';
import { CalificacionService } from '../../Conexion back/services/calificacion.service';

@Component({
  selector: 'app-calificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css'],
})
export class CalificarComponent implements OnInit {
  nota: number | null = null;
  comentario: string = '';

  id: number = 0;
  tipo: number =0;

  constructor(
    private route: ActivatedRoute,
    private calificacionService: CalificacionService,
    private router: Router // Renamed from route1 to router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const tipoParam = params.get('tipo');
      this.id = idParam !== null ? +idParam : 0; 
      this.tipo = tipoParam !== null ? +tipoParam : 0; 
    });
  }

  // Métodos
  enviarCalificacion() {
    const calificacion: Calificacion = {
      id: 0, // Assuming the backend will generate the ID
      calificacion: this.nota!,
      comentario: this.comentario,
      status: 0, 
      idTipo: this.tipo,
      idCalificado: this.id
    };

    this.calificacionService.crearCalificacion(calificacion).subscribe(response => {
      console.log('Calificación enviada:', response);
      alert("Calificacion enviada con exito")
      this.cerrarFormulario();
    });
  }

  cerrarFormulario() {
    this.nota = null;
    this.comentario = '';
    if (this.tipo === 1) {
      this.router.navigate(['/arrendador']);
    } else {
      this.router.navigate(['/arrendatario']);
    }
  }
}
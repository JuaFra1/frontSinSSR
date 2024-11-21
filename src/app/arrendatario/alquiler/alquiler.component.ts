import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output , Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service'; 
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() propiedadId!: number;

  fechaLlegada: Date | null = null;
  fechaPartida: Date | null = null;
  cantidadPersonas: number | null = null;
  metodoPago: string = '';
  arrendatarioId: number = 0;
  
  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {
    const usuarioData = sessionStorage.getItem('usuario');
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      if (usuario.tipoUsuario === 'arrendatario') {
        this.arrendatarioId = usuario.id;
      }
    }
  }

  onPagar = () => {
    if (this.fechaLlegada && this.fechaPartida && this.cantidadPersonas && this.metodoPago) {
      const solicitud: Solicitud = {
        fechaLlegada: this.fechaLlegada,
        fechaPartida: this.fechaPartida,
        aceptacion: false,
        cantidadPersonas: this.cantidadPersonas,
        propiedadId: this.propiedadId,
        arrendatarioId: this.arrendatarioId 
      };
  
      this.solicitudService.crearSolicitud(solicitud).subscribe(
        () => {
          alert('El alquiler fue programado exitosamente');
          this.cerrarFormulario();
        },
        error => {
          console.error('Error al crear la solicitud:', error);
          alert('Hubo un error al programar el alquiler. Por favor, inténtelo de nuevo más tarde.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos antes de continuar.');
    }
  }

  cerrarFormulario() {
    this.cerrar.emit();
  }
}
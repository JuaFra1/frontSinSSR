import { Component, Input, OnInit } from '@angular/core';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
  @Input() nombre: string = '';
  @Input() fechaLlegada: Date = new Date();
  @Input() fechaPartida: Date = new Date();
  @Input() nombreArrendatario: string = '';
  @Input() calificacionPromedio: number = 0;
  @Input() cantidadPersonas: number = 0;
  @Input() id: number =0;

  isButtonDisabled: boolean = false;
  buttonText: string = 'Aceptar Solicitud';

  constructor(private solicitudDetalleService: SolicitudService, private router: Router) {}
    
  ngOnInit() {
    this.solicitudDetalleService.getSolicitud(this.id).subscribe(solicitud => {
      if (solicitud.aceptacion) {
        this.buttonText = 'Solicitud Aceptada';
        this.isButtonDisabled = true;
       }
    });  
  }
  

  aceptarSolicitud() {
    this.solicitudDetalleService.aceptarSolicitud(this.id).pipe(
      catchError(error => {
          console.error('Error al aceptar la solicitud:', error);
          alert('Hubo un error al aceptar la solicitud. Por favor, inténtelo de nuevo.');
          this.isButtonDisabled = false;
          return of(null); // Return a fallback value or empty observable
      })
  ).subscribe(response => {
      if (response) {
        alert('Solicitud aceptada');
        this.buttonText = 'Solicitud Aceptada';
        this.isButtonDisabled = true;
      } else {
        this.isButtonDisabled = false;
      }
  });
}
}

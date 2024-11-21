import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent{
  verVertical = false;

  mostrarVertical(){
    this.verVertical = !this.verVertical;
  }
  
}

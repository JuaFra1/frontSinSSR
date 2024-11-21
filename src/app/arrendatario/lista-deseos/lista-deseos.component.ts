import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-lista-deseos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-deseos.component.html',
  styleUrl: './lista-deseos.component.css'
})
export class ListaDeseosComponent {

}

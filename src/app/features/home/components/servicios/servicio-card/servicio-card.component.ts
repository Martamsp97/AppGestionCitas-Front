import { Component, Input } from '@angular/core';
import { Servicio } from 'src/app/interfaces/servicio.interface';

@Component({
  selector: 'app-servicio-card',
  templateUrl: './servicio-card.component.html',
  styleUrls: ['./servicio-card.component.css']
})
export class ServicioCardComponent {
  @Input() servicio!: Servicio;
}

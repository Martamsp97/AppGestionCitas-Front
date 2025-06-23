import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-info-profesional',
  templateUrl: './info-profesional.component.html',
  styleUrls: ['./info-profesional.component.css']
})
export class InfoProfesionalComponent {
  @Input() usuario!: Usuario;
}

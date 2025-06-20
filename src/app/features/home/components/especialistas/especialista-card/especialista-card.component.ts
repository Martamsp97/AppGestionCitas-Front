import { Component, Input } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista.interface';

@Component({
  selector: 'app-especialista-card',
  templateUrl: './especialista-card.component.html',
  styleUrls: ['./especialista-card.component.css']
})
export class EspecialistaCardComponent {
  @Input() especialista!: Especialista;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Cita } from 'src/app/interfaces/cita.interface';

@Component({
  selector: 'app-card-cita',
  templateUrl: './card-cita.component.html',
  styleUrls: ['./card-cita.component.css']
})
export class CardCitaComponent {
  @Input() cita!: Cita;
  @Output() eliminar = new EventEmitter<number>();
  @Output() editar = new EventEmitter<Cita>();


  borrarCita() {
    console.log('Cita en hijo:', this.cita);
    console.log('ID de la cita:', this.cita?.id);
    const confirmado = confirm('¿Estás seguro de que quieres eliminar esta cita?');
    if (confirmado) {
      this.eliminar.emit(this.cita.id);
    }
  }

  cargarCitas() {
    this.cita = JSON.parse(localStorage.getItem('citas') || '[]');
  }

  editarCita() {
    this.editar.emit(this.cita);
  }
}

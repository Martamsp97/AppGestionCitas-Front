import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-info-profesional',
  templateUrl: './info-profesional.component.html',
  styleUrls: ['./info-profesional.component.css']
})
export class InfoProfesionalComponent {

  @Input() usuario!: Usuario;                   // Usuario que se muestra (padre le pasa)
  @Input() especialista?: Especialista;        // Especialista asignado al usuario
  @Input() mostrarBorrar: boolean = false;     // Control para mostrar u ocultar botón borrar
  @Output() eliminar = new EventEmitter<number>();  // Evento para emitir id a padre al borrar

  constructor(private router: Router) { }

  /**
   * Método que se llama al pulsar botón borrar
   * Confirma con el usuario y emite el id para que el padre borre del servicio
   */
  borrarEspecialista(): void {
    if (!this.especialista) return; // No hacer nada si no hay especialista asignado

    // Confirmar con el usuario antes de borrar
    const confirmado = confirm(`¿Seguro que quieres eliminar a ${this.especialista.nombre} ${this.especialista.apellidos}?`);

    if (confirmado) {
      this.eliminar.emit(this.especialista.id); // Emitir id del especialista a borrar
    }
  }

  editarEspecialista() {
    // Navega a la ruta de edición con el id del usuario
    this.router.navigate(['/dashboard/editar-profesional', this.usuario.id]);
  }
}

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialistasService } from 'src/app/features/home/services/especialistas.service';
import { Cita } from 'src/app/interfaces/cita.interface';
import { Especialista } from 'src/app/interfaces/especialista.interface';

@Component({
  selector: 'app-citas-profesional',
  templateUrl: './citas-profesional.component.html',
  styleUrls: ['./citas-profesional.component.css']
})
export class CitasProfesionalComponent {
  @Input() citas: Cita[] = [];

  especialistaId: number = 0;
  // Inyectamos el router para navegar a la edición de citas
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.especialistaId = Number(this.route.snapshot.paramMap.get('id'));
    let citasGuardadas: Cita[] = JSON.parse(localStorage.getItem('citas') || '[]');

    citasGuardadas = citasGuardadas.map((cita, index) => ({
      ...cita,
      id: cita.id ?? index + 1,
    }));

    this.citas = citasGuardadas.filter(cita => cita.especialista.id === this.especialistaId);

    localStorage.setItem('citas', JSON.stringify(this.citas));
    console.log('Citas cargadas con IDs:', this.citas);
  }


  /**
   * Método para borrar una cita por su ID.
   * Actualiza el array de citas y lo guarda en localStorage.
   * @param id ID de la cita a borrar
   */
  borrarCita(id: number) {
    console.log('Borrar cita con id:', id);
    const citas = JSON.parse(localStorage.getItem('citas') || '[]');
    const nuevasCitas = citas.filter((c: Cita) => c.id !== id);
    localStorage.setItem('citas', JSON.stringify(nuevasCitas));
    this.citas = nuevasCitas;
  }


  /**
   * Método para navegar a la página de edición de una cita.
   * Utiliza el router para pasar la cita seleccionada como estado.
   * @param cita Cita a editar
   */

  editarCita(cita: Cita) {
    // Puedes navegar con state o pasar por params
    this.router.navigate(['/citas/editar'], { state: { cita } });
  }


  /**
   * Método para navegar a la página de creación de citas.
   * Utiliza el router para pasar el ID del especialista.
   */
  crearCita() {
    this.router.navigate(['/citas/especialista', this.especialistaId]);
  }
}

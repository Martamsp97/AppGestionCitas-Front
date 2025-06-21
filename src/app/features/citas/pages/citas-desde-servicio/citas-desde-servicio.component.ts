import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { EspecialistasService } from 'src/app/features/home/services/especialistas.service';
@Component({
  selector: 'app-citas-desde-servicio',
  templateUrl: './citas-desde-servicio.component.html',
  styleUrls: ['./citas-desde-servicio.component.css']
})
export class CitasDesdeServicioComponent implements OnInit {
  especialistasAsignados: Especialista[] = [];

  // El constructor recibe ActivatedRoute para acceder a los parámetros de la ruta
  // y EspecialistasService para obtener la lista de especialistas.
  constructor(
    private route: ActivatedRoute,
    private especialistasService: EspecialistasService
  ) { }

  // ngOnInit se ejecuta al inicializar el componente.
  // Aquí se obtiene el ID del servicio desde la ruta y se filtran los especialistas que tienen asignado ese servicio.

  ngOnInit(): void {
    const servicioId = Number(this.route.snapshot.paramMap.get('id'));

    // lo guardamos en localStorage
    localStorage.setItem('servicioSeleccionadoId', servicioId.toString());

    this.especialistasAsignados = this.especialistasService
      .getEspecialistas()
      .filter(e =>
        e.servicios_asignados.some(servicio => servicio.id === servicioId)
      );
  }

}

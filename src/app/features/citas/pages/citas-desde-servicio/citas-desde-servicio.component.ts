import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { EspecialistasService } from 'src/app/features/home/services/especialistas.service';
import { Servicio } from 'src/app/interfaces/servicio.interface';
import { Cita } from 'src/app/interfaces/cita.interface';
import { ServiciosService } from 'src/app/features/home/services/servicios.service';
@Component({
  selector: 'app-citas-desde-servicio',
  templateUrl: './citas-desde-servicio.component.html',
  styleUrls: ['./citas-desde-servicio.component.css']
})
export class CitasDesdeServicioComponent implements OnInit {
  especialistasAsignados: Especialista[] = [];
  especialistaSeleccionado: Especialista | null = null;
  servicioSeleccionado: Servicio | null = null;
  citasDelEspecialista: Cita[] = [];

  // El constructor recibe ActivatedRoute para acceder a los parámetros de la ruta
  // y EspecialistasService para obtener la lista de especialistas.
  constructor(
    private route: ActivatedRoute,
    private especialistasService: EspecialistasService,
    private serviciosService: ServiciosService
  ) { }

  // ngOnInit se ejecuta al inicializar el componente.
  // Aquí se obtiene el ID del servicio desde la ruta y se filtran los especialistas que tienen asignado ese servicio.

  ngOnInit(): void {
    const servicioId = Number(this.route.snapshot.paramMap.get('id'));

    // Recuperar el servicio con ese ID
    const todosLosServicios = this.serviciosService.getServicios(); // O llama al backend si es asíncrono

    this.servicioSeleccionado = todosLosServicios.find(s => s.id === servicioId) || null;

    if (!this.servicioSeleccionado) {
      console.error('No se encontró el servicio con ID:', servicioId);
    }

    //Cargamos las citas del especialista del localStorage
    const rawCitas = localStorage.getItem('citas');
    if (rawCitas) {
      this.citasDelEspecialista = JSON.parse(rawCitas);
    }
  }

  onServicioSeleccionado(servicio: Servicio) {
    this.servicioSeleccionado = servicio;
  }


  onEspecialistaSeleccionado(esp: Especialista) {
    this.especialistaSeleccionado = esp;
  }

  onFechaSeleccionada(fecha: Date): void {
    console.log('Hora seleccionada desde calendario:', fecha);
    // Aquí podrías abrir un modal de confirmación, guardar la cita, etc.
  }

}

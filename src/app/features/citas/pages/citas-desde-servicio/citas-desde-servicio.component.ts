import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  fechaHora: { inicio: Date, fin: Date } | null = null;
  // El constructor recibe ActivatedRoute para acceder a los parámetros de la ruta
  // y EspecialistasService para obtener la lista de especialistas.
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  onFechaHoraSeleccionada(datos: { inicio: Date; fin: Date }): void {
    console.log('Fecha y hora seleccionadas:', datos);
    this.fechaHora = datos;
  }
  continuar(): void {
    if (!this.fechaHora || !this.especialistaSeleccionado || !this.servicioSeleccionado) {
      alert('Faltan datos para continuar');
      return;
    }

    const citaParcial: Partial<Cita> = {
      servicio: this.servicioSeleccionado,
      especialista: this.especialistaSeleccionado,
      inicio: this.fechaHora.inicio,
      fin: this.fechaHora.fin,
      estado: 'pendiente'
    };

    console.log('Cita parcial completa:', citaParcial);
    // Aquí puedes guardar en un servicio o navegar
    this.router.navigate(['/citas/datos-cliente'], { state: { cita: citaParcial } });
  }


}

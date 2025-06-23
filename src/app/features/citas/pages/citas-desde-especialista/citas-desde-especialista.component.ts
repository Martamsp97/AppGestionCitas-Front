import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { EspecialistasService } from 'src/app/features/home/services/especialistas.service';
import { Servicio } from 'src/app/interfaces/servicio.interface';
import { Cita } from 'src/app/interfaces/cita.interface';
import { ServiciosService } from 'src/app/features/home/services/servicios.service';

@Component({
  selector: 'app-citas-desde-especialista',
  templateUrl: './citas-desde-especialista.component.html',
  styleUrls: ['./citas-desde-especialista.component.css']
})
export class CitasDesdeEspecialistaComponent implements OnInit {
  especialistasAsignados: Especialista[] = [];
  especialistaSeleccionado: Especialista | null = null;
  servicioSeleccionado: Servicio | null = null;
  citasDelEspecialista: Cita[] = [];
  fechaHora: { inicio: Date, fin: Date } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private especialistasService: EspecialistasService,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    const especialistaId = Number(this.route.snapshot.paramMap.get('id'));

    // Recuperar el especialista con ese ID
    const todosLosEspecialistas = this.especialistasService.getEspecialistas();

    this.especialistaSeleccionado = todosLosEspecialistas.find(s => s.id === especialistaId) || null;

    if (!this.especialistaSeleccionado) {
      console.error('No se encontró el servicio con ID:', especialistaId);
    }

    //Cargamos las citas del especialista del localStorage
    const rawCitas = localStorage.getItem('citas');
    if (rawCitas) {
      this.citasDelEspecialista = JSON.parse(rawCitas);
    }
  }
  onServicioSeleccionado(servicio: Servicio): void {
    this.servicioSeleccionado = servicio;
    console.log('Servicio seleccionado:', servicio);
  }

  onespecialistaSeleccionado(especialista: Especialista) {
    this.especialistaSeleccionado = especialista;
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

    // Guardar la cita parcial en localStorage
    localStorage.setItem('citaParcial', JSON.stringify(citaParcial));

    this.router.navigate(['/citas/datos-cliente'], { state: { cita: citaParcial } });
  }



}

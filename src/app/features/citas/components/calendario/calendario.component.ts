import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  addMonths, subMonths, startOfMonth, startOfDay, isBefore, addMinutes, parse
} from 'date-fns';

import { Cita } from 'src/app/interfaces/cita.interface';
import { Especialista, Horario } from 'src/app/interfaces/especialista.interface';
import { Servicio } from 'src/app/interfaces/servicio.interface';
import { CitasService } from '../../services/citas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() especialistaSeleccionado: Especialista | null = null;
  @Input() servicioSeleccionado: Servicio | null = null;
  @Input() citas: Cita[] = [];

  @Output() fechaHoraSeleccionado = new EventEmitter<{ inicio: Date; fin: Date }>();




  mesActual: Date = new Date();
  diasDelMes: Date[] = [];
  hoy: Date = startOfDay(new Date());
  horasDisponibles: string[] = [];
  horaSeleccionada: string | null = null;
  diaSeleccionado: Date | null = null;
  diasDeLaSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Inyectamos el servicio de citas para poder acceder a las citas almacenadas
  // y generar las horas disponibles según el especialista y servicio seleccionados.
  constructor(private citasService: CitasService, private router: Router) { }

  //inicializamos el componente y generamos los días del mes 
  ngOnInit(): void {
    this.citas = this.citasService.getCitas();
    this.generarDiasDelMes();
  }

  // seleccionarDia recibe una fecha y verifica si hay un especialista y servicio seleccionados
  seleccionarDia(fecha: Date): void {
    console.log('Especialista recibido:', this.especialistaSeleccionado);
    console.log('Servicio recibido:', this.servicioSeleccionado);

    if (!this.especialistaSeleccionado || !this.servicioSeleccionado) {
      alert('Por favor, selecciona un especialista y un servicio antes.');
      return;
    }

    this.diaSeleccionado = fecha;
    this.horasDisponibles = this.calcularHorasDisponibles(fecha);
  }


  // Genera los días visibles en el calendario, según el mes
  generarDiasDelMes(): void {
    const year = this.mesActual.getFullYear();
    const month = this.mesActual.getMonth();
    const diasEnElMes = new Date(year, month + 1, 0).getDate();

    this.diasDelMes = [];
    //filtramos los días no laborables y los días pasados
    for (let dia = 1; dia <= diasEnElMes; dia++) {
      const fecha = new Date(year, month, dia);
      const esFuturo = fecha >= startOfDay(this.hoy);
      const diaSemana = fecha.getDay();

      // Solo días laborables futuros
      if (esFuturo && diaSemana >= 1 && diaSemana <= 5) {
        this.diasDelMes.push(fecha);
      }
    }
  }



  // Navegar al mes siguiente o anterior
  irAlMesSiguiente(): void {
    this.mesActual = addMonths(this.mesActual, 1);
    this.generarDiasDelMes();
  }

  irAlMesAnterior(): void {
    const mesAnterior = subMonths(this.mesActual, 1);
    if (!isBefore(startOfMonth(mesAnterior), startOfMonth(this.hoy))) {
      this.mesActual = mesAnterior;
      this.generarDiasDelMes();
    }
  }
  //Verificamos si el mes anterior es válido para navegar.
  //será álido siempre y cuando no sea anterior al mes actual
  get puedeIrAlMesAnterior(): boolean {
    return !isBefore(startOfMonth(subMonths(this.mesActual, 1)), startOfMonth(this.hoy));
  }
  //Recuperamos el mes y el año actual en formato 'mes año' para mostrarlo en el calendario
  get mesYAnio(): string {
    return this.mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }

  // Calcular las horas disponibles en franjas de 30 min para que el usuairio pueda seleccionarlas
  calcularHorasDisponibles(fecha: Date): string[] {
    const horas: string[] = [];

    if (!this.especialistaSeleccionado || !this.servicioSeleccionado) {
      return horas;
    }

    // Obtener el día de la semana en minúsculas (ej: 'lunes')
    const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();

    // Buscar el horario que contenga ese día en el array de días
    const horarioDelDia = this.especialistaSeleccionado.horario.find(h =>
      h.dia.some(d => d.toLowerCase() === diaSemana)
    );

    if (!horarioDelDia) return horas;

    const horaInicio = parse(horarioDelDia.hora_inicio, 'HH:mm', fecha);
    const horaFin = parse(horarioDelDia.hora_fin, 'HH:mm', fecha);
    const duracion = this.servicioSeleccionado.duracion_minutos;

    let horaActual = new Date(horaInicio);

    // Filtrar las citas del especialista para ese día
    const citasDelDia = this.citasService.getCitasPorEspecialista(this.especialistaSeleccionado.id)
      .filter(cita =>
        cita.inicio.toDateString() === fecha.toDateString()
      );

    while (horaActual < horaFin) {
      const horaFinBloque = addMinutes(horaActual, duracion);

      // Verificar si el bloque actual colisiona con alguna cita existente
      const hayConflicto = citasDelDia.some(cita =>
        (horaActual < cita.fin && horaFinBloque > cita.inicio)
      );

      if (!hayConflicto) {
        horas.push(horaActual.toTimeString().substring(0, 5)); // Formato HH:mm
      }

      horaActual = addMinutes(horaActual, duracion);
    }

    return horas;
  }

  // Convertir '08:30' → minutos desde medianoche
  toMinutes(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  }

  // Convertir minutos → { h: 8, m: 30 }
  fromMinutes(min: number): { h: number, m: number } {
    return {
      h: Math.floor(min / 60),
      m: min % 60
    };
  }


  //Guardamos la fecha y hora seleccionada y la emitimos al componente padre
  //para que pueda ser utilizada en el proceso de creación de la cita.
  emitirFechaYHora(): void {
    if (!this.diaSeleccionado || !this.horaSeleccionada || !this.servicioSeleccionado) {
      return;
    }

    const [h, m] = this.horaSeleccionada.split(':').map(Number);
    const inicio = new Date(this.diaSeleccionado);
    inicio.setHours(h, m, 0, 0);

    const fin = addMinutes(inicio, this.servicioSeleccionado.duracion_minutos);

    this.fechaHoraSeleccionado.emit({ inicio, fin });
  }
  seleccionarHora(hora: string): void {
    this.horaSeleccionada = hora;
    this.emitirFechaYHora();
  }


}



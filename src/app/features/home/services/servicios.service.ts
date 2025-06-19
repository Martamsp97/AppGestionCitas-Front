import { Injectable } from '@angular/core';
import { Servicio } from '../../../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private servicios: Servicio[] = [
    { nombre: 'rehabilitacion', duracion_minutos: 60 },
    { nombre: 'pilates', duracion_minutos: 45 },
    { nombre: 'indiba', duracion_minutos: 30 },
    { nombre: 'drenaje linfatico', duracion_minutos: 30 },
    { nombre: 'masoterapia', duracion_minutos: 60 },
    { nombre: 'acupuntura', duracion_minutos: 30 },
    { nombre: 'epte', duracion_minutos: 20 },
    { nombre: 'osteopatia', duracion_minutos: 60 },
    { nombre: 'terapia deportiva', duracion_minutos: 60 },
  ];

  constructor() { }

  getServicios(): Servicio[] {
    return this.servicios;
  }
}

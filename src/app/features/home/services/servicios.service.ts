import { Injectable } from '@angular/core';
import { Servicio } from '../../../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private servicios: Servicio[] = [
    { id: 1, clave: 'rehabilitacion', nombre: "Rehabilitación", duracion_minutos: 60, precio: 50 },
    { id: 2, clave: 'pilates', nombre: "Pilates", duracion_minutos: 60, precio: 30 },
    { id: 3, clave: 'indiba', nombre: "INDIBA", duracion_minutos: 30, precio: 40 },
    { id: 4, clave: 'drenaje linfatico', nombre: "Drenaje Linfático", duracion_minutos: 30, precio: 35 },
    { id: 5, clave: 'masoterapia', nombre: "Masoterapia", duracion_minutos: 60, precio: 45 },
    { id: 6, clave: 'acupuntura', nombre: "Acupuntura", duracion_minutos: 30, precio: 40 },
    { id: 7, clave: 'epte', nombre: "EPTE", duracion_minutos: 30, precio: 25 },
    { id: 8, clave: 'osteopatia', nombre: "Osteopatía", duracion_minutos: 60, precio: 55 },
    { id: 9, clave: 'terapia deportiva', nombre: "Terapia Deportiva", duracion_minutos: 60, precio: 50 },
  ];

  constructor() { }

  getServicios(): Servicio[] {
    return this.servicios;
  }
}

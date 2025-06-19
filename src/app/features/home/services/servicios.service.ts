import { Injectable } from '@angular/core';
import { Servicio } from '../../../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private servicios: Servicio[] = [
    { clave: 'rehabilitacion', nombre: "Rehabilitación", duracion_minutos: 60, precio: 50 },
    { clave: 'pilates', nombre: "Pilates", duracion_minutos: 45, precio: 30 },
    { clave: 'indiba', nombre: "INDIBA", duracion_minutos: 30, precio: 40 },
    { clave: 'drenaje linfatico', nombre: "Drenaje Linfático", duracion_minutos: 30, precio: 35 },
    { clave: 'masoterapia', nombre: "Masoterapia", duracion_minutos: 60, precio: 45 },
    { clave: 'acupuntura', nombre: "Acupuntura", duracion_minutos: 30, precio: 40 },
    { clave: 'epte', nombre: "EPTE", duracion_minutos: 20, precio: 25 },
    { clave: 'osteopatia', nombre: "Osteopatía", duracion_minutos: 60, precio: 55 },
    { clave: 'terapia deportiva', nombre: "Terapia Deportiva", duracion_minutos: 60, precio: 50 },
  ];

  constructor() { }

  getServicios(): Servicio[] {
    return this.servicios;
  }
}

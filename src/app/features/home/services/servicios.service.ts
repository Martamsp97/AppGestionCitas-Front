import { Injectable } from '@angular/core';
import { Servicio } from '../../../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  // Lista local de servicios que gestionaremos en memoria y persistiremos en localStorage
  private servicios: Servicio[] = [];

  constructor() {
    // Al inicializar el servicio, intentamos recuperar los servicios guardados en localStorage.
    // Si no existen, inicializamos con datos por defecto y los guardamos.
    const guardados = localStorage.getItem('servicios');
    if (guardados) {
      this.servicios = JSON.parse(guardados);
    } else {
      this.servicios = [
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
      this.guardarServicios();
    }
  }

  /**
   * Devuelve una copia de la lista de servicios.
   * Ideal para listar servicios en componentes.
   */
  getServicios(): Servicio[] {
    return [...this.servicios];
  }

  /**
   * Busca un servicio por su ID.
   * @param id - ID del servicio a buscar
   * @returns Servicio encontrado o undefined
   */
  getServicioPorId(id: number): Servicio | undefined {
    return this.servicios.find(s => s.id === id);
  }

  /**
   * Crea un nuevo servicio y lo guarda.
   * @param servicio - Objeto Servicio con los datos del nuevo servicio
   */
  crearServicio(servicio: Servicio): void {
    this.servicios.push(servicio);
    this.guardarServicios();
  }

  /**
   * Actualiza un servicio existente según su ID.
   * @param servicioActualizado - Objeto con los datos nuevos del servicio
   * @returns true si se actualizó correctamente, false si no se encontró
   */
  actualizarServicio(servicioActualizado: Servicio): boolean {
    const index = this.servicios.findIndex(s => s.id === servicioActualizado.id);
    if (index === -1) return false;

    this.servicios[index] = servicioActualizado;
    this.guardarServicios();
    return true;
  }

  /**
   * Elimina un servicio por ID.
   * @param id - ID del servicio a eliminar
   * @returns true si se eliminó, false si no se encontró
   */
  borrarServicio(id: number): boolean {
    const index = this.servicios.findIndex(s => s.id === id);
    if (index === -1) return false;

    this.servicios.splice(index, 1);
    this.guardarServicios();
    return true;
  }

  /**
   * Guarda la lista actual de servicios en localStorage
   */
  private guardarServicios(): void {
    localStorage.setItem('servicios', JSON.stringify(this.servicios));
  }
}


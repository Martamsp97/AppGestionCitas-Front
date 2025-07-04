import { Injectable } from '@angular/core';
import { Especialista, Horario } from '../../../interfaces/especialista.interface';
import { Servicio } from '../../../interfaces/servicio.interface';
import { ServiciosService } from './servicios.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  private especialistas: Especialista[] = [];

  constructor(private serviciosService: ServiciosService) {
    const especialistasGuardados = localStorage.getItem('especialistas');
    if (especialistasGuardados) {
      this.especialistas = JSON.parse(especialistasGuardados);
    } else {
      const servicios = this.serviciosService.getServicios();

      const serviciosMap = new Map<number, Servicio>(
        servicios.map(s => [s.id, s])
      );

      this.especialistas = [
        {
          id: 1,
          nombre: 'Ana',
          apellidos: 'García',
          email: 'ana.garcia@sirona.com',
          telefono: '600123456',
          foto_url: 'assets/images/ana.png',
          servicios_asignados: [
            serviciosMap.get(1)!,
            serviciosMap.get(9)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
          ]
        },
        {
          id: 2,
          nombre: 'Luis',
          apellidos: 'Martínez',
          email: 'luis.martinez@sirona.com',
          telefono: '600654321',
          foto_url: 'assets/images/luis.png',
          servicios_asignados: [
            serviciosMap.get(1)!,
            serviciosMap.get(9)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
          ]
        },
        {
          id: 3,
          nombre: 'María',
          apellidos: 'López',
          email: 'maria.lopez@sirona.com',
          telefono: '600789012',
          foto_url: 'assets/images/maria.png',
          servicios_asignados: [
            serviciosMap.get(8)!,
            serviciosMap.get(5)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
          ]
        },
        {
          id: 4,
          nombre: 'Javier',
          apellidos: 'Sánchez',
          email: 'javier.sanchez@sirona.com',
          telefono: '600345678',
          foto_url: 'assets/images/javier.png',
          servicios_asignados: [
            serviciosMap.get(8)!,
            serviciosMap.get(5)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
          ]
        },
        {
          id: 5,
          nombre: 'Sofía',
          apellidos: 'Fernández',
          email: 'sofia.fernandez@sirona.com',
          telefono: '600456789',
          foto_url: 'assets/images/sofia.png',
          servicios_asignados: [
            serviciosMap.get(7)!,
            serviciosMap.get(6)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
          ]
        },
        {
          id: 6,
          nombre: 'Carlos',
          apellidos: 'Rodríguez',
          email: 'carlos.rodriguez@sirona.com',
          telefono: '600987654',
          foto_url: 'assets/images/carlos.png',
          servicios_asignados: [
            serviciosMap.get(7)!,
            serviciosMap.get(6)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
          ]
        },
        {
          id: 7,
          nombre: 'Lucía',
          apellidos: 'Torres',
          email: 'lucia.torres@sirona.com',
          telefono: '600321987',
          foto_url: 'assets/images/lucia.png',
          servicios_asignados: [
            serviciosMap.get(3)!,
            serviciosMap.get(4)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
          ]
        },
        {
          id: 8,
          nombre: 'Miguel',
          apellidos: 'Ruiz',
          email: 'miguel.ruiz@sirona.com',
          telefono: '600765432',
          foto_url: 'assets/images/miguel.png',
          servicios_asignados: [
            serviciosMap.get(3)!,
            serviciosMap.get(4)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
          ]
        },
        {
          id: 9,
          nombre: 'Elena',
          apellidos: 'Jiménez',
          email: 'elena.jimenez@sirona.com',
          telefono: '600112233',
          foto_url: 'assets/images/elena.png',
          servicios_asignados: [
            serviciosMap.get(2)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
          ]
        },
        {
          id: 10,
          nombre: 'Diego',
          apellidos: 'Molina',
          email: 'diego.molina@sirona.com',
          telefono: '600998877',
          foto_url: 'assets/images/diego.png',
          servicios_asignados: [
            serviciosMap.get(2)!,
          ],
          horario: [
            { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
          ]
        }
      ];

      this.guardarEspecialistas();
    }
  }

  getEspecialistas(): Especialista[] {
    return this.especialistas;
  }

  getEspecialistaPorId(id: number): Especialista | undefined {
    return this.especialistas.find(e => e.id === id);
  }

  guardarEspecialistas() {
    localStorage.setItem('especialistas', JSON.stringify(this.especialistas));
  }

  borrarEspecialista(id: number): boolean {
    const index = this.especialistas.findIndex(e => e.id === id);
    if (index === -1) return false;

    this.especialistas.splice(index, 1);
    this.guardarEspecialistas();
    return true;
  }

  actualizarEspecialista(especialistaActualizado: Especialista): boolean {
    const index = this.especialistas.findIndex(e => e.id === especialistaActualizado.id);
    if (index === -1) {
      console.warn(`No se encontró especialista con id ${especialistaActualizado.id}`);
      return false;
    }

    // Actualizamos la información
    this.especialistas[index] = { ...especialistaActualizado };
    this.guardarEspecialistas();
    return true;
  }
}

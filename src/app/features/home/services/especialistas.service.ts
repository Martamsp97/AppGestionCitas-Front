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

    const servicios = this.serviciosService.getServicios();

    // Mapeo para acceder rápido a servicios por clave
    const serviciosMap = new Map<string, Servicio>(
      servicios.map(s => [s.clave, s])
    );
    this.especialistas = [
      // 1 y 2: Rehabilitación y terapia manual (mañana y tarde)
      {
        id: 0,
        nombre: 'Ana',
        apellidos: 'García',
        email: 'ana.garcia@sirona.com',
        telefono: '600123456',
        foto_url: 'assets/images/ana.png',
        servicios_asignados: [
          serviciosMap.get('rehabilitacion')!,
          serviciosMap.get('terapia deportiva')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
        ]
      },
      {
        id: 1,
        nombre: 'Luis',
        apellidos: 'Martínez',
        email: 'luis.martinez@sirona.com',
        telefono: '600654321',
        foto_url: 'assets/images/luis.png',
        servicios_asignados: [
          serviciosMap.get('rehabilitacion')!,
          serviciosMap.get('terapia deportiva')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
        ]
      },

      // 3 y 4: Osteopatía y masoterapia
      {
        id: 2,
        nombre: 'María',
        apellidos: 'López',
        email: 'maria.lopez@sirona.com',
        telefono: '600789012',
        foto_url: 'assets/images/maria.png',
        servicios_asignados: [
          serviciosMap.get('osteopatia')!,
          serviciosMap.get('masoterapia')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
        ]
      },
      {
        id: 3,
        nombre: 'Javier',
        apellidos: 'Sánchez',
        email: 'javier.sanchez@sirona.com',
        telefono: '600345678',
        foto_url: 'assets/images/javier.png',
        servicios_asignados: [
          serviciosMap.get('osteopatia')!,
          serviciosMap.get('masoterapia')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
        ]
      },

      // 5 y 6: EPTE y acupuntura
      {
        id: 4,
        nombre: 'Sofía',
        apellidos: 'Fernández',
        email: 'sofia.fernandez@sirona.com',
        telefono: '600456789',
        foto_url: 'assets/images/sofia.png',
        servicios_asignados: [
          serviciosMap.get('epte')!,
          serviciosMap.get('acupuntura')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
        ]
      },
      {
        id: 5,
        nombre: 'Carlos',
        apellidos: 'Rodríguez',
        email: 'carlos.rodriguez@sirona.com',
        telefono: '600987654',
        foto_url: 'assets/images/carlos.png',
        servicios_asignados: [
          serviciosMap.get('epte')!,
          serviciosMap.get('acupuntura')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
        ]
      },

      // 7 y 8: INDIBA y drenaje linfático
      {
        id: 6,
        nombre: 'Lucía',
        apellidos: 'Torres',
        email: 'lucia.torres@sirona.com',
        telefono: '600321987',
        foto_url: 'assets/images/lucia.png',
        servicios_asignados: [
          serviciosMap.get('indiba')!,
          serviciosMap.get('drenaje linfatico')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
        ]
      },
      {
        id: 7,
        nombre: 'Miguel',
        apellidos: 'Ruiz',
        email: 'miguel.ruiz@sirona.com',
        telefono: '600765432',
        foto_url: 'assets/images/miguel.png',
        servicios_asignados: [
          serviciosMap.get('indiba')!,
          serviciosMap.get('drenaje linfatico')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
        ]
      },

      // 9 y 10: Pilates
      {
        id: 8,
        nombre: 'Elena',
        apellidos: 'Jiménez',
        email: 'elena.jimenez@sirona.com',
        telefono: '600112233',
        foto_url: 'assets/images/elena.png',
        servicios_asignados: [
          serviciosMap.get('pilates')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '08:30', hora_fin: '14:30' }
        ]
      },
      {
        id: 9,
        nombre: 'Diego',
        apellidos: 'Molina',
        email: 'diego.molina@sirona.com',
        telefono: '600998877',
        foto_url: 'assets/images/diego.png',
        servicios_asignados: [
          serviciosMap.get('pilates')!,
        ],
        horario: [
          { dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora_inicio: '14:30', hora_fin: '20:30' }
        ]
      },
    ];
  }
  getEspecialistas(): Especialista[] {
    return this.especialistas;
  }
}

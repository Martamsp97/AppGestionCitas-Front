import { Injectable } from '@angular/core';
import { Cita } from 'src/app/interfaces/cita.interface';
import { Servicio } from 'src/app/interfaces/servicio.interface';
import { Especialista } from 'src/app/interfaces/especialista.interface';

const generarId = () => crypto.randomUUID();

@Injectable({
  providedIn: 'root'
})


export class CitasService {

  // Array inicial de citas, que se utilizará para partir con datos predefinidos.

  private citasIniciales: Cita[] = [
    {
      id: 1,
      servicio: { id: 0, clave: 'rehabilitacion', nombre: 'Rehabilitación', duracion_minutos: 60, precio: 50 },
      especialista: { id: 0, nombre: 'Ana', apellidos: 'García', email: 'ana.garcia@sirona.com', telefono: '600123456', foto_url: 'assets/images/ana.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Laura Pérez',
      cliente_telefono: '612345678',
      cliente_email: 'laura@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-24T09:00:00'),
      fin: new Date('2025-06-24T10:00:00'),
      estado: 'pendiente'
    },
    {
      id: 2,
      servicio: { id: 8, clave: 'terapia deportiva', nombre: 'Terapia Deportiva', duracion_minutos: 60, precio: 50 },
      especialista: { id: 1, nombre: 'Luis', apellidos: 'Martínez', email: 'luis.martinez@sirona.com', telefono: '600654321', foto_url: 'assets/images/luis.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Carlos Torres',
      cliente_telefono: '612349999',
      cliente_email: 'carlos@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-24T15:00:00'),
      fin: new Date('2025-06-24T16:00:00'),
      estado: 'pendiente'
    },
    {
      id: 3,
      servicio: { id: 7, clave: 'osteopatia', nombre: 'Osteopatía', duracion_minutos: 60, precio: 55 },
      especialista: { id: 2, nombre: 'María', apellidos: 'López', email: 'maria.lopez@sirona.com', telefono: '600789012', foto_url: 'assets/images/maria.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Lucía Sánchez',
      cliente_telefono: '611223344',
      cliente_email: 'lucia@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-25T09:30:00'),
      fin: new Date('2025-06-25T10:30:00'),
      estado: 'pendiente'
    },
    {
      id: 4,
      servicio: { id: 4, clave: 'masoterapia', nombre: 'Masoterapia', duracion_minutos: 60, precio: 45 },
      especialista: { id: 3, nombre: 'Javier', apellidos: 'Sánchez', email: 'javier.sanchez@sirona.com', telefono: '600345678', foto_url: 'assets/images/javier.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Jorge Martín',
      cliente_telefono: '611556677',
      cliente_email: 'jorge@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-25T16:00:00'),
      fin: new Date('2025-06-25T17:00:00'),
      estado: 'pendiente'
    },
    {
      id: 5,
      servicio: { id: 6, clave: 'epte', nombre: 'EPTE', duracion_minutos: 20, precio: 25 },
      especialista: { id: 4, nombre: 'Sofía', apellidos: 'Fernández', email: 'sofia.fernandez@sirona.com', telefono: '600456789', foto_url: 'assets/images/sofia.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Pedro Ramírez',
      cliente_telefono: '611998877',
      cliente_email: 'pedro@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-26T10:00:00'),
      fin: new Date('2025-06-26T10:20:00'),
      estado: 'pendiente'
    },
    {
      id: 6,
      servicio: { id: 5, clave: 'acupuntura', nombre: 'Acupuntura', duracion_minutos: 30, precio: 40 },
      especialista: { id: 5, nombre: 'Carlos', apellidos: 'Rodríguez', email: 'carlos.rodriguez@sirona.com', telefono: '600987654', foto_url: 'assets/images/carlos.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Sara Gil',
      cliente_telefono: '611665544',
      cliente_email: 'sara@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-27T15:00:00'),
      fin: new Date('2025-06-27T15:30:00'),
      estado: 'pendiente'
    },
    {
      id: 7,
      servicio: { id: 2, clave: 'indiba', nombre: 'INDIBA', duracion_minutos: 30, precio: 40 },
      especialista: { id: 6, nombre: 'Lucía', apellidos: 'Torres', email: 'lucia.torres@sirona.com', telefono: '600321987', foto_url: 'assets/images/lucia.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Esther Molina',
      cliente_telefono: '611332211',
      cliente_email: 'esther@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-27T11:00:00'),
      fin: new Date('2025-06-27T11:30:00'),
      estado: 'pendiente'
    },
    {
      id: 8,
      servicio: { id: 3, clave: 'drenaje linfatico', nombre: 'Drenaje Linfático', duracion_minutos: 30, precio: 35 },
      especialista: { id: 7, nombre: 'Miguel', apellidos: 'Ruiz', email: 'miguel.ruiz@sirona.com', telefono: '600765432', foto_url: 'assets/images/miguel.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Álvaro López',
      cliente_telefono: '611221133',
      cliente_email: 'alvaro@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-28T17:00:00'),
      fin: new Date('2025-06-28T17:30:00'),
      estado: 'pendiente'
    },
    {
      id: 9,
      servicio: { id: 1, clave: 'pilates', nombre: 'Pilates', duracion_minutos: 45, precio: 30 },
      especialista: { id: 8, nombre: 'Elena', apellidos: 'Jiménez', email: 'elena.jimenez@sirona.com', telefono: '600112233', foto_url: 'assets/images/elena.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Nuria Ramos',
      cliente_telefono: '611445566',
      cliente_email: 'nuria@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-29T08:30:00'),
      fin: new Date('2025-06-29T09:15:00'),
      estado: 'pendiente'
    },
    {
      id: 10,
      servicio: { id: 1, clave: 'pilates', nombre: 'Pilates', duracion_minutos: 45, precio: 30 },
      especialista: { id: 9, nombre: 'Diego', apellidos: 'Molina', email: 'diego.molina@sirona.com', telefono: '600998877', foto_url: 'assets/images/diego.png', servicios_asignados: [], horario: [] },
      cliente_nombre: 'Marc Ruiz',
      cliente_telefono: '611778899',
      cliente_email: 'marc@example.com',
      notas_cliente: '',
      notas_profesional: '',
      inicio: new Date('2025-06-29T18:00:00'),
      fin: new Date('2025-06-29T18:45:00'),
      estado: 'pendiente'
    }
  ];

  //Aquí vamos a guardar las citas predefinidas y las que se vayan creando.
  private citas: Cita[];

  constructor() {
    //Recuperamos las citas del localStorage y si no existen, inicializamos con las citas predefinidas.
    const guardadas = localStorage.getItem('citas');
    this.citas = guardadas
      ? JSON.parse(guardadas).map((c: any) => ({
        ...c,
        inicio: new Date(c.inicio),
        fin: new Date(c.fin),
      }))
      : [...this.citasIniciales];

  }

  //Método `para recuperar las citas, tanto las predefinidas como las que se hayan creado posteriormente.
  getCitas(): Cita[] {
    return [...this.citas];
  }

  //Añadimos solo las citas nuevas al localStorage, para evitar sobreescribir las predefinidas.
  //Generamos un id incremental para cada cita nueva recorreindo el array de citas y obteniendo el máximo id actual.
  addCita(cita: Cita): void {
    cita.id = this.citas.length
      ? Math.max(...this.citas.map(c => c.id)) + 1
      : 1;
    this.citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }
  /** Filtra citas por id de especialista */
  getCitasPorEspecialista(id: number): Cita[] {
    return this.citas.filter(c => c.especialista.id === id);
  }

  /** Filtra citas por id de servicio */
  getCitasPorServicio(id: number): Cita[] {
    return this.citas.filter(c => c.servicio.id === id);
  }

}

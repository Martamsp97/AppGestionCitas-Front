//Tipo de dato para un especialista
// Este archivo define la estructura de un especialista en la aplicación de gestión de citas

import { Servicio } from './servicio.interface';

export interface Horario {
    dia: string[];          // formato: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
    hora_inicio: string;  // formato: "HH:MM" 
    hora_fin: string;     // formato: "HH:MM"
}

export interface Especialista {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    foto_url: string;
    servicios_asignados: Servicio[];
    horario: Horario[];
}

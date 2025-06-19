//Tipo de dato para un servicio
// Este archivo define la estructura de un servicio en la aplicación de gestión de citas

export interface Servicio {
    clave: string;
    nombre: string;
    duracion_minutos: number;
    descripcion?: string;
    precio: number;
}

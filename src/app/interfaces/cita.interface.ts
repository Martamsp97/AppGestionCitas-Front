import { Servicio } from './servicio.interface';
import { Especialista } from './especialista.interface';

export interface Cita {
    id: number;
    servicio: Servicio;
    especialista: Especialista;
    cliente_nombre: string;
    cliente_telefono: string;
    cliente_email?: string;
    notas_cliente?: string;
    notas_profesional?: string;
    inicio: Date;
    fin: Date;
    estado: 'pendiente' | 'terminada' | 'cancelada';
}

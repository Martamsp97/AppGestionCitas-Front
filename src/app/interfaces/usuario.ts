//Tipamos la interfaz de Usuario para definir su estructura y prevenir errores en el código por tipados incorrectos
//Vamos a utilizar el email como identificador único para el usuario y será el puente entre el perfil usuario-profesional y el especialista

import { Especialista } from "./especialista.interface";

// El password será el que se use para autenticar al usuario en la aplicación
export interface Usuario {
    id: number;
    email: string;
    password: string;
    rol: 'admin' | 'profesional';
    especialista?: Especialista;
}
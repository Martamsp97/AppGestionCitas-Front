import { Injectable } from '@angular/core';
import { EspecialistasService } from '../../home/services/especialistas.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // creamos la variable donde almacenar a los usuarios
  private usuarios: Usuario[] = [];

  constructor(private especialistasService: EspecialistasService) {
    //Creamos al usuario administrador por defecto
    this.usuarios.push({
      id: 0,
      email: 'admin@sirona.com',
      password: '12345',
      rol: 'admin'
    });

    //REcuperamos a los especialistas del servicio para crear a los usuarios con perfil de profesional
    const especialistas = this.especialistasService.getEspecialistas();

    // Creamos un usuario para cada especialista con rol 'profesional' 'recorreindo' el array de especialistas
    especialistas.forEach((e, i) => {
      this.usuarios.push({
        id: i + 1, // +1 para evitar el id 0 que es del admin
        email: e.email,
        password: '12345', // Contraseña por defecto para todos los profesionales
        rol: 'profesional',
        especialista: e // Asociamos el perfil del especialista al usuario
      });
    });
  }

  /**
   * Devuelve todos los usuarios
   */
  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  /**
   *  Devuelve un usuario por su email
   * @param email Email a buscar
   */
  getUsuarioPorEmail(email: string): Usuario | undefined {
    return this.usuarios.find(u => u.email === email);
  }

  /**
   *  Verifica si un usuario existe con ese email y contraseña (login)
   */
  autenticar(email: string, password: string): Usuario | undefined {
    return this.usuarios.find(u => u.email === email && u.password === password);
  }
}


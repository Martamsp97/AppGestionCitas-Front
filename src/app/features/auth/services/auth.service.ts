import { Injectable } from '@angular/core';
import { EspecialistasService } from '../../home/services/especialistas.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Almacenamos los usuarios disponibles para login
  usuarios: Usuario[] = [];

  // Usuario que ha iniciado sesión actualmente
  private usuarioActivo?: Usuario;

  constructor(private especialistasService: EspecialistasService) {
    // Creamos al usuario administrador por defecto
    this.usuarios.push({
      id: 0,
      email: 'admin@sirona.com',
      password: '12345',
      rol: 'admin'
    });
    this.cargarUsuariosProfesionales();

  }

  /**
   * Carga usuarios con rol "profesional" a partir del array
   * de especialistas disponibles en EspecialistasService.
   * 
   * 
   */
  cargarUsuariosProfesionales(): void {
    const especialistas = this.especialistasService.getEspecialistas();

    especialistas.forEach((e, i) => {
      // Evita duplicar usuarios si ya han sido creados
      const yaExiste = this.usuarios.find(u => u.email === e.email);
      if (!yaExiste) {
        this.usuarios.push({
          id: this.usuarios.length,
          email: e.email,
          password: '12345',
          rol: 'profesional',
          especialista: e
        });
      }
    });
  }

  /**
   * Devuelve todos los usuarios disponibles (admin y profesionales)
   */
  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  /**
   * Busca y devuelve un usuario por su email
   * @param email - email a buscar
   */
  getUsuarioPorEmail(email: string): Usuario | undefined {
    return this.usuarios.find(u => u.email === email);
  }

  /**
   * Intenta iniciar sesión con email y contraseña
   * @returns el usuario si coincide, undefined si no
   */
  login(email: string, password: string): Usuario | undefined {
    return this.usuarios.find(u => u.email === email && u.password === password);
  }

  /**
   * Guarda el usuario activo en memoria y en localStorage.
   * 
   * @param usuario Usuario que ha iniciado sesión.
   * 
   * Esto permite mantener la sesión incluso si se recarga la página,
   * porque el usuario se guarda en localStorage.
   */
  setUsuarioActivo(usuario: Usuario): void {
    this.usuarioActivo = usuario; // Guardamos en variable privada
    // Guardamos en localStorage serializado para persistencia
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
  }

  /**
   * Obtiene el usuario activo.
   * 
   * Primero comprueba si el usuario ya está en memoria (variable privada).
   * Si no está, intenta cargarlo desde localStorage y parsearlo.
   * Si no existe en localStorage, devuelve undefined.
   * 
   * @returns Usuario activo o undefined si no hay sesión iniciada.
   */
  getUsuarioActivo(): Usuario | undefined {
    if (!this.usuarioActivo) {
      // Intentamos recuperar usuario almacenado en localStorage
      const userStr = localStorage.getItem('usuarioActivo');
      if (userStr) {
        // Parseamos el JSON para convertirlo en objeto Usuario
        this.usuarioActivo = JSON.parse(userStr);
      }
    }
    return this.usuarioActivo;
  }

  /**
   * Cierra la sesión actual.
   * 
   * Borra el usuario activo tanto de la variable en memoria como de localStorage,
   * asegurando que la sesión quede completamente eliminada.
   */
  logout(): void {
    this.usuarioActivo = undefined;  // Limpiamos variable
    localStorage.removeItem('usuarioActivo');  // Borramos de localStorage
  }

}

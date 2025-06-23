import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

/**
 * ## AuthGuard  
 * Protege rutas privadas para profesionales.
 * Redirige al login si el usuario no está autenticado o no tiene el rol adecuado.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUsuarioActivo();

  if (user && user.rol === 'profesional') {
    return true;
  }

  // Si no está logueado o no es profesional, redirigir a la home
  router.navigate(['']);
  alert('Acceso denegado. Usuario no autenticado o sin rol profesional.');
  return false;
};


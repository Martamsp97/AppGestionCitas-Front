import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Ruta solicitada:', state.url);
    const usuarioStr = localStorage.getItem('usuarioActivo');
    console.log('Usuario en localStorage:', usuarioStr);
    if (!usuarioStr) {
      console.log('⛔ No hay usuario en localStorage. Redirigiendo a /login');
      this.router.navigate(['/login']);
      return false;
    }

    const usuario = JSON.parse(usuarioStr);
    console.log('Usuario parseado:', usuario);

    const isAdminRoute = state.url.startsWith('/dashboard/admin');
    const esAdmin = usuario?.rol?.toLowerCase() === 'admin';

    if (isAdminRoute && !esAdmin) {
      console.log('⛔ Ruta admin pero usuario no es admin. Redirigiendo a /');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}


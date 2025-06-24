import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialistasService } from '../home/services/especialistas.service';
import { AuthService } from '../auth/services/auth.service';
import { CitasService } from '../citas/services/citas.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Cita } from 'src/app/interfaces/cita.interface';

@Component({
  selector: 'app-dashboard-profesional',
  templateUrl: './dashboard-profesional.component.html',
  styleUrls: ['./dashboard-profesional.component.css']
})
export class DashboardProfesionalComponent implements OnInit {

  usuarioActivo?: Usuario;// Usuario cuyo perfil estamos mostrando
  citas: Cita[] = [];       // Lista de citas asociadas al especialista

  constructor(
    private especialistasService: EspecialistasService,
    private authService: AuthService,
    private citasService: CitasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el id del usuario de la URL
    const idStr = this.route.snapshot.paramMap.get('id');
    if (!idStr) return; // Si no hay id, salir

    const id = Number(idStr);

    // Obtener todos los usuarios para buscar el activo
    const usuarios = this.authService.getUsuarios();
    this.usuarioActivo = usuarios.find(u => u.id === id);

    // Si el usuario activo es profesional y tiene especialista, cargar sus citas
    if (this.usuarioActivo?.rol === 'profesional' && this.usuarioActivo.especialista) {
      this.citas = this.citasService.getCitasPorEspecialista(this.usuarioActivo.especialista.id);
    }
  }

  /**
   * Método que recibe el id del especialista a eliminar
   * Lo borra desde el servicio y actualiza la interfaz
   * @param id - id del especialista a borrar
   */
  eliminarEspecialista(id: number): void {
    const borrado = this.especialistasService.borrarEspecialista(id);
    if (borrado) {
      alert('Especialista borrado correctamente');
      // Aquí refresca o actualiza la UI si hace falta
      this.usuarioActivo!.especialista = undefined;  // quitamos el especialista del usuario actual para que no aparezca

      // Obtenemos el id del usuario admin logueado para redirigir
      const adminId = this.usuarioActivo?.id;
      if (adminId) {
        this.router.navigate([`/dashboard/admin/${adminId}`]);
      } else {
        // Si no hay admin logueado, por seguridad lo mandamos al login
        this.router.navigate(['/login']);
      }
    } else {
      alert('Error: No se pudo borrar el especialista.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CitasService } from '../citas/services/citas.service';
import { AuthService } from '../auth/services/auth.service';
import { Cita } from 'src/app/interfaces/cita.interface';
import { Usuario } from 'src/app/interfaces/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-profesional',
  templateUrl: './dashboard-profesional.component.html',
  styleUrls: ['./dashboard-profesional.component.css']
})
export class DashboardProfesionalComponent implements OnInit {

  //Array para guardar las citas del proofesional
  citas: Cita[] = [];
  usuarioActivo?: Usuario;
  //inyectamos los servicios de citas y autenticación
  constructor(
    private citasService: CitasService,
    private authService: AuthService,
    private route: ActivatedRoute,


  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene las citas del profesional autenticado si es un especialista.
   */
  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');

    if (!idStr) {
      console.warn('No ID en la URL');
      return;
    }

    const id = Number(idStr);


    const usuarios = this.authService.getUsuarios();


    this.usuarioActivo = usuarios.find(u => u.id === id);


    if (!this.usuarioActivo) {
      console.warn('No se encontró usuario con id:', id);
      return;
    }

    if (this.usuarioActivo.rol === 'profesional' && this.usuarioActivo.especialista) {
      this.citas = this.citasService.getCitasPorEspecialista(this.usuarioActivo.especialista.id);
    }
  }



}

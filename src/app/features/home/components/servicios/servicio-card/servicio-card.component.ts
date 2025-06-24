import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Servicio } from 'src/app/interfaces/servicio.interface';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router'
@Component({
  selector: 'app-servicio-card',
  templateUrl: './servicio-card.component.html',
  styleUrls: ['./servicio-card.component.css']
})
export class ServicioCardComponent {
  @Input() servicio!: Servicio;
  usuarioActivo?: Usuario;
  @Output() eliminarServicio = new EventEmitter<number>();

  constructor(private authService: AuthService, private router: Router) { }

  rutaEsAdmin = false;

  ngOnInit(): void {
    this.rutaEsAdmin = this.router.url.startsWith('/dashboard/admin');
  }

  editarServicio() {
    // Navega a la ruta de edición con el id del servicio
    this.router.navigate(['/dashboard/editar-servicio', this.servicio.id]);

  }

  //emite el id del servicio a eliminar
  borrar() {
    this.eliminarServicio.emit(this.servicio.id);
  }

}

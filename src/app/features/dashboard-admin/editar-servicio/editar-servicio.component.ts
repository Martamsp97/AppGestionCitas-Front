import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/features/home/services/servicios.service';
import { Servicio } from 'src/app/interfaces/servicio.interface';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  // Formulario reactivo que se inicializa al cargar el componente
  form!: FormGroup;
  // Servicio actual a editar
  servicio!: Servicio;

  user: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviciosService: ServiciosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {


    // Obtenemos el ID desde los parámetros de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const encontrado = this.serviciosService.getServicioPorId(id);

    // Si no existe el servicio, redirigimos
    if (!encontrado) {
      alert('Servicio no encontrado');
      this.router.navigate(['/dashboard/admin']);
      return;
    }

    this.servicio = structuredClone(encontrado);

    // Inicializamos el formulario con los datos actuales del servicio
    this.form = this.fb.group({
      nombre: [this.servicio.nombre, Validators.required],
      clave: [this.servicio.clave, Validators.required],
      duracion_minutos: [this.servicio.duracion_minutos, [Validators.required, Validators.min(1)]],
      precio: [this.servicio.precio, [Validators.required, Validators.min(0)]],
      descripcion: [this.servicio.descripcion || '']
    });
  }

  // Guarda los cambios al servicio
  guardar(): void {
    if (this.form.invalid) return;

    const datos = this.form.value;

    this.servicio.nombre = datos.nombre;
    this.servicio.clave = datos.clave;
    this.servicio.duracion_minutos = datos.duracion_minutos;
    this.servicio.precio = datos.precio;
    this.servicio.descripcion = datos.descripcion;

    const ok = this.serviciosService.actualizarServicio(this.servicio);

    if (!ok) {
      alert('Error al actualizar el servicio');
      return;
    }

    alert('Servicio actualizado correctamente');


    this.router.navigate(['']);

  }

  // Cancela y vuelve atrás
  cancelar(): void {

    this.router.navigate(['']);

  }
}

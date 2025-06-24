import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/features/home/services/servicios.service';
import { Servicio } from 'src/app/interfaces/servicio.interface';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  form!: FormGroup;
  user: Usuario | null | undefined = null;


  constructor(
    private fb: FormBuilder,
    private serviciosService: ServiciosService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuarioActivo();

    this.form = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      duracion_minutos: [30, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
  }

  crear(): void {
    if (this.form.invalid) return;

    const nuevoServicio: Servicio = {
      id: this.serviciosService.getNuevoId(),
      ...this.form.value
    };

    this.serviciosService.crearServicio(nuevoServicio);

    alert('Servicio creado correctamente');
    this.router.navigate([`/dashboard/admin/${this.user?.id ?? ''}`]);
  }

  cancelar(): void {
    this.router.navigate([`/dashboard/admin/${this.user?.id ?? ''}`]);
  }
}

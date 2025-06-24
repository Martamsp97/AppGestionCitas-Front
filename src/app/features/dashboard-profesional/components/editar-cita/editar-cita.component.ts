import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from 'src/app/features/citas/services/citas.service';
import { Cita } from 'src/app/interfaces/cita.interface';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
})
export class EditarCitaComponent implements OnInit {
  form!: FormGroup;
  cita!: Cita;
  errorSolapamiento = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private citaService: CitasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const citas = this.citaService.getCitas(); // o localStorage directamente
    const cita = citas.find((c: Cita) => c.id === id);

    if (!cita) {
      alert('Cita no encontrada');
      this.router.navigate(['']);
      return;
    }

    this.cita = cita;

    this.form = this.fb.group({
      cliente_nombre: [cita.cliente_nombre, Validators.required],
      cliente_telefono: [cita.cliente_telefono, Validators.required],
      cliente_email: [cita.cliente_email],
      fecha: [this.formatDateOnly(cita.inicio), Validators.required],
      horaInicio: [this.formatTimeOnly(cita.inicio), Validators.required],
      horaFin: [this.formatTimeOnly(cita.fin), Validators.required],
      notas_cliente: [cita.notas_cliente],
      notas_profesional: [cita.notas_profesional],
      estado: [cita.estado, Validators.required],
      servicio: [cita.servicio.nombre, Validators.required],
      especialista: [cita.especialista, Validators.required],
    });
  }

  guardarCita(): void {
    const formValue = this.form.value;

    const fecha = formValue.fecha;
    const horaInicio = formValue.horaInicio;
    const horaFin = formValue.horaFin;

    const inicio = new Date(`${fecha}T${horaInicio}`);
    const fin = new Date(`${fecha}T${horaFin}`);

    if (this.citaService.haySolapamiento(inicio.toISOString(), fin.toISOString(), this.cita.id)) {
      this.errorSolapamiento = true;
      return;
    }

    const citaEditada: Cita = {
      ...this.cita,
      ...formValue,
      inicio,
      fin,
    };

    this.citaService.actualizarCita(citaEditada);
    const user = this.authService.getUsuarioActivo(); // o donde sea que guardes esto
    alert('✅ Cita guardada exitosamente');

    if (user?.rol === 'admin') {
      this.router.navigate([`/dashboard/admin/${user.id}`]);
    } else if (user?.rol === 'profesional') {
      this.router.navigate([`/dashboard/profesional/${user.id}`]);
    } else {
      this.router.navigate(['/']);
    }

  }


  onCancelar(): void {
    this.router.navigate(['']);
  }
  formatDateOnly(date: Date): string {
    return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  }

  formatTimeOnly(date: Date): string {
    return date.toTimeString().slice(0, 5); // "HH:MM"
  }

}

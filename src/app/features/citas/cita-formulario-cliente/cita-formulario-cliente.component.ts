import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '../services/citas.service'
import { Cita } from '../../../interfaces/cita.interface';

@Component({
  selector: 'app-cita-formulario-cliente',
  templateUrl: './cita-formulario-cliente.component.html',
  styleUrls: ['./cita-formulario-cliente.component.css']
})
export class CitaFormularioClienteComponent implements OnInit {
  cita: Partial<Cita> = {};
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const state = history.state;
    if (state && state.cita) {
      this.cita = state.cita;
    } else {
      const local = localStorage.getItem('citaParcial');
      if (local) {
        this.cita = JSON.parse(local);
      } else {
        alert('No hay datos de cita.');
        this.router.navigate(['/citas']);
        return;
      }
    }
    this.formGroup = this.fb.group({
      cliente_nombre: ['', Validators.required],
      cliente_telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      cliente_email: ['', Validators.email],
      notas_cliente: ['']
    });
  }
  onSubmit(): void {
    if (this.formGroup.invalid || !this.cita) {
      alert('Faltan datos por completar.');
      return;
    }

    const citaCompleta: Cita = {
      ...this.cita,
      ...this.formGroup.value,
      estado: 'pendiente',
      notas_profesional: '',
    };

    // Guardar en localStorage
    const citasGuardadas = JSON.parse(localStorage.getItem('citas') || '[]');
    const citaReducida = {
      ...citaCompleta,
      especialista: {
        id: citaCompleta.especialista?.id,
        nombre: citaCompleta.especialista?.nombre,
        apellidos: citaCompleta.especialista?.apellidos,
        email: citaCompleta.especialista?.email,
        servicios_asignados: citaCompleta.especialista?.servicios_asignados,
      },
      servicio: {
        id: citaCompleta.servicio?.id,
        nombre: citaCompleta.servicio?.nombre,
        duracion: citaCompleta.servicio?.duracion_minutos
      }
    };

    citasGuardadas.push(citaReducida);
    localStorage.setItem('citas', JSON.stringify(citasGuardadas));

    //  Confirmación y redirección
    alert('¡Tu cita ha sido reservada correctamente!');
    this.router.navigate(['/']);
  }
}

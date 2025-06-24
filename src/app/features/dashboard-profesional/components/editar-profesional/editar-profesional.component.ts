import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { EspecialistasService } from 'src/app/features/home/services/especialistas.service';
import { ServiciosService } from 'src/app/features/home/services/servicios.service';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Servicio } from 'src/app/interfaces/servicio.interface';

@Component({
  selector: 'app-editar-profesional',
  templateUrl: './editar-profesional.component.html',
  styleUrls: ['./editar-profesional.component.css']
})
export class EditarProfesionalComponent {

  // Formulario reactivo para editar los datos del profesional
  form!: FormGroup;

  // Especialista que se está editando
  especialista!: Especialista;

  // Lista de todos los servicios disponibles en el centro
  todosLosServicios: Servicio[] = [];

  // Inyección de dependencias necesarias para la edición
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private especialistasService: EspecialistasService,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    // Obtenemos el ID del especialista desde la URL
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = Number(idStr);

    // Recuperamos el especialista a editar
    const encontrado = this.especialistasService.getEspecialistaPorId(id);
    if (!encontrado) {
      alert('Especialista no encontrado');
      this.router.navigate(['/dashboard/admin']);
      return;
    }

    // Clonamos el especialista original para no modificar directamente el original
    this.especialista = structuredClone(encontrado);

    // Cargamos todos los servicios disponibles para mostrarlos como checkboxes
    this.todosLosServicios = this.serviciosService.getServicios();

    // Creamos el formulario reactivo, inicializando campos con los datos del especialista
    this.form = this.fb.group({
      nombre: [this.especialista.nombre, Validators.required],
      apellidos: [this.especialista.apellidos, Validators.required],
      email: [this.especialista.email, [Validators.required, Validators.email]],
      telefono: [this.especialista.telefono, Validators.required],
      foto_url: [this.especialista.foto_url || '', Validators.required],
      horarioInicio: [this.especialista.horario[0]?.hora_inicio || '', Validators.required],
      horarioFin: [this.especialista.horario[0]?.hora_fin || '', Validators.required],
      servicios_asignados: this.fb.array(
        this.todosLosServicios.map(servicio =>
          this.fb.control(this.especialista.servicios_asignados.some(s => s.id === servicio.id))
        )
      )
    });
  }

  // Método para guardar los cambios realizados en el formulario
  guardarCambios(): void {
    if (this.form.invalid) return;

    const datos = this.form.value;

    // Actualizamos los datos básicos del especialista
    this.especialista.nombre = datos.nombre;
    this.especialista.apellidos = datos.apellidos;
    this.especialista.email = datos.email;
    this.especialista.telefono = datos.telefono;
    this.especialista.foto_url = datos.foto_url;
    // Actualizamos el horario del especialista
    this.especialista.horario[0].hora_inicio = datos.horarioInicio;
    this.especialista.horario[0].hora_fin = datos.horarioFin;

    // Extraemos los servicios seleccionados desde el FormArray
    const serviciosSeleccionados = datos.servicios_asignados
      .map((checked: boolean, i: number) => checked ? this.todosLosServicios[i] : null)
      .filter((s: Servicio | null) => s !== null) as Servicio[];

    this.especialista.servicios_asignados = serviciosSeleccionados;

    // Guardamos el especialista actualizado
    const ok = this.especialistasService.actualizarEspecialista(this.especialista);

    if (!ok) {
      alert('Error al guardar los cambios');
      return;
    }

    alert('Especialista actualizado');
    this.router.navigate(['/dashboard/profesional', this.especialista.id]);
  }

  // Método para cancelar y volver al perfil del especialista
  cancelar(): void {
    this.router.navigate(['/dashboard/profesional', this.especialista.id]);
  }
}


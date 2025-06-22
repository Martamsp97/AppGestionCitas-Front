import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspecialistasService } from 'src/app/features/home/services/especialistas.service';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Servicio } from 'src/app/interfaces/servicio.interface';

@Component({
  selector: 'app-filtro-servicios',
  templateUrl: './filtro-servicios.component.html',
  styleUrls: ['./filtro-servicios.component.css']
})
export class FiltroServiciosComponent {
  serviciosEspecialista: Servicio[] = [];
  especialistaId: number | null = null;
  @Output() servicioSeleccionado = new EventEmitter<Servicio>();

  constructor(
    private route: ActivatedRoute,
    private especialistasService: EspecialistasService
  ) { }


  ngOnInit(): void {
    const especialistaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(especialistaId)) {
      const especialista = this.especialistasService.getEspecialistas()
        .find(e => e.id === especialistaId);

      if (especialista) {
        this.serviciosEspecialista = especialista.servicios_asignados || [];
      }
    }
  }

  onSelectServicio(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (!value) return;

    const parsedId = parseInt(value, 10);
    if (!isNaN(parsedId)) {
      const servicio = this.serviciosEspecialista.find(s => s.id === parsedId);
      if (servicio) {
        this.servicioSeleccionado.emit(servicio);
      }
    }
  }
}

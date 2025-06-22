import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspecialistasService } from 'src/app/features/home/services/especialistas.service';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Servicio } from 'src/app/interfaces/servicio.interface';



@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  //Creamos las propiedades necesarias para almacenar los especialistas, los servicios y el id seleccionado. Lo tipamos con su interfaz correspondiente.
  especialistas: Especialista[] = [];
  servicios: Servicio[] = [];
  // Esta propiedad se usará para almacenar el id del especialista seleccionado en el filtro
  selectedId: number | null = null;

  //Emitimos el id del especialista seleccionado
  @Output() especialistaSeleccionado = new EventEmitter<Especialista>();


  //Traemos el servicio de especialistas y lo inicializamos en el ngOnInit para obtener la lista de especialistas ty asignar los valores necesarios para el filtro
  constructor(
    private route: ActivatedRoute,
    private especialistasService: EspecialistasService

  ) { }

  //Inicializamos el componente y obtenemos los especialistas del servicio
  ngOnInit() {
    // Obtenemos el ID del servicio desde la ruta
    const servicioId = Number(this.route.snapshot.paramMap.get('id'));
    // Obtenemos todos los especialistas
    const todosLosEspecialistas = this.especialistasService.getEspecialistas();
    // Filtramos los especialistas que tienen asignado el servicio con el ID obtenido
    this.especialistas = todosLosEspecialistas.filter(especialista =>
      especialista.servicios_asignados.some(servicio => servicio.id === servicioId)
    );
  }

  //Función para manejar el cambio de selección del especialista
  // Esta función recibe el id del especialista seleccionado, lo convierte a número y lo emite si es válido

  handleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (!value) return; // Nos aseguramos de que el valor no sea nulo o indefinido
    // Convertimos el valor a número y verificamos si es un número válido

    const parsedId = parseInt(value);
    if (!isNaN(parsedId)) {
      this.selectedId = parsedId;
      const especialista = this.especialistas.find(e => e.id === parsedId);
      if (especialista) {
        this.especialistaSeleccionado.emit(especialista);
      }

    }
  }
}


import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Especialista } from '../../../../interfaces/especialista.interface';
import { EspecialistasService } from '../../services/especialistas.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Usuario } from 'src/app/interfaces/usuario'
import { Router } from '@angular/router';


@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css']
})
export class EspecialistasComponent implements OnInit {

  // Definimos una propiedad especialistas que será un array de objetos Especialista
  especialistas: Especialista[] = [];

  busquedaEspecialista: string = '';
  especialistasFiltradosArray: Especialista[] = [];

  // Inyectamos el servicio EspecialistasService en el constructor para poder acceder a los especialistas
  constructor(private especialistasService: EspecialistasService, private authService: AuthService,
    private router: Router) { }

  // Definimos un método normalizarTexto que recibe un texto y lo normaliza
  // Este método elimina los signos diacríticos (tildes), convierte a minúsculas y elimina espacios al inicio y al final
  //Evita problemas de búsqueda al comparar nombres con tildes o mayúsculas
  private normalizarTexto(texto: string): string {
    return texto
      .normalize('NFD')               // descompone letras con tildes
      .replace(/[\u0300-\u036f]/g, '') // elimina los signos diacríticos (tildes)
      .toLowerCase()
      .trim();
  }


  // Implementamos el método ngOnInit para inicializar el componente
  // Aquí llamamos al método getEspecialistas del servicio EspecialistasService para obtener la lista de especialistas
  // Llamamos al método filtrarEspecialistas para inicializar el array de especialistas filtrados
  ngOnInit() {
    this.especialistas = this.especialistasService.getEspecialistas();
    this.especialistasFiltradosArray = this.especialistas;
  }

  // Definimos un método filtrarEspecialistas que recibe un valor de búsqueda
  // Este método filtra los especialistas según el nombre o apellidos que coincidan con el valor de búsqueda
  filtrarEspecialistas(valor: string): void {
    const filtro = this.normalizarTexto(valor);

    this.especialistasFiltradosArray = this.especialistas.filter(e => {
      const nombreCompleto = this.normalizarTexto(`${e.nombre} ${e.apellidos}`);
      return nombreCompleto.includes(filtro);
    });
  }

}

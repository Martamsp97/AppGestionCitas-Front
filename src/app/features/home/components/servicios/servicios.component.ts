import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../../../interfaces/servicio.interface';
import { ServiciosService } from '../../services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})

//Importamos OnInit para inicializar el componente y traer los servicios al cargar la página
//Importamos Servicio para definir el tipo de datos que vamos a manejar
//Importamos ServiciosService para acceder a los servicios definidos en el servicio

export class ServiciosComponent implements OnInit {

  // Definimos una propiedad servicios que será un array de objetos Servicio
  servicios: Servicio[] = [];
  rutaEsAdmin = false;
  busquedaServicio: string = '';
  serviciosFiltradosArray: Servicio[] = [];
  // Inyectamos el servicio ServiciosService en el constructor para poder acceder a los servicios
  constructor(private serviciosService: ServiciosService, private router: Router) { }

  // Implementamos el método ngOnInit para inicializar el componente
  // Aquí llamamos al método getServicios del servicio ServiciosService para obtener la lista de servicios
  //Llamamos al método filtrarServicios para inicializar el array de servicios filtrados
  ngOnInit() {
    this.servicios = this.serviciosService.getServicios();
    this.serviciosFiltradosArray = this.servicios;
    this.rutaEsAdmin = this.router.url.startsWith('/dashboard/admin');
  }

  // Definimos un método filtrarServicios que recibe un valor de búsqueda
  // Este método filtra los servicios según la clave del servicio que coincida con el valor de búsqueda
  // Utilizamos el método trim para eliminar espacios al inicio y al final, toLowerCase para convertir a minúsculas
  // y replace para reemplazar espacios por guiones
  filtrarServicios(valor: string): void {
    const clave = valor.trim().toLowerCase();
    this.serviciosFiltradosArray = this.servicios.filter(servicio =>
      servicio.clave.toLowerCase().includes(clave)
    );
  }

}

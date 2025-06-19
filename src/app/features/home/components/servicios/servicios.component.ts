import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../../../interfaces/servicio.interface';
import { ServiciosService } from '../../services/servicios.service';

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

  // Inyectamos el servicio ServiciosService en el constructor para poder acceder a los servicios
  constructor(private serviciosService: ServiciosService) { }

  // Implementamos el método ngOnInit para inicializar el componente
  // Aquí llamamos al método getServicios del servicio ServiciosService para obtener la lista de servicios
  ngOnInit() {
    this.servicios = this.serviciosService.getServicios();
  }

}

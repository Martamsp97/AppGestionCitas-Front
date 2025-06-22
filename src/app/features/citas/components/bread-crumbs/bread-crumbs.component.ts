import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css']
})
export class BreadCrumbsComponent implements OnInit {

  rutaActual: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.rutaActual = event.urlAfterRedirects;
    });
  }

  ngOnInit(): void {
    // Igual que en constructor, para detectar cambios de ruta después de la inicialización
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.rutaActual = event.urlAfterRedirects;
    });
  }

  esPaso1Activo(): boolean {
    return this.rutaActual.startsWith('/citas/servicio') || this.rutaActual.startsWith('/citas/especialista');
  }

  esPaso2Activo(): boolean {
    return this.rutaActual.startsWith('/citas/datos-cliente');
  }
}

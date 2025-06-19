import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { EspecialistasComponent } from './components/especialistas/especialistas.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServicioCardComponent } from './components/servicios/servicio-card/servicio-card.component';
import { EspecialistaCardComponent } from './components/especialistas/especialista-card/especialista-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    EspecialistasComponent,
    ServiciosComponent,
    ServicioCardComponent,
    EspecialistaCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

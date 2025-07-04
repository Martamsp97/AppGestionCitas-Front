import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ServiciosComponent } from '../features/home/components/servicios/servicios.component';
import { EspecialistasComponent } from '../features/home/components/especialistas/especialistas.component';
import { ServicioCardComponent } from '../features/home/components/servicios/servicio-card/servicio-card.component';
import { EspecialistaCardComponent } from '../features/home/components/especialistas/especialista-card/especialista-card.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ServiciosComponent,
    EspecialistasComponent,
    ServicioCardComponent,
    EspecialistaCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ServiciosComponent,
    EspecialistasComponent,
    ServicioCardComponent,
    EspecialistaCardComponent
  ]
})
export class SharedModule { }

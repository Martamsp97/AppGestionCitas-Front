import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasDesdeEspecialistaComponent } from './pages/citas-desde-especialista/citas-desde-especialista.component';
import { CitasDesdeServicioComponent } from './pages/citas-desde-servicio/citas-desde-servicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitasComponent } from './citas/citas.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { CalendarioComponent } from './components/calendario/calendario.component';


@NgModule({
  declarations: [
    // Aquí se declaran los componentes que pertenecen a este módulo.
    // Por ejemplo, si tienes componentes como CitasDesdeServicioComponent y CitasDesdeEspecialistaComponent,
    CitasDesdeEspecialistaComponent,
    CitasDesdeServicioComponent,
    CitasComponent,
    BreadCrumbsComponent,
    FiltroComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CitasModule { }

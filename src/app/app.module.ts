import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CitasComponent } from './features/citas/pages/citas/citas.component';
import { CitasDesdeServicioComponent } from './features/citas/pages/citas-desde-servicio/citas-desde-servicio.component';
import { CitasDesdeEspecialistaComponent } from './features/citas/pages/citas-desde-especialista/citas-desde-especialista.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CitasComponent,
    CitasDesdeServicioComponent,
    CitasDesdeEspecialistaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

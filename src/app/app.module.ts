import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegistroComponent } from './features/auth/pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardProfesionalComponent } from './features/dashboard-profesional/dashboard-profesional.component';
import { DashboardAdminComponent } from './features/dashboard-admin/dashboard-admin.component';
import { CitasProfesionalComponent } from './features/dashboard-profesional/components/citas-profesional/citas-profesional.component';
import { InfoProfesionalComponent } from './features/dashboard-profesional/components/info-profesional/info-profesional.component';
import { CardCitaComponent } from './features/dashboard-profesional/components/citas-profesional/card-cita/card-cita.component';
import { EditarCitaComponent } from './features/dashboard-profesional/components/editar-cita/editar-cita.component';

import { SharedModule } from './shared/shared.module';
import { EditarProfesionalComponent } from './features/dashboard-profesional/components/editar-profesional/editar-profesional.component';  // Importar SharedModule

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    DashboardProfesionalComponent,
    DashboardAdminComponent,
    CitasProfesionalComponent,
    InfoProfesionalComponent,
    CardCitaComponent,
    EditarCitaComponent,
    EditarProfesionalComponent,
    // OJO: ya no declaramos ServiciosComponent ni EspecialistasComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule  // Importar SharedModule para usar sus componentes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


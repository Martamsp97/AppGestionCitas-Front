import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegistroComponent } from './features/auth/pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './features/pages/dashboard/admin-dashboard/admin-dashboard.component';
import { ProfesionalDashboardComponent } from './features/pages/dashboard/profesional-dashboard/profesional-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    AdminDashboardComponent,
    ProfesionalDashboardComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

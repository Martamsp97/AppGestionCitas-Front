import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardProfesionalComponent } from './features/dashboard-profesional/dashboard-profesional.component';
import { DashboardAdminComponent } from './features/dashboard-admin/dashboard-admin.component';
import { EditarCitaComponent } from './features/dashboard-profesional/components/editar-cita/editar-cita.component';


//Rutas principales de la aplicación. Se cargan al incicio. Sirven para navegar entre las diferentes secciones de la app.
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Lazy loading de los módulos de la aplicación. Se cargan bajo demanda, no al inicio de la aplicación.
  // Esto mejora el rendimiento de la aplicación al reducir el tamaño del bundle inicial.
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'citas',
    loadChildren: () =>
      import('./features/citas/citas.module').then(m => m.CitasModule)
  },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    children: [
      { path: 'admin/:id', component: DashboardAdminComponent, canActivate: [AuthGuard] },
      { path: 'profesional/:id', component: DashboardProfesionalComponent, },
      { path: 'editar-cita/:id', component: EditarCitaComponent },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

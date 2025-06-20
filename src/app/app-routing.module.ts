import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Rutas principales de la aplicación. Se cargan al incicio. Sirven para navegar entre las diferentes secciones de la app.
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

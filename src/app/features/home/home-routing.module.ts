import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

// Rutas específicas del módulo Home. Se cargan al navegar a la sección Home.
// Esta configuración permite que el componente HomeComponent se muestre como la ruta base gracias a ('') 
const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

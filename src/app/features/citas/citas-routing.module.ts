import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasDesdeServicioComponent } from './pages/citas-desde-servicio/citas-desde-servicio.component';
import { CitasDesdeEspecialistaComponent } from './pages/citas-desde-especialista/citas-desde-especialista.component';
import { CitaFormularioClienteComponent } from './cita-formulario-cliente/cita-formulario-cliente.component';
// Rutas del módulo de citas. Se cargan bajo demanda.
// Estas rutas permiten navegar a las páginas de citas desde un servicio o un especialista específico.
const routes: Routes = [
  { path: 'servicio/:id', component: CitasDesdeServicioComponent },
  { path: 'especialista/:id', component: CitasDesdeEspecialistaComponent },
  { path: 'datos-cliente', component: CitaFormularioClienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }

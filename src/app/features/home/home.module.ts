import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

// Importa SharedModule
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent  // Solo declaras el HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule  // Importas SharedModule para poder usar los componentes compartidos
  ]
})
export class HomeModule { }


import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Especialista } from 'src/app/interfaces/especialista.interface';

@Component({
  selector: 'app-especialista-card',
  templateUrl: './especialista-card.component.html',
  styleUrls: ['./especialista-card.component.css']
})
export class EspecialistaCardComponent {
  @Input() especialista!: Especialista;

  rutaEspecialista: string[] = [];

  constructor(
    private authService: AuthService, private router: Router

  ) { }

  //Método para saber a qué ruta voy a navegar. Si accedes desde el dashboard admin, la ruta será diferente a si accedes desde la parte pública o el dashboard profesional
  ngOnInit(): void {
    const urlActual = this.router.url;

    const esDesdeAdmin = urlActual.includes('/dashboard/admin');
    this.rutaEspecialista = esDesdeAdmin
      ? ['/dashboard/profesional', String(this.especialista.id)]
      : ['/citas/especialista', String(this.especialista.id)];
  }
}

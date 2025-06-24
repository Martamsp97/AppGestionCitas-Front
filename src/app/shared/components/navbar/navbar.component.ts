import { Component } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: Usuario | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuarioActivo() ?? null;
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
  }

}

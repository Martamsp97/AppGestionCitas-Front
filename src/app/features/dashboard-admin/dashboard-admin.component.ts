import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  /*   constructor(private router: Router) { }
  
    ngOnInit() {
      const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
      if (!usuario || usuario.rol !== 'admin') {
        this.router.navigate(['/']);
      }
    } */
}

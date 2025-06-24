import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '../citas/services/citas.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private citasService: CitasService) {
    (window as any).citasService = this.citasService;
  }

  ngOnInit(): void {
    console.log('DashboardAdminComponent cargado');
  }
}

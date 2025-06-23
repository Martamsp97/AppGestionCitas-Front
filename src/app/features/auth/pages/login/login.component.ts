import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // o .scss si usas
})
export class LoginComponent implements OnInit {

  // FormGroup que contiene los controles del formulario reactivo: email y password
  loginForm!: FormGroup;

  // Variable para almacenar mensajes de error y mostrarlos en la UI
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,  // Inyección de FormBuilder para crear formularios reactivos
    private authService: AuthService,  // Servicio que maneja la lógica de login
    private router: Router  // Para redirigir tras login exitoso
  ) { }

  ngOnInit(): void {
    // Inicializamos el formulario con dos controles:
    // email: requerido y validación de email válida
    // password: requerido y longitud mínima 5 caracteres
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });


  }

  /**
   * Función que se ejecuta al enviar el formulario de login.
   * Llama al servicio de autenticación y maneja la respuesta.
   */
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Por favor, rellena todos los campos correctamente.';
      return;
    }

    const { email, password } = this.loginForm.value;

    // 1. Carga profesionales antes del login
    this.authService.cargarUsuariosProfesionales();

    // 2. Intento login
    const user = this.authService.login(email, password);

    console.log('Usuario encontrado:', user); // Para debug

    if (user) {
      this.authService.setUsuarioActivo(user);
      alert('¡Has iniciado sesión correctamente!');
      if (user.rol === 'admin') {
        this.router.navigate(['/dashboard/admin', user.id]);
      } else if (user.rol === 'profesional') {
        this.router.navigate(['/dashboard/profesional', user.id]);
      }
    } else {
      this.errorMsg = 'Email o contraseña incorrectos.';
    }
  }




}

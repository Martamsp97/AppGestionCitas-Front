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
      // Si el formulario no es válido, mostramos error y no seguimos
      this.errorMsg = 'Por favor, rellena todos los campos correctamente.';
      return;
    }

    // Obtenemos email y password desde el formulario
    const { email, password } = this.loginForm.value;

    // Llamamos al servicio para intentar autenticar
    const user = this.authService.login(email, password);

    if (user) {
      alert('¡Has iniciado sesión correctamente!');
      // Login correcto: redirigir a dashboard u otra ruta
      this.router.navigate(['']);

    } else {
      // Login incorrecto: mostrar mensaje de error
      this.errorMsg = 'Email o contraseña incorrectos.';
    }

    //Redirigimos al dasboard-admin o dashboard-profesional según el rol del usuario
    if (user?.rol === 'admin') {
      this.router.navigate(['/dashboard/admin']);
    } else {
      this.router.navigate(['/dashboard/profesional']);
    }
  }

}

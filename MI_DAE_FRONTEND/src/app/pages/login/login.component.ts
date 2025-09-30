import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  // Modelo para el formulario
  loginData: LoginRequest = {
    correo: '',
    clave: ''
  };

  // Estados del componente
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si ya está logueado, redirigir según el rol
    if (this.authService.isAuthenticated()) {
      this.authService.redirectBasedOnRole();
    }
  }

  /**
   * Manejar el envío del formulario
   */
  onSubmit(): void {
    this.errorMessage = '';

    // Validaciones básicas
    if (!this.loginData.correo || !this.loginData.clave) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    // Validar formato de correo INACAP
    if (!this.loginData.correo.includes('@inacapmail.cl')) {
      this.loginData.correo += '@inacapmail.cl';
    }

    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        
        // Redirigir según el rol
        this.authService.redirectBasedOnRole();
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        
        // Manejar diferentes tipos de error
        if (error.code === 'INVALID_CREDENTIALS') {
          this.errorMessage = 'Credenciales inválidas. Verifique su correo y contraseña.';
        } else {
          this.errorMessage = error.error || 'Error de conexión. Intente nuevamente.';
        }
      }
    });
  }

  /**
   * Alternar visibilidad de contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Limpiar mensaje de error
   */
  clearError(): void {
    this.errorMessage = '';
  }
}

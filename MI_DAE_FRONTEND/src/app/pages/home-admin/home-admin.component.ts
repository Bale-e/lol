import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistroBusesService } from '../../services/registroBuses.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-home-admin',
  imports: [CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private registroBusesService: RegistroBusesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener información del usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Método para navegar a registro-buses y refrescar los datos
  irARegistroBuses(): void {
    // Navegamos a la ruta de registro-buses
    this.router.navigate(['/admin/registro-buses']).then(() => {
      // Esperamos un momento para que la vista se cargue
      setTimeout(() => {
        // Forzamos una recarga de los datos haciendo una nueva petición al servicio
        // Esto simula presionar el botón "Refrescar" del componente registro-buses
        this.registroBusesService.getRegistrosBuses().subscribe({
          next: (response) => {
            console.log('Datos recargados automáticamente desde home-admin:', response);
            // Emitimos un evento personalizado para notificar al componente registro-buses
            window.dispatchEvent(new CustomEvent('recargarRegistrosBuses'));
          },
          error: (err) => {
            console.error('Error al recargar datos desde home-admin:', err);
          }
        });
      }, 500);
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
  }
}

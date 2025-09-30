import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="admin-navbar">
      <div class="navbar-brand">
        <img src="https://i.imgur.com/czqkLGv.png" alt="MI-DAE Logo" class="logo">
        <span class="brand-text">Panel de Administración</span>
      </div>
      
      <div class="navbar-menu">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="nav-link" [class.active]="isActiveRoute('/admin/home')" (click)="navigateTo('/admin/home')">
              <i class="icon-home"></i>
              Inicio
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" [class.active]="isActiveRoute('/admin/registro-buses')" (click)="navigateTo('/admin/registro-buses')">
              <i class="icon-bus"></i>
              Registro de Buses
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" [class.active]="isActiveRoute('/admin/noticias-admin')" (click)="navigateTo('/admin/noticias-admin')">
              <i class="icon-news"></i>
              Noticias Admin
            </button>
          </li>
        </ul>
      </div>
      
      <div class="navbar-user">
        @if (currentUser) {
          <div class="user-info">
            <span class="user-name">{{ currentUser.nombres }} {{ currentUser.apellidos }}</span>
            <span class="user-role">Administrador</span>
          </div>
        }
        <button class="logout-btn" (click)="logout()" title="Cerrar sesión">
          <i class="logout-icon">🚪</i>
          Salir
        </button>
      </div>
    </nav>
  `,
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logout();
  }
}
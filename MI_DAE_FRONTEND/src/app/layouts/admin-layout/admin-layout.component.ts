import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AdminNavbarComponent],
  template: `
    <div class="app-container">
      <!-- Navbar de administrador -->
      <app-admin-navbar></app-admin-navbar>

      <!-- Contenido principal con navbar de admin -->
      <main class="main-content with-admin-navbar">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['../../app.css', './admin-layout.component.css']
})
export class AdminLayoutComponent {
}
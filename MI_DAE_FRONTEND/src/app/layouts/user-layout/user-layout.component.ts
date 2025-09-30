import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../pages/navbar/navbar.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  template: `
    <div class="app-container">
      <!-- Navbar para usuarios -->
      <app-navbar></app-navbar>

      <!-- Contenido principal con navbar -->
      <main class="main-content with-navbar">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="app-footer with-navbar">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="footer-dot"></span>
            <span class="footer-text">Mi DAE</span>
          </div>
          <div class="footer-links">
            <a href="#" class="footer-link">Términos</a>
            <a href="#" class="footer-link">Privacidad</a>
            <a href="#" class="footer-link">Contacto</a>
          </div>
          <div class="footer-copyright">
            <p>&copy; 2025 Mi DAE. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['../../app.css']
})
export class UserLayoutComponent {
}
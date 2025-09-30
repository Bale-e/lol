import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = false; // estado del sidebar (desktop)
  mobileOpen = false; // estado del menú móvil
  currentUser: User | null = null;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener información del usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleCollapse() { 
    this.collapsed = !this.collapsed; 
  }
  
  toggleMobile() { 
    this.mobileOpen = !this.mobileOpen; 
  }
  
  closeMobile() { 
    this.mobileOpen = false; 
  }

  // Método para cerrar sesión correctamente
  logout(): void {
    this.closeMobile(); // Cerrar menú móvil si está abierto
    this.authService.logout(); // Usar el servicio de auth para logout
  }
  
  // Para compatibilidad con código existente
  get open() { return this.mobileOpen; }
  toggle() { this.toggleMobile(); }
  close() { this.closeMobile(); }
}
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    } else {
      // Si no es admin, redirigir al home normal o al login
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}

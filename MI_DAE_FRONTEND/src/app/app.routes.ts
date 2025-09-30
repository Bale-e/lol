import { Routes } from '@angular/router';

// Componentes usuario
import { Home } from './pages/home/home.component';
import { ReservasComponent } from './pages/reservas-cancha/reservas-cancha.component';
import { ClubesComponentTs } from './pages/clubes/clubes.component';
import { Equipos } from './pages/equipos/equipos.component';
import { Espacio } from './pages/espacio/espacio.component';
import { ImplementosComponent } from './pages/implementos/implementos.component';
import { SeleccionarEspacioComponent } from './pages/seleccion-espacio/seleccion-espacio.component';
import { Talleres } from './pages/talleres/talleres.component';
import { Noticias } from './pages/noticias/noticias.component';
import { VidaEstudiantil } from './pages/vida-estudiantil/vida-estudiantil.component';
import { ReservaTakaTaka } from './pages/reserva-taka-taka/reserva-taka-taka.component';
import { ReservaPingPong } from './pages/reserva-ping-pong/reserva-ping-pong.component';

// Componentes admin
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { RegistroBuses } from './pages/registro-buses/registro-buses.component';
import { NoticiasAdmin } from './pages/noticias-admin/noticias-admin.component';

// Login
import { LoginComponent } from './pages/login/login.component';

// Layouts
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Rutas usuario con layout
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'reservas-cancha', component: ReservasComponent },
      { path: 'clubes', component: ClubesComponentTs },
      { path: 'equipos', component: Equipos },
      { path: 'espacio', component: Espacio },
      { path: 'implementos', component: ImplementosComponent },
      { path: 'seleccion-espacio', component: SeleccionarEspacioComponent },
      { path: 'talleres', component: Talleres },
      { path: 'noticias', component: Noticias },
      { path: 'vida-estudiantil', component: VidaEstudiantil },
      { path: 'reserva-taka-taka', component: ReservaTakaTaka },
      { path: 'reserva-ping-pong', component: ReservaPingPong }
    ]
  },

  // Rutas admin con layout
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeAdminComponent },
      { path: 'registro-buses', component: RegistroBuses },
      { path: 'noticias-admin', component: NoticiasAdmin }
    ]
  },

  // Legacy / compatibilidad
  { path: 'home', redirectTo: 'user/home', pathMatch: 'full' },
  { path: 'home-admin', redirectTo: 'admin/home', pathMatch: 'full' },
  { path: 'reservas-cancha', redirectTo: 'user/reservas-cancha', pathMatch: 'full' },
  { path: 'clubes', redirectTo: 'user/clubes', pathMatch: 'full' },
  { path: 'equipos', redirectTo: 'user/equipos', pathMatch: 'full' },
  { path: 'espacio', redirectTo: 'user/espacio', pathMatch: 'full' },
  { path: 'implementos', redirectTo: 'user/implementos', pathMatch: 'full' },
  { path: 'seleccion-espacio', redirectTo: 'user/seleccion-espacio', pathMatch: 'full' },
  { path: 'talleres', redirectTo: 'user/talleres', pathMatch: 'full' },
  { path: 'registro-buses', redirectTo: 'admin/registro-buses', pathMatch: 'full' },
  { path: 'noticias', redirectTo: 'user/noticias', pathMatch: 'full' },
  { path: 'vida-estudiantil', redirectTo: 'user/vida-estudiantil', pathMatch: 'full' },
  { path: 'noticias-admin', redirectTo: 'admin/noticias-admin', pathMatch: 'full' },
  { path: 'reserva-taka-taka', redirectTo: 'user/reserva-taka-taka', pathMatch: 'full' },
  { path: 'reserva-ping-pong', redirectTo: 'user/reserva-ping-pong', pathMatch: 'full' }
];

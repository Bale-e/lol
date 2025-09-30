// seleccionar-espacio.component.ts
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccionar-espacio',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './seleccion-espacio.component.html',
  styleUrls: ['./seleccion-espacio.component.css']
})
export class SeleccionarEspacioComponent {
  espacios = [
    {
      img: 'assets/home-cards/cancha-deportiva.jpg',
      tag: 'Fútbol',
      title: 'Cancha',
      desc: 'Reserva la cancha para jugar con tus amigos. La reserva te garantiza su uso en el horario seleccionado, su uso es exclusivo para actividades dentro del reglamento escolar y deportivo.',
      route: '/reservas-cancha'
    },
    {
      img: 'assets/seleccion-espacio/takataka.jpg',
      tag: 'Taka-Taka',
      title: 'Taka - Taka',
      desc: 'Disfruta del clásico juego de mesa en nuestro espacio. Juega con amigos y pasa tus momentos de ocio. La reserva te garantiza su uso en el horario seleccionado.',
      route: '/user/reserva-takataka'
    },
    {
      img: 'assets/seleccion-espacio/pingpong.jpg',
      tag: 'Ping Pong',
      title: 'Ping Pong',
      desc: 'Reserva la mesa de ping pong y reta a tus amigos. La reserva te garantiza su uso en el horario seleccionado.Si necesitas los implementos necesarios ',
      route: '/user/reserva-ping-pong'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

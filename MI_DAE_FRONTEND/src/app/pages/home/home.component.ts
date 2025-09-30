import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home {
  cards = [
    {
      img: 'assets/home-cards/cancha-deportiva.jpg', // imagen local
      tag: 'Reserva Espacios',
      title: 'Espacios Deportivos',
      desc: 'Reserva tu espacio para practicar tu deporte favorito en nuestra cancha deportiva completamente equipada. Nuestro espacio está disponible para fútbol, baloncesto, voleibol u otras actividades recreativas, ofreciendo un entorno seguro, cómodo y accesible. La reserva garantiza tu horario, permitiéndote disfrutar de la cancha sin interrupciones.',
      route: '/seleccion-espacio'
    },
    {
      img: 'assets/home-cards/implementos.jpg', // imagen local
      tag: 'Reserva Implementos',
      title: 'Implementos Deportivos',
      desc: 'Asegura los implementos necesarios para tu actividad deportiva, como pelotas, raquetas, conos, redes y otros accesorios. Nuestra reserva garantiza que los materiales estén disponibles en el horario seleccionado, permitiéndote entrenar o jugar sin interrupciones.',
      route: '/implementos'
    },
  ];

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

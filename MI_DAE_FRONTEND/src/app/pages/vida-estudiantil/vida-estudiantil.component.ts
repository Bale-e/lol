import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vida-estudiantil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vida-estudiantil.component.html',
  styleUrls: ['./vida-estudiantil.component.css']
})
export class VidaEstudiantil {
  espacios = [
    {
      img: 'assets/vida-estudiantil/taller.jpg',
      tag: 'Talleres',
      title: 'Talleres',
      desc: 'Participa en talleres deportivos, culturales y tecnológicos para potenciar tu experiencia estudiantil. Se parte de actividades que fomentan el aprendizaje, la creatividad y el desarrollo personal fuera del aula.',
      route: '/talleres'
    },
    {
      img: 'assets/vida-estudiantil/clubes.jpg',
      tag: 'Clubes',
      title: 'Clubes',
      desc: 'Únete a clubes estudiantiles y comparte intereses con otros alumnos en un ambiente colaborativo. Los clubes ofrecen una variedad de actividades y eventos que fomentan la participación activa y el desarrollo de habilidades sociales, ¿Que esperas para ser parte?',
      route: '/clubes'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

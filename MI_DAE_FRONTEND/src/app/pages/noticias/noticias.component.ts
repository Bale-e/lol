import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class Noticias{
  noticias = [
    {
      imagen: 'assets/home-cards/implementos.jpg',
      titulo: 'Inscripciones abiertas para talleres deportivos',
      descripcion: 'Participa en los talleres de fútbol, vóleibol y básquetbol. ¡Cupo limitado!',
      fecha: '25 Sep 2025'
    },
    {
      imagen: 'assets/articulos-noticias/cancha.jpg',
      titulo: 'Nueva cancha multiuso inaugurada',
      descripcion: 'Ya puedes reservar la nueva cancha para tus actividades deportivas y recreativas.',
      fecha: '22 Sep 2025'
    },
    {
      imagen: 'assets/articulos-noticias/voluntariado.jpg',
      titulo: 'Convocatoria a voluntariado estudiantil',
      descripcion: 'Súmate al equipo de voluntarios y apoya en eventos institucionales. Inscríbete en vida estudiantil.',
      fecha: '20 Sep 2025'
    },
    {
      imagen: 'assets/articulos-noticias/empleabilidad.jpg',
      titulo: 'Charla sobre empleabilidad',
      descripcion: 'Este viernes se realizará una charla sobre empleabilidad y desarrollo profesional en el auditorio principal.',
      fecha: '18 Sep 2025'
    },
    {
      imagen: 'assets/articulos-noticias/entrega-implementos.jpg',
      titulo: 'Entrega de implementos deportivos',
      descripcion: 'Los estudiantes que participaron en los talleres pueden retirar sus implementos deportivos en la oficina de deportes.',
      fecha: '15 Sep 2025'
    }
  ];
}

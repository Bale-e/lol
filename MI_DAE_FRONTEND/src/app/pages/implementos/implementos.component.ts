import { Component, OnInit } from '@angular/core';
import { ImplementosService, Implemento } from '../../services/implementos.service';

@Component({
  selector: 'app-implementos',
  templateUrl: './implementos.component.html',
  styleUrls: ['./implementos.component.css']
})
export class ImplementosComponent implements OnInit {
  implementos: Implemento[] = [];
  formImplemento: Partial<Implemento> = { nombreImplemento: '', stock: 0, detalle: '' };
  editando: boolean = false;

  mensaje: string = '';
  error: string = '';

  constructor(private implementosService: ImplementosService) {}

  ngOnInit(): void {
    this.cargarImplementos();
  }

  cargarImplementos(): void {
    this.implementosService.getAll().subscribe({
      next: (data: Implemento[]) => this.implementos = data,
      error: (err: any) => this.error = 'Error cargando implementos: ' + err.message
    });
  }

  guardarImplemento(): void {
    this.error = '';
    this.mensaje = '';

    const { nombreImplemento, stock, detalle } = this.formImplemento;
    if (!nombreImplemento || stock === undefined || stock === null || detalle === undefined) {
      this.error = 'Completa todos los campos';
      return;
    }

    if (this.editando && this.formImplemento.id) {
      this.implementosService.update(this.formImplemento.id, { nombreImplemento, stock, detalle }).subscribe({
        next: () => {
          this.mensaje = 'Implemento actualizado correctamente';
          this.resetFormulario();
          this.cargarImplementos();
        },
        error: (err: any) => this.error = 'Error al actualizar: ' + err.message
      });
    } else {
      this.implementosService.add({ nombreImplemento, stock, detalle }).subscribe({
        next: () => {
          this.mensaje = 'Implemento agregado correctamente';
          this.resetFormulario();
          this.cargarImplementos();
        },
        error: (err: any) => this.error = 'Error al agregar: ' + err.message
      });
    }
  }

  editarImplemento(implemento: Implemento): void {
    this.formImplemento = { ...implemento };
    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  eliminarImplemento(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este implemento?')) return;

    this.implementosService.delete(id).subscribe({
      next: () => {
        this.mensaje = 'Implemento eliminado correctamente';
        this.cargarImplementos();
      },
      error: (err: any) => this.error = 'Error al eliminar: ' + err.message
    });
  }

  resetFormulario(): void {
    this.formImplemento = { nombreImplemento: '', stock: 0, detalle: '' };
    this.editando = false;
    this.mensaje = '';
    this.error = '';
  }
}

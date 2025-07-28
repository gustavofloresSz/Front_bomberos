import { Component, inject, OnInit } from '@angular/core';
import { ComentarioService } from '../../../services/comentario.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { SocketService } from '../../../../socket/socket.service';

@Component({
  selector: 'app-crud-comentario',
  imports: [
    DatePipe,
    NgIf,
    NgFor,
    MatButton
  ],
  templateUrl: './crud-comentario.component.html',
})
export class CrudComentarioComponent implements OnInit {
  private comentarioService = inject(ComentarioService);
  private socketService = inject(SocketService);

  comentarios: any[] = [];

  ngOnInit() {
    this.cargarComentarios();
    this.socketService.escucharComentario((comentario: any) => {
      this.comentarios.unshift(comentario);
    });
  }

  cargarComentarios() {
    this.comentarioService.getComentario().subscribe({
      next: (data: any) => {
        this.comentarios = data;
      },
      error: (err) => {
        console.error('Error al cargar comentarios:', err);
      }
    });
  }

  marcarComoCompletado(id: number) {
    this.comentarioService.deleteComentario(id).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter(c => c.id !== id);
      },
      error: () => {
        console.error('Error eliminando comentario');
      }
    });
  }
}


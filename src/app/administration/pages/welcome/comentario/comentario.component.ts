import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ComentarioService } from '../../../services/comentario.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-comentario',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './comentario.component.html',
})
export class ComentarioComponent {
  private fb = inject(FormBuilder);
  private comentarioService = inject(ComentarioService);

  formComentario: FormGroup = this.fb.group({
    descripcion: [''],
    tipo_incendio: ['', Validators.required],
    ubicacion: ['']
  });

  successMessage = signal('');

  enviarComentario() {
    if (this.formComentario.invalid) return;

    const comentario = this.formComentario.value;

    this.comentarioService.addComentario(comentario).subscribe({
      next: () => {
        this.successMessage.set('¡Reporte enviado con éxito!');
        this.formComentario.reset();

        setTimeout(() => {
          this.successMessage.set('');
        }, 4000); // se borra a los 4 segundos
      },
      error: () => {
        this.successMessage.set('Ocurrió un error al enviar el reporte');
        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);
      }
    });
  }
}

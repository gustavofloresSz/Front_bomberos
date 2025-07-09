import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SocketService } from '../../../../socket/socket.service';

@Component({
  selector: 'app-imbox-dialog',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: "./imbox-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImboxDialogComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToBottom(), 0);
  }
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  private route = inject(ActivatedRoute);
  private fileService = inject(FileService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  private socketService = inject(SocketService);

  usuarioId!: number;
  mensajes: any[] = [];
  name_receptor = '';
  miId!: number;

  nuevoMensaje: string = '';
  archivosAdjuntos: File[] = [];

  ngOnInit() {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('usuarioId'));
    this.userService.getUserActualId().subscribe({
      next: (data) => {
        this.miId = data.id;
        if (this.usuarioId) {
          this.cargarConversacion();
        }
        this.socketService.escucharMensajes((data: any) => {
          if (
            data.tipo === 'nuevo_envio' &&
            (data.destinatarios.includes(this.miId) || data.emisorId === this.miId) &&
            (data.destinatarios.includes(this.usuarioId) || data.emisorId === this.usuarioId)
          ) {
            this.cargarConversacion();
          }
        });
      },
      error: (err) => {
        console.error('Error obteniendo ID del usuario actual:', err);
      }
    });
  }

  cargarConversacion() {
    this.fileService.getConversacion(this.usuarioId).subscribe({
      next: (data: any) => {
        this.mensajes = data;

        if (data.length > 0) {
          const primerMensaje = data[0];
          const otroUsuario = primerMensaje.emisor.id === this.usuarioId
            ? primerMensaje.emisor
            : primerMensaje.receptor;

          this.name_receptor = otroUsuario.name;
          this.cdr.markForCheck();
        } else {
          this.userService.getUsuarioPorId(this.usuarioId).subscribe({
            next: (usuario: any) => {
              this.name_receptor = usuario.name;
              this.cdr.markForCheck();

            },
            error: err => console.error('Error al cargar usuario:', err)
          });
        }
        this.cdr.detectChanges();
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: err => {
        console.error('Error cargando conversación:', err);
      }
    });
  }

  descargarArchivo(nombre: string, name_original: string) {
    this.fileService.descargarArchivo(nombre).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name_original;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (err) => {
        console.error('Error al descargar el archivo:', err);
      }
    });
  }

  enviarMensaje(event: Event) {
    event.preventDefault();

    const tieneMensaje = this.nuevoMensaje.trim() !== '';
    const tieneArchivo = this.archivosAdjuntos.length > 0;

    if (!tieneMensaje && !tieneArchivo) {
      return;
    }

    this.fileService.crearEnvio(this.nuevoMensaje, [this.usuarioId], this.archivosAdjuntos)
      .subscribe({
        next: () => {
          this.nuevoMensaje = '';
          this.archivosAdjuntos = [];
          this.cargarConversacion();
        },
        error: err => console.error('Error al enviar mensaje:', err)
      });
  }

  onAdjunto(event: any) {
    const nuevosArchivos = Array.from(event.target.files) as File[];

    nuevosArchivos.forEach(nuevo => {
      const yaExiste = this.archivosAdjuntos.some(
        f => f.name === nuevo.name && f.size === nuevo.size
      );
      if (!yaExiste && this.archivosAdjuntos.length < 10) {
        this.archivosAdjuntos.push(nuevo);
      }
    });

    event.target.value = '';
  }

  quitarArchivo(index: number) {
    this.archivosAdjuntos.splice(index, 1);
  }

  scrollToBottom() {
    try {
      const el = this.scrollContainer?.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {
      console.error('No se pudo hacer scroll:', err);
    }
  }

  get iniciales(): string {
    const partes = this.name_receptor.split(' ');
    const primeraLetra = partes[0]?.[0] ?? '';
    const segundaLetra = partes[1]?.[0] ?? '';
    return (primeraLetra + segundaLetra).toUpperCase();
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Evita salto de línea
      this.enviarMensaje(event);
    }
  }
}

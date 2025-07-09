import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { SocketService } from '../../../socket/socket.service';
import { NewChatComponent } from '../new-chat/new-chat.component';

@Component({
  selector: 'app-imbox',
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    FormsModule,
    MatIcon
  ],
  templateUrl: './imbox.component.html'
})
export class ImboxComponent implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private socketService = inject(SocketService);
  private userService = inject(UserService);

  usuarios: any[] = [];
  busqueda = '';
  cargando = false;
  currentPage = 0;
  readonly pageSize = 10;
  total = 0;

  ngOnInit() {
    this.cargarUsuarios();
    this.escucharSocket();
  }

  private escucharSocket() {
    this.userService.getUserActualId().subscribe({
      next: (res) => {
        const miId = res.id;
        this.socketService.escucharMensajes((data: any) => {
          if (data.tipo === 'nuevo_envio' && data.destinatarios.includes(miId)) {
            this.resetPaginacion();
          }
        });
      },
      error: (err) => {
        console.error("Error obteniendo ID del usuario actual:", err);
      }
    });
  }

  private resetPaginacion() {
    this.usuarios = [];
    this.currentPage = 0;
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    if (this.cargando) return;
    this.cargando = true;

    this.userService.getInboxUsuarios(this.currentPage, this.pageSize).subscribe({
      next: (res: any) => {
        this.usuarios.push(...res.data);
        this.total = res.total;
        this.currentPage++;
        this.cargando = false;
      },
      error: err => {
        console.error('Error cargando usuarios:', err);
        this.cargando = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const cercaDelFinal = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200;
    if (cercaDelFinal && this.usuarios.length < this.total) {
      this.cargarUsuarios();
    }
  }

  openNewChatDialog() {
    const dialogRef = this.dialog.open(NewChatComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((usuarioId: number | null) => {
      if (usuarioId) this.abrirChat(usuarioId);
    });
  }

  abrirChat(usuarioId: number) {
    this.router.navigate(['/main/chat', usuarioId]);
  }

  coincideBusqueda(usuario: any): boolean {
    return usuario.name.toLowerCase().includes(this.busqueda.toLowerCase());
  }

  limpiarBusqueda() {
    this.busqueda = '';
  }
}
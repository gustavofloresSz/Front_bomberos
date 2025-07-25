import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CrudUserDialogComponent } from './crud-users/crud-users-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-crud',
  imports: [
    MatTableModule,
    MatCardModule,
    MatIcon,
    MatButton,
    CommonModule,
    FormsModule
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  usuarios: any[] = [];
  displayedColumns: string[] = ['nro', 'name', 'usuario', 'rol', 'seccion', 'editar', 'eliminar'];
  busqueda = '';

  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getFullUsers().subscribe({
      next: (data: any) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      },
    });
  }

  abrirDialogoEditar(user: any) {
    const dialogRef = this.dialog.open(CrudUserDialogComponent, {
      data: { user, modo: 'editar' },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.cargarUsuarios();
      }
    });
  }

  abrirDialogoEliminar(user: any) {
    const dialogRef = this.dialog.open(CrudUserDialogComponent, {
      data: { user, modo: 'eliminar' },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.cargarUsuarios();
      }
    });
  }

  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(CrudUserDialogComponent, {
      data: { user: null, modo: 'crear' },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.cargarUsuarios();
      }
    });
  }

  coincideBusqueda(usuario: any): boolean {
    const termino = this.busqueda.trim().toLowerCase();
    return usuario.name.toLowerCase().includes(termino) ||
      usuario.usuario.toLowerCase().includes(termino) ||
      usuario.rol.toLowerCase().includes(termino) ||
      (usuario.seccion?.name?.toLowerCase().includes(termino) ?? false);
  }

  limpiarBusqueda() {
    this.busqueda = '';
  }
}

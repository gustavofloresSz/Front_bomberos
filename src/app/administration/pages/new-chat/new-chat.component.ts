import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-archivo-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './new-chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  usuarioBuscado: string = '';
  sugerenciasUsuarios: any[] = [];
  receptorSeleccionado: number | null = null;

  private dialogRef = inject(MatDialogRef<NewChatComponent>);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.get_user().subscribe((data: any) => {
      this.usuarios = data;
      this.usuariosFiltrados = data;
    });
  }

  filtrarUsuariosPorNombre() {
    const termino = this.usuarioBuscado.toLowerCase();
    this.sugerenciasUsuarios = this.usuarios.filter(user =>
      user.name.toLowerCase().includes(termino)
    );
    this.usuariosFiltrados = this.sugerenciasUsuarios;
  }

  seleccionarUsuario(user: any) {
    this.usuarioBuscado = user.name;
    this.receptorSeleccionado = user.id;
    this.sugerenciasUsuarios = [];
    this.usuariosFiltrados = [user];
  }

  limpiarBusquedaUsuario() {
    this.usuarioBuscado = '';
    this.sugerenciasUsuarios = [];
    this.usuariosFiltrados = this.usuarios;
    this.receptorSeleccionado = null;
  }

  iniciarChat() {
    if (!this.receptorSeleccionado) {
      alert('Debes seleccionar un usuario para iniciar el chat.');
      return;
    }
    this.dialogRef.close(this.receptorSeleccionado);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
import { Component, inject } from '@angular/core';
import { UserService } from '../../../../administration/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-settings',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIconModule,
    MatError,
    MatSlideToggleModule
  ],
  templateUrl: './user-settings.component.html',
  styles: ``
})
export class UserSettingsComponent {
  currentPassword = '';
  newPassword = '';
  mensaje = '';
  exito = false;
  showCurrentPassword = false;
  showNewPassword = false;
  temaOscuro = false;


  private userService = inject(UserService);

  cambiarContrasena() {
    this.userService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (res: any) => {
        this.mensaje = res.message || 'Contraseña actualizada correctamente';
        this.exito = true;
        this.currentPassword = '';
        this.newPassword = '';
      },
      error: (err) => {
        this.mensaje = err.error.message || 'Ocurrió un error';
        this.exito = false;
      }
    });
  }

  verCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  verNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
  toggleTema() {
    this.temaOscuro = !this.temaOscuro;
    if (this.temaOscuro) {
      document.body.classList.add('dark');
      localStorage.setItem('temaOscuro', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('temaOscuro', 'false');
    }
  }
}

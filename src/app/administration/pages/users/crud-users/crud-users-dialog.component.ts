import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogModule } from '@angular/material/dialog';
import { SeccionService } from '../../../services/seccion.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-crud-users',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './crud-users-dialog.component.html',
  styles: ``
})
export class CrudUserDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CrudUserDialogComponent>);
  private userService = inject(UserService);
  private seccionService = inject(SeccionService);
  private fb = inject(FormBuilder);
  public data = inject(MAT_DIALOG_DATA);

  form!: FormGroup;
  secciones: any[] = [];
  modo: 'editar' | 'eliminar' | 'crear';
  showPassword = false;

  constructor() {
    this.modo = this.data.modo;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data?.user?.name || '', Validators.required],
      usuario: [this.data?.user?.usuario || '', Validators.required],
      rol: [this.data?.user?.rol || '', Validators.required],
      seccion: [this.data?.user?.seccion?.id || '', Validators.required],
      password: [''] // solo en crear o si desea cambiar
    });

    this.seccionService.getSeccion().subscribe({
      next: (data: any) => this.secciones = data,
      error: (err) => console.error('Error cargando secciones:', err)
    });
  }

  confirmarEliminacion() {
    this.userService.deleteUser(this.data.user.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Error eliminando usuario:', err);
        this.dialogRef.close(false);
      }
    });
  }

  confirmarEdicion() {
    if (this.form.invalid) return;
    const formData = this.form.value;

    if (this.modo === 'editar') {
      this.userService.updateUser(this.data.user.id, formData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error actualizando usuario:', err);
          this.dialogRef.close(false);
        }
      });
    } else if (this.modo === 'crear') {
      this.userService.registerUser(formData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error creando usuario:', err);
          this.dialogRef.close(false);
        }
      });
    }
  }

  verPassword() {
    this.showPassword = !this.showPassword;
  }
  cancelar() {
    this.dialogRef.close(false);
  }
}

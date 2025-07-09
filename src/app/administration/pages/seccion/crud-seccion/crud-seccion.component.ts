import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SeccionService } from '../../../services/seccion.service';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crud-seccion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle

  ],
  templateUrl: './crud-seccion.component.html',
  styles: ``
})
export class CrudSeccionComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CrudSeccionComponent>);
  private seccionService = inject(SeccionService);
  private fb = inject(FormBuilder);
  public data = inject(MAT_DIALOG_DATA);

  form!: FormGroup;
  modo: 'editar' | 'eliminar' | 'crear';
  
  constructor() {
    this.modo = this.data.modo;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data?.seccion?.name || '', Validators.required],
    });
  }

  confirmarEliminacion() {
    this.seccionService.deleteSeccion(this.data.seccion.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Error eliminando la sección:', err);
        this.dialogRef.close(false);
      }
    });
  }

  confirmarEdicion() {
    if (this.form.invalid) return;

    const nuevoNombre = this.form.value.name;
    if (this.modo === 'editar') {
      this.seccionService.updateSeccion(this.data.seccion.id, { name: nuevoNombre }).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error actualizando la sección:', err);
          this.dialogRef.close(false);
        }
      });
    } else if (this.modo === 'crear') {
      this.seccionService.registerSeccion({ name: nuevoNombre }).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error agregando la sección:', err);
          this.dialogRef.close(false);
        }
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}


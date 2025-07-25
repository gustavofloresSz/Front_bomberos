import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HectareaService } from '../../../../../services/hectarea.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crud-control-hectarea',
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
  templateUrl: './crud-control-hectarea.component.html',
})
export class CrudControlHectareaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private hectareaService = inject(HectareaService);
  private dialogRef = inject(MatDialogRef<CrudControlHectareaComponent>);
  public data = inject(MAT_DIALOG_DATA);

  form!: FormGroup;
  modo: 'crear' | 'editar' | 'eliminar' = this.data.modo;

  ngOnInit(): void {
    const hectarea = this.data.item || {};

    this.form = this.fb.group({
      comunidad: [hectarea.comunidad || '', Validators.required],
      municipio: [hectarea.municipio || '', Validators.required],
      hectarea_afectada: [hectarea.hectarea_afectada || 0, [Validators.required, Validators.min(0.01)]],
    });

    if (this.modo === 'eliminar') {
      this.form.disable();
    }
  }

  confirmarEdicion() {
    if (this.form.invalid) return;

    const datos = { ...this.form.value };

    if (this.modo === 'crear') {
      this.hectareaService.addHectarea(datos).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error al crear hectárea:', err);
          this.dialogRef.close(false);
        }
      });
    } else {
      this.hectareaService.updateHectarea(this.data.item.id, datos).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error actualizando hectárea:', err);
          this.dialogRef.close(false);
        }
      });
    }
  }

  confirmarEliminacion() {
    this.hectareaService.deleteHectarea(this.data.item.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Error eliminando hectárea:', err);
        this.dialogRef.close(false);
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

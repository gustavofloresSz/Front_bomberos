import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ControlOperativoService } from '../../../../../services/control_operativo.service';

@Component({
  selector: 'app-crud-control-operaciones',
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
  templateUrl: './crud-control-operaciones.component.html',
})
export class CrudControlOperacionesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private controlService = inject(ControlOperativoService);
  private dialogRef = inject(MatDialogRef<CrudControlOperacionesComponent>);
  public data = inject(MAT_DIALOG_DATA);

  form!: FormGroup;
  modo: 'crear' | 'editar' | 'eliminar' = this.data.modo;

  ngOnInit(): void {
    const control = this.data.item || {};

    this.form = this.fb.group({
      fecha_fin: [control.fecha_fin || ''],
      responsable: [control.responsable || '', Validators.required],
      efectivo_total: [control.efectivo_total || null],
      efectivo_uso: [control.efectivo_uso || null],
      lugar: [control.lugar || ''],
      distancia_kms: [control.distancia_kms || null],
      material_equipo: [control.material_equipo || ''],
      novedades: [control.novedades || ''],
    }, {
      validators: this.validarEfectivo()
    });

    if (this.modo === 'eliminar') {
      this.form.disable();
    }
  }

  private validarEfectivo() {
    return (group: FormGroup) => {
      const total = group.get('efectivo_total')?.value;
      const uso = group.get('efectivo_uso')?.value;

      if (total != null && uso != null && uso > total) {
        group.get('efectivo_uso')?.setErrors({ mayorQueTotal: true });
      } else {
        // Si no hay error, lo eliminamos
        if (group.get('efectivo_uso')?.hasError('mayorQueTotal')) {
          group.get('efectivo_uso')?.setErrors(null);
        }
      }
      return null;
    };
  }
  confirmarEdicion() {
    if (this.form.invalid) return;

    const datos = { ...this.form.value };

    // Convertir vacío en null
    if (!datos.fecha_fin) {
      datos.fecha_fin = null;
    }
    const payload = {
      ...datos,
      tipo: this.data.tipo,
    };

    if (this.modo === 'crear') {
      this.controlService.addControlOperativo(payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error al crear control operativo:', err);
          this.dialogRef.close(false);
        }
      });
    } else {
      this.controlService.updateControlOperativo(this.data.item.id, payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error actualizando control operativo:', err);
          this.dialogRef.close(false);
        }
      });
    }
  }


  confirmarEliminacion() {
    this.controlService.deleteControlOperativo(this.data.item.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Error eliminando control operativo:', err);
        this.dialogRef.close(false);
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

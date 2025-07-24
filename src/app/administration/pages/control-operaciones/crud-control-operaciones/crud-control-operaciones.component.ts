import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SeccionService } from '../../../services/seccion.service';
import { ControlOperativo, ControlOperativoService } from '../../../services/control_operativo.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  private data = inject(MAT_DIALOG_DATA)

  form!: FormGroup;
  modo: 'editar' = 'editar'; // Solo edición

  ngOnInit(): void {
    const control = this.data.item;

    this.form = this.fb.group({
      fecha_fin: [control.fecha_fin || ''],
      responsable: [control.responsable || '', Validators.required],
      cuadrillas: [control.cuadrillas || null],
      efectivo: [control.efectivo || null],
      lugar: [control.lugar || '', Validators.required],
      distancia_kms: [control.distancia_kms || null],
      material_equipo: [control.material_equipo || ''],
      novedades: [control.novedades || ''],
    });
  }

  confirmarEdicion() {
    if (this.form.invalid) return;

    const datos = this.form.value;

    this.controlService.updateControlOperativo(this.data.item.id, datos).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Error actualizando control operativo:', err);
        this.dialogRef.close(false);
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

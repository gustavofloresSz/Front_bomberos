import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { InventarioService } from '../../../services/inventario.service';
import { SeccionService } from '../../../services/seccion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crud-inventario',
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
  templateUrl: './crud-inventario.component.html',
})
export class CrudInventarioComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CrudInventarioComponent>);
  private inventarioService = inject(InventarioService);
  private seccionService = inject(SeccionService);
  private fb = inject(FormBuilder);
  public data = inject(MAT_DIALOG_DATA);

  form!: FormGroup;
  secciones: any[] = [];
  modo: 'crear' | 'editar' | 'eliminar';

  constructor() {
    this.modo = this.data.modo;
  }

  ngOnInit(): void {
    const inv = this.data?.item;

    this.form = this.fb.group({
      nombre: [inv?.nombre || '', Validators.required],
      cantidad_total: [inv?.cantidad_total ?? 0, [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+$/)
      ]],
      cantidad_uso: [inv?.cantidad_uso ?? 0, [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+$/)
      ]],
      seccion: [inv?.seccion?.id || '', Validators.required],
    }, {
      validators: this.validarUsoMenorIgualTotal()
    });

    this.seccionService.getSeccion().subscribe({
      next: (res: any) => this.secciones = res,
      error: (err) => console.error('Error cargando secciones:', err)
    });
  }

  validarUsoMenorIgualTotal() {
    return (group: AbstractControl): ValidationErrors | null => {
      const total = group.get('cantidad_total')?.value;
      const uso = group.get('cantidad_uso')?.value;
      return uso > total ? { usoMayorTotal: true } : null;
    };
  }

  confirmarEliminacion() {
    this.inventarioService.deleteInventario(this.data.item.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Error eliminando inventario:', err);
        this.dialogRef.close(false);
      }
    });
  }

  confirmarEdicion() {
    if (this.form.invalid) return;

    const raw = this.form.value;

    const payload = {
      nombre: raw.nombre,
      cantidad_total: raw.cantidad_total,
      cantidad_uso: raw.cantidad_uso,
      seccionId: raw.seccion,
      tipo: this.data.tipo,
    };

    if (this.modo === 'editar') {
      this.inventarioService.updateInventario(this.data.item.id, payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error actualizando inventario:', err);
          this.dialogRef.close(false);
        }
      });
    } else if (this.modo === 'crear') {
      this.inventarioService.addInventario(payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error creando inventario:', err);
          this.dialogRef.close(false);
        }
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  get errorUsoMayorTotal() {
    return this.form.hasError('usoMayorTotal');
  }
}

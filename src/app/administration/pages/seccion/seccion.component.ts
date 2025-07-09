import { Component, inject, OnInit } from '@angular/core';
import { SeccionService } from '../../services/seccion.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CrudSeccionComponent } from './crud-seccion/crud-seccion.component';

@Component({
  selector: 'app-seccion',
  imports: [
    MatTableModule,
    MatCardModule,
    MatIcon,
    MatButton
  ],
  templateUrl: './seccion.component.html',
})
export default class SeccionComponent implements OnInit {
  seccion: any[] = [];
  displayedColumns: string[] = ['nro', 'name', 'editar'];

  private seccionService = inject(SeccionService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.cargarSecciones();
  }

  cargarSecciones() {
    this.seccionService.getSeccion().subscribe({
      next: (data: any) => {
        this.seccion = data;
      },
      error: (err) => {
        console.error('Error al obtener secciones:', err);
      },
    });
  }

  abrirDialogoEliminar(seccion: any) {
    const dialogRef = this.dialog.open(CrudSeccionComponent, {
      data: { seccion, modo: 'eliminar' }
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.cargarSecciones();
      }
    });
  }
  abrirDialogoEditar(seccion: any) {
    const dialogRef = this.dialog.open(CrudSeccionComponent, {
      data: { seccion, modo: 'editar' }
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.cargarSecciones();
      }
    });
  }
  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(CrudSeccionComponent, {
      data: { seccion: null, modo: 'crear' }
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.cargarSecciones();
      }
    });
  }
}

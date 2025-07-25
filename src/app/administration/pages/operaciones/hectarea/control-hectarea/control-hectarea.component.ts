import { Component, inject, OnInit } from '@angular/core';
import { HectareaService } from '../../../../services/hectarea.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CrudControlHectareaComponent } from './crud-control-hectarea/crud-control-hectarea.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-control-hectarea',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './control-hectarea.component.html',
})
export class ControlHectareaComponent implements OnInit {
  hectareas: any[] = [];
  displayedColumns: string[] = ['nro', 'comunidad', 'municipio', 'hectarea_afectada','editar', 'eliminar'];
  busqueda = '';
  
  private hectareaService = inject(HectareaService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.obtenerHectareas();
  }

  obtenerHectareas() {
    this.hectareaService.getHectarea().subscribe(
      (data: any) => {
        this.hectareas = data;
      },
      (error) => {
        console.error('Error al obtener hectáreas:', error);
      }
    );
  }

  coincideBusqueda(item: any): boolean {
    const termino = this.busqueda.trim().toLowerCase();
    return (
      item.comunidad?.toLowerCase().includes(termino) ||
      item.municipio?.toLowerCase().includes(termino)
    );
  }

  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(CrudControlHectareaComponent, {
      data: { modo: 'crear' },
      width: '500px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.obtenerHectareas();
      }
    });
  }

  abrirDialogoEditar(item: any) {
    const dialogRef = this.dialog.open(CrudControlHectareaComponent, {
      data: { modo: 'editar', item },
      width: '500px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.obtenerHectareas();
      }
    });
  }

  abrirDialogoEliminar(item: any) {
    const dialogRef = this.dialog.open(CrudControlHectareaComponent, {
      data: { modo: 'eliminar', item },
      width: '400px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.obtenerHectareas();
      }
    });
  }

  limpiarBusqueda() {
    this.busqueda = '';
  }

}
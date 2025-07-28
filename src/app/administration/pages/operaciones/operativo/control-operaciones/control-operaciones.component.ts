import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CrudControlOperacionesComponent } from './crud-control-operaciones/crud-control-operaciones.component';
import { ControlOperativoService } from '../../../../services/control_operativo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-control-operaciones',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './control-operaciones.component.html',
})
export class ControlOperacionesComponent implements OnInit {
  operaciones: any[] = [];
  displayedColumns: string[] = [
    'nro', 'fecha_inicio', 'fecha_fin', 'responsable',
    'efectivo_total', 'efectivo_uso','comunidad_municipio', 'distancia_kms', 'material_equipo', 'novedades',
    'editar', 'eliminar'
  ];
  busqueda = '';
  tipoSeleccionado?: string;

  private controlService = inject(ControlOperativoService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipoSeleccionado = params['tipo'];
      this.obtenerOperaciones(this.tipoSeleccionado);
    });
  }

  obtenerOperaciones(tipo?: string) {
    this.tipoSeleccionado = tipo;
    this.controlService.getControlOperativo(tipo).subscribe({
      next: (data: any[]) => {
        this.operaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener operaciones:', err);
      }
    });
  }

  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(CrudControlOperacionesComponent, {
      data: {
        modo: 'crear',
        tipo: this.tipoSeleccionado
      },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.obtenerOperaciones(this.tipoSeleccionado);
      }
    });
  }

  abrirDialogoEditar(item: any) {
    const dialogRef = this.dialog.open(CrudControlOperacionesComponent, {
      data: { item, modo: 'editar' },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.obtenerOperaciones(this.tipoSeleccionado);
      }
    });
  }

  abrirDialogoEliminar(item: any) {
    const dialogRef = this.dialog.open(CrudControlOperacionesComponent, {
      data: { item, modo: 'eliminar' },
      width: '500px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.obtenerOperaciones(this.tipoSeleccionado);
      }
    });
  }

  coincideBusqueda(op: any): boolean {
    const termino = this.busqueda.trim().toLowerCase();
    return op.responsable?.toLowerCase().includes(termino) ||
      op.lugar?.toLowerCase().includes(termino) ||
      op.material_equipo?.toLowerCase().includes(termino) ||
      op.novedades?.toLowerCase().includes(termino);
  }

  limpiarBusqueda() {
    this.busqueda = '';
  }
}

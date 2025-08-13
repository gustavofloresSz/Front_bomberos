import { Component, inject, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CrudInventarioComponent } from './crud-inventario/crud-inventario.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LogisticaImagenesComponent } from "./logistica-imagenes/logistica-imagenes.component";

@Component({
  selector: 'app-inventario',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    LogisticaImagenesComponent
],
  templateUrl: './inventario.component.html',
})
export class InventarioComponent implements OnInit {
  inventario: any[] = [];
  displayedColumns: string[] = ['nro', 'nombre', 'cantidad_total', 'cantidad_uso', 'cantidad_disponible', 'editar', 'eliminar'];
  busqueda = '';

mostrarImagenes = false;

  private inventarioService = inject(InventarioService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  tipoSeleccionado?: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipoSeleccionado = params['tipo'];
      this.obtenerInventario(this.tipoSeleccionado);
    });
  }

  // Getter para el inventario filtrado (usado en la vista de transporte)
  get inventarioFiltrado(): any[] {
    if (!this.busqueda.trim()) {
      return this.inventario;
    }
    
    const termino = this.busqueda.trim().toLowerCase();
    return this.inventario.filter(item => 
      item.nombre.toLowerCase().includes(termino)
    );
  }

  obtenerInventario(tipo?: string) {
    this.tipoSeleccionado = tipo;
    this.inventarioService.getInventario(tipo).subscribe({
      next: (data: any) => {
        this.inventario = data;
      },
      error: (err) => {
        console.error('Error al obtener inventario:', err);
      }
    });
  }
  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(CrudInventarioComponent, {
      data: { 
        modo: 'crear',
        tipo: this.tipoSeleccionado
      },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.obtenerInventario(this.tipoSeleccionado);
      }
    });
  }

  abrirDialogoEditar(item: any) {
    const dialogRef = this.dialog.open(CrudInventarioComponent, {
      data: { item, modo: 'editar' },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.obtenerInventario(this.tipoSeleccionado);
      }
    });
  }

  abrirDialogoEliminar(item: any) {
    const dialogRef = this.dialog.open(CrudInventarioComponent, {
      data: { item, modo: 'eliminar' },
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.obtenerInventario(this.tipoSeleccionado);
      }
    });
  }

  coincideBusqueda(item: any): boolean {
    const termino = this.busqueda.trim().toLowerCase();
    return item.nombre.toLowerCase().includes(termino);
  }

  limpiarBusqueda() {
    this.busqueda = '';
  }
}
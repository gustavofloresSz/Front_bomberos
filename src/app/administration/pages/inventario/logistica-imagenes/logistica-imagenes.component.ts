import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-logistica-imagenes',
  imports: [
    MatIcon,
    NgFor,
    MatButton
  ],
  templateUrl: './logistica-imagenes.component.html',
})
export class LogisticaImagenesComponent {

  @Output() cerrar = new EventEmitter<void>();

  imagenesLogistica = [
    { nombre: 'Ambulancia', ruta: 'assets/logistica/ambulancia.jpg' },
    { nombre: 'Camión Cisterna', ruta: 'assets/logistica/camion_sisterna.jpg' },
    { nombre: 'Camión 1', ruta: 'assets/logistica/camion2.jpg' },
    { nombre: 'Camión 1', ruta: 'assets/logistica/camion3.jpg' },
    { nombre: 'Camión 2', ruta: 'assets/logistica/camion4.jpg' },
    { nombre: 'Cocina', ruta: 'assets/logistica/cocina.jpg' },
    { nombre: 'CuadraTrack', ruta: 'assets/logistica/cuad.jpg' },
    { nombre: 'Motocicleta', ruta: 'assets/logistica/moto.jpg' },
    { nombre: 'Remolque', ruta: 'assets/logistica/remolque.jpg' }
  ];

  cerrarVista() {
    this.cerrar.emit();
  }
}

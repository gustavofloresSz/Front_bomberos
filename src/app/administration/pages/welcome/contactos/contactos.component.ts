import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactos',
  imports: [
    NgFor,
    CommonModule
  ],
  templateUrl: './contactos.component.html',
})
export class ContactosComponent {
  contactos = [
    {
      categoria: 'Autoridades Militares',
      icono: 'military_tech',
      color: 'bg-green-700',
      items: [
        { nombre: 'Comando General del Ejército', telefono: '800-123-456' },
        { nombre: 'RI-10 Gral. I. Warnes', telefono: '800-654-321' },
      ]
    },
    {
      categoria: 'Autoridades Civiles',
      icono: 'account_balance',
      color: 'bg-yellow-700',
      items: [
        { nombre: 'Gobernación de Santa Cruz', telefono: '800-987-654' },
        { nombre: 'Defensa Civil', telefono: '800-444-222' },
      ]
    },
    {
      categoria: 'Bomberos',
      icono: 'local_fire_department',
      color: 'bg-red-700',
      items: [
        { nombre: 'Unidad de Bomberos Voluntarios', telefono: '800-112-233' },
        { nombre: 'SAR Bolivia', telefono: '800-334-455' },
      ]
    },
    {
      categoria: 'Rescate de Animales',
      icono: 'pets',
      color: 'bg-blue-700',
      items: [
        { nombre: 'Zoonosis Municipal', telefono: '800-998-877' },
        { nombre: 'Rescate Animal Bolivia', telefono: '800-123-999' },
      ]
    }
  ];
}

import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


interface ContactoItem {
  nombre: string;
  telefono: string;
  cargo?: string;
  departamento?: string;
  municipio?: string;
  institucion?: string;
  direccion?: string;
}

interface GrupoContacto {
  categoria: string;
  icono: string;
  color: string;
  items: ContactoItem[];
}

@Component({
  selector: 'app-contactos',
  imports: [
    NgFor,
    CommonModule,
    RouterLink
  ],
  templateUrl: './contactos.component.html',
})
export class ContactosComponent {
  contactos : GrupoContacto[]= [
    {
      categoria: 'Autoridades Militares',
      icono: 'military_tech',
      color: 'bg-green-700',
      items: [
        {
          nombre: 'Tcnl.DEM. Walter Cesar Panozo Rojas',
          telefono: '72008836',
          cargo: 'Comandante del Batallón de Bomberos Forestales del Ejército'
        },
        {
          nombre: 'My.DEM. Bladimir Soto Farfan',
          telefono: '68157238',
          cargo: '2.º Comandante del Batallón de Bomberos Forestales del Ejército'
        },
      ]
    },
    {
      categoria: 'Autoridades',
      icono: 'account_balance',
      color: 'bg-yellow-700',
      items: [
        { nombre: 'Lic. Oscar Montes Barzón', cargo: 'Gobernador del Departamento', departamento: 'Tarija', municipio: 'Provincia Cercado', telefono: '72985022', institucion: 'Gobierno Autónomo Departamental de Tarija' },
        { nombre: 'Dr. Johnny Torrez Terzó', cargo: 'Alcalde Municipal de la provincia Cercado', departamento: 'Tarija', municipio: 'Provincia Cercado', telefono: '71717014', institucion: 'Gobierno Autónomo Municipal de la provincia Cercado' },
        { nombre: 'Dr. William Guerrero', cargo: 'Alcalde Municipal de Padcaya', departamento: 'Tarija', municipio: 'Provincia Avilés', telefono: '72945672', institucion: 'Gobierno Autónomo Municipal de Padcaya' },
        { nombre: 'Lic. Teodoro Suruguay Quiroga', cargo: 'Alcalde Municipal de Entre Ríos', departamento: 'Tarija', municipio: 'Provincia Avilés', telefono: '67371228', institucion: 'Gobierno Autónomo Municipal de Entre Ríos' },
        { nombre: 'Ing. Javier Lazcano', cargo: 'Alcalde Municipal de Uriondo', departamento: 'Tarija', municipio: 'Provincia Arce', telefono: '72675544', institucion: 'Gobierno Autónomo Municipal de Uriondo' },
        { nombre: 'Sr. Irineo Franz Flores Gutiérrez', cargo: 'Alcalde Municipal de Bermejo', departamento: 'Tarija', municipio: 'Provincia Arce', telefono: '71160718', institucion: 'Gobierno Autónomo Municipal de Bermejo' },
        { nombre: 'Cnl. DESP. Ángel Morales Calzadilla', cargo: 'Comandante Departamental', departamento: 'Tarija', municipio: 'Provincia Cercado', telefono: '70212008', institucion: 'Policía Nacional' },
        { nombre: 'Dr. Dulfredo Ozuna Vizcarra', cargo: 'Director General', departamento: 'Tarija', municipio: 'Provincia Cercado', telefono: '74568712', institucion: 'Hospital Regional San Juan de Dios' },
      ]
    },
    {
      categoria: 'Bomberos',
      icono: 'local_fire_department',
      color: 'bg-red-700',
      items: [
        {
          nombre: 'DIRECCIÓN DEPARTAMENTAL DE BOMBEROS',
          telefono: '78111984',
          direccion: 'Av. La Barranca, Santa Cruz de la Sierra'
        },
        {
          nombre: 'Unidad de Bomberos de la Policía Boliviana S.C.',
          telefono: '78111984',
          direccion: 'Av. La Barranca, Santa Cruz de la Sierra'
        },
        {
          nombre: 'Bomberos Voluntarios UUBR',
          telefono: '78187734',
          direccion: 'Av. Unzaga Dela Vega esquina, Santa Cruz de la Sierra'
        }
      ]
    },
    {
      categoria: 'Rescate de Animales',
      icono: 'pets',
      color: 'bg-blue-700',
      items: [
        {
          nombre: 'Bomberos Voluntarios K9 y Rescate de Fauna',
          telefono: '63391171',
          direccion: 'Santa Cruz de la Sierra'
        },
        {
          nombre: 'Refugio "Angelitos de Edgar"',
          telefono: '73107078',
          direccion: 'Santa Cruz de la Sierra'
        }
      ]
    }

  ];
}
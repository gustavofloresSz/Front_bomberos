import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  addInventario(inventario: {
    nombre: string;
    cantidad_total: number;
    cantidad_uso: number;
    tipo: string;
  }) {
    return this.http.post(`${this.apiUrl}/addInventario`, inventario);
  }

  getInventario(tipo?: string) {
    const params = tipo ? { params: new HttpParams().set('tipo', tipo) } : {};
    return this.http.get(`${this.apiUrl}/getInventario`, params);
  }

  getInventarioPastel(tipo?: string) {
    const params = tipo ? { params: new HttpParams().set('tipo', tipo) } : {};
    return this.http.get<any[]>(`${this.apiUrl}/getInventario`, params);
  }

  updateInventario(id: number, inventario: {
    nombre?: string;
    cantidad_total?: number;
    cantidad_uso?: number;
    tipo?: string;
  }) {
    return this.http.put(`${this.apiUrl}/updateInventario/${id}`, inventario);
  }

  deleteInventario(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteInventario/${id}`);
  }
}
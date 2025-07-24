import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

export interface ControlOperativo {
  id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  responsable?: string;
  cuadrillas?: number;
  efectivo?: number;
  lugar?: string;
  distancia_kms?: number;
  material_equipo?: string;
  novedades?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ControlOperativoService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  addControlOperativo(control: Omit<ControlOperativo, 'id' | 'fecha_inicio'>) {
    // No se envía fecha_inicio porque se asigna automáticamente en backend
    return this.http.post<ControlOperativo>(`${this.apiUrl}/addControlOperativo`, control);
  }

  getControlOperativo() {
    return this.http.get<ControlOperativo[]>(`${this.apiUrl}/getControlOperativo`);
  }

  updateControlOperativo(id: number, control: Partial<ControlOperativo>) {
    return this.http.put<ControlOperativo>(`${this.apiUrl}/updateControlOperativo/${id}`, control);
  }

  deleteControlOperativo(id: number) {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/deleteControlOperativo/${id}`);
  }
}

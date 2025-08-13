import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ControlOperativo {
  id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  responsable?: string;
  efectivo_total?: number;
  efectivo_uso?: number;
  lugar?: string;
  distancia_kms?: number;
  material_equipo?: string;
  novedades?: string;
  tipo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ControlOperativoService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  addControlOperativo(control: Omit<ControlOperativo, 'id'>) {
    return this.http.post<ControlOperativo>(`${this.apiUrl}/addControlOperativo`, control);
  }

  getControlOperativo(tipo?: string) {
    const params = tipo ? new HttpParams().set('tipo', tipo) : undefined;
    return this.http.get<ControlOperativo[]>(`${this.apiUrl}/getControlOperativo`, { params });
  }

  updateControlOperativo(id: number, control: Partial<ControlOperativo>) {
    return this.http.put<ControlOperativo>(
      `${this.apiUrl}/updateControlOperativo/${id}`,
      control
    );
  }

  deleteControlOperativo(id: number) {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/deleteControlOperativo/${id}`
    );
  }

  getControlOperativoPastel(params?: { tipo?: string; lugar?: string }) {
    let httpParams = new HttpParams();
    if (params?.tipo) httpParams = httpParams.set('tipo', params.tipo);
    if (params?.lugar) httpParams = httpParams.set('lugar', params.lugar);

    return this.http.get<any[]>(`${this.apiUrl}/getControlOperativo`, { params: httpParams });
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HectareaService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  addHectarea(hectarea: {
    comunidad: string;
    municipio: string;
    hectarea_afectada: number;
  }) {
    return this.http.post(`${this.apiUrl}/addHectarea`, hectarea);
  }

  getHectarea() {
    return this.http.get(`${this.apiUrl}/getHectarea`);
  }

  updateHectarea(id: number, hectarea: {
    comunidad?: string;
    municipio?: string;
    hectarea_afectada?: number;
  }) {
    return this.http.put(`${this.apiUrl}/updateHectarea/${id}`, hectarea);
  }

  deleteHectarea(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteHectarea/${id}`);
  }

}

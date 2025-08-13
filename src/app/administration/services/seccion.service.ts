import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getSeccion() {
    return this.http.get(`${this.apiUrl}/getSeccion`);
  }
  registerSeccion(seccion: { name: string }) {
    return this.http.post(`${this.apiUrl}/registerSeccion`, seccion);
  }

  updateSeccion(id: number, seccion: { name: string }) {
    return this.http.put(`${this.apiUrl}/updateSeccion/${id}`, seccion);
  }

  deleteSeccion(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteSeccion/${id}`);
  }
}

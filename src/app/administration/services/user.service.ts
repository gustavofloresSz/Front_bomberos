import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  get_user() {
    return this.http.get(`${this.apiUrl}/getUsers`);
  }
  getUsuarioPorId(id: number) {
    return this.http.get(`${this.apiUrl}/usuario/${id}`);
  }

  changePassword(data: { currentPassword: string; newPassword: string }) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/changePassword`, data, { headers });
  }

  getUserActual() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ id: number, rol: string }>(`${this.apiUrl}/usuario-actual`, { headers });
  }

  getUserActualId() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<{ id: number }>(`${this.apiUrl}/usuario-id-socket`, { headers });
  }

  getInboxUsuarios(page: number = 0, size: number = 10) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/getUsuariosEnviaronMensajes?page=${page}&size=${size}`, { headers });
  }



  //metodos crud
  getFullUsers() {
    return this.http.get(`${this.apiUrl}/getFullUsers`);
  }
  registerUser(user: { name: string; usuario: string; password: string; rol: string; seccion: number }) {
    return this.http.post(`${this.apiUrl}/registerUser`, user);
  }
  updateUser(id: number, user: { name?: string; rol?: string; seccion?: number; password?: string }) {
    return this.http.put(`${this.apiUrl}/updateUser/${id}`, user);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteUser/${id}`);
  }

}
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  addComentario(comentario:{
    descripcion?:string,
    tipo_incendio:string,
    ubicacion:string
  }){
    return this.http.post(`${this.apiUrl}/addComentario`, comentario)
  }

  getComentario() {
    return this.http.get(`${this.apiUrl}/getComentario`);
  }

  deleteComentario(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteComentario/${id}`);
  }
}

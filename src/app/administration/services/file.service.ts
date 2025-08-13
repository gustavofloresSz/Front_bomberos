import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { map, switchMap, tap } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private socketService = inject(SocketService);
  private userService = inject(UserService);

  crearEnvio(mensaje: string, receptores: number[], archivos: File[]) {
    const formData = new FormData();
    formData.append('mensaje', mensaje);
    receptores.forEach(r => formData.append('receptores[]', r.toString()));
    archivos.forEach(file => formData.append('archivos', file));

    return this.http.post(`${this.apiUrl}/crearEnvio`, formData).pipe(
      switchMap((response: any) =>
        this.userService.getUserActualId().pipe(
          tap(({ id }) => {
            this.socketService.enviarMensaje({
              tipo: 'nuevo_envio',
              destinatarios: receptores,
              mensaje: mensaje,
              emisorId: id
            });
          }),
          map(() => response)
        )
      )
    );
  }

  getInbox() {
    return this.http.get(`${this.apiUrl}/getInbox`);
  }

  descargarArchivo(nombre: string) {
    return this.http.get(`${this.apiUrl}/descargar/${nombre}`, {
      responseType: 'blob',
    });
  }

  getConversacion(usuarioId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/chat/${usuarioId}`, { headers });
  }

}

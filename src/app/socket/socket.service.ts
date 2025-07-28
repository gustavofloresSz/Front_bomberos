import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket;

  constructor() { 
    this.socket= io('http://localhost:4000');
    this.socket.on('connect', () => {
      console.log('Socket conectado con id:', this.socket.id);
    });
  }

  enviarMensaje(data:any) {
    this.socket.emit('mensaje', data);
  }

  escucharMensajes(callback: (data: any) => void) {
    this.socket.on('mensaje', callback);
  }

  enviarComentario(comentario: any) {
    this.socket.emit('comentario', comentario);
  }
  escucharComentario(callback: (data: any) => void) {
    this.socket.on('comentario', callback);
  }
}

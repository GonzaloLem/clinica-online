import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { API_CLINICA } from '../constants/api-clinica.constante';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket:Socket;

  constructor() { 
    this.socket = io(API_CLINICA);
  }

  on(evento:string, callback:(...args: any[]) => void){
    this.socket.on(evento, callback);
  }

  emit(evento:string, data:any){
    this.socket.emit(evento, data);
  }
}

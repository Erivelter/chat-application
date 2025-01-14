import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:4600'); // URL do servidor WebSocket
  }



  // Enviar mensagem de entrada no chat
  joinChat(userName: string) {
    this.socket$.next({ type: 'join', userName });
  }

  // Enviar mensagem do usuário
  sendMessage(content: string) {
    this.socket$.next({ type: 'message', content });
  }

  // Receber mensagens em tempo real
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

}

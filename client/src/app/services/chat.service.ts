import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket$: WebSocketSubject<any>;
  private apiUrl = 'http://localhost:4600/api/messages'; // URL do backend

  constructor(private httpClient: HttpClient) {
    this.socket$ = webSocket('ws://localhost:4600'); // URL do servidor WebSocket
  }



  // Enviar mensagem de entrada no chat
  joinChat(userName: string) {
    this.socket$.next({ type: 'join', userName });
  }

  // Enviar mensagem do usuário
  sendMessage(message: Omit<Message, 'id'>){
    this.socket$.next({ type: 'message', content: message.content });
  }

  // Receber mensagens em tempo real

  receiveMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.apiUrl);


}

}

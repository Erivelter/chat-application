import { Component } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, Message } from '../models/user';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule , AppMaterialModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userName: string = ''; // Nome do usuário autenticado
  newMessage: string = '';
  messages: Message[] = []; // Lista de mensagens recebidas
  isLoggedIn: boolean = false; // Verifica se o usuário está logado

  constructor(private snackBar: MatSnackBar, private router: Router, private chatService: ChatService) {}


  ngOnInit() {
    // Verifica se o usuário está logado e obtém o nome do usuário
    this.isLoggedIn = !!localStorage.getItem('userName');
    this.userName = localStorage.getItem('userName') || '';

    if (this.isLoggedIn) {
      // Entra no chat e começa a ouvir mensagens
      this.chatService.joinChat(this.userName);

      // Carregar histórico de mensagens do banco de dados
      this.chatService.getMessages().subscribe({
        next: (messages) => {
          this.messages = messages;
        },
        error: (err) => {
          console.error('Erro ao carregar mensagens:', err);
        }
      });

      // Escutar mensagens em tempo real via WebSocket
      this.chatService.receiveMessages().subscribe({
        next: (message: Message) => {
          this.messages.push(message);
        },
        error: (err) => {
          console.error('Erro ao receber mensagens:', err);
        }
      });
    }
  }
 // Método chamado ao enviar uma mensagem
 sendMessage() {
  if (!this.isLoggedIn) {
    this.openSnackBar(); // Mostra o Snackbar se não estiver logado
  } else {
    const message: Omit<Message, 'id'>= {
      content: this.newMessage,
      sender: this.userName, // Substituir pelo nome do usuário autenticado
      timestamp: new Date()
    };

    this.chatService.sendMessage(message)
    console.log(`Usuário: ${this.userName}, Mensagem: ${this.newMessage}`);
    this.newMessage = ''; // Limpa o campo de mensagem
  }
}

// Mostra o Snackbar com opções
openSnackBar() {
  const snackBarRef = this.snackBar.open(
    'Para enviar mensagens, você precisa criar uma conta.',
    'Criar Conta',
    { duration: 5000 }
  );

  snackBarRef.onAction().subscribe(() => {
    this.router.navigate(['/register']); // Redireciona para a rota de registro
  });

  // Adiciona botão "Fazer Login" também
  setTimeout(() => {
    const snackBarRef2 = this.snackBar.open(
      'Já tem uma conta?',
      'Fazer Login',
      { duration: 5000 }
    );

    snackBarRef2.onAction().subscribe(() => {
      this.router.navigate(['/login']); // Redireciona para a rota de login
    });
  }, 5000);
}
  }

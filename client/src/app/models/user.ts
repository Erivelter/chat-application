export interface User {
  id: number,
  name:string,
  senha: string
}

export interface Message {
  id: number;
  content: string;
  sender: string; // nooome do usuario que enviou
  timestamp: Date;
}

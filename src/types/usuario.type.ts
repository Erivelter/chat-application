export class Usuario {
    id: string;
    nome: string;
    data_criacao: Date;


   constructor(id: string, nome: string, data: Date) {
         this.id = id;
         this.nome = nome;
         this.data_criacao = data
        }
}

import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';

// Classe base para mensagens recebidas
export abstract class MsgRecebidaBase {
  @IsString() // Valida que o valor deve ser uma string.
  @IsNotEmpty() // Valida que o valor não pode ser vazio ou nulo.
  tipo!: string; // Representa o tipo da mensagem, como "message" ou "join".
}

// Classe para mensagem de texto
export class MsgRecebidaTexto extends MsgRecebidaBase {
  @IsString() // Valida que o valor do campo deve ser uma string.
  @IsNotEmpty() // Valida que o valor do campo não pode ser vazio ou nulo.
  id!: string; // Representa o identificador único da mensagem.

  @IsString() // Valida que o valor do campo deve ser uma string.
  @IsNotEmpty() // Valida que o valor do campo não pode ser vazio ou nulo.
  @Transform(({ value }) => value?.trim()) // Remove espaços em branco no início e no final do valor, se houver.
  mensagem!: string; // Representa o conteúdo textual da mensagem.
}

// Classe para mensagem de novo usuário
export class MsgRecebidaNovoUsuario extends MsgRecebidaBase {
  @IsString() // Valida que o valor do campo deve ser uma string.
  @IsNotEmpty() // Valida que o valor do campo não pode ser vazio ou nulo.
  @Transform(({ value }) => value?.trim()) // Remove espaços em branco no início e no final do valor, se houver.
  nomeUsuario!: string; // Representa o nome do novo usuário que está se conectando.
}

// Classe para tratar mensagens recebidas
export class TratarMsgRecebida {
  @IsObject() // Valida que o campo deve ser um objeto.
  @ValidateNested() // Valida as propriedades internas do objeto aninhado.
  @Type(() => MsgRecebidaBase, {
    // Configura como as mensagens recebidas serão mapeadas para suas respectivas classes.
    keepDiscriminatorProperty: true, // Mantém a propriedade "tipo" no objeto após a transformação.
    discriminator: {
      property: 'tipo', // Define qual propriedade será usada para identificar o tipo da mensagem.
      subTypes: [
        { value: MsgRecebidaTexto, name: 'message' }, // Mapeia "message" para a classe MsgRecebidaTexto.
        { value: MsgRecebidaNovoUsuario, name: 'join' }, // Mapeia "join" para a classe MsgRecebidaNovoUsuario.
      ],
    },
  })
  objMensagem!: MsgRecebidaTexto | MsgRecebidaNovoUsuario; // Aceita objetos do tipo MsgRecebidaTexto ou MsgRecebidaNovoUsuario.
}

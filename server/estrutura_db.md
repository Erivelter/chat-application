CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  senha_hash TEXT
);

CREATE TABLE salas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE chat (
  id SERIAL PRIMARY KEY,
  conteudo TEXT NOT NULL,
  data TIMESTAMP DEFAULT NOW(),
  usuario_id INT NOT NULL REFERENCES usuarios(id),
  sala_id INT NOT NULL REFERENCES salas(id)
);

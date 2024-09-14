const { sql } = require('@vercel/postgres');

async function criarTabelaUsuarios() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha TEXT NOT NULL
      )
    `;
    console.log('Tabela "usuarios" criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar a tabela de usuários:', error);
  }
}

criarTabelaUsuarios();

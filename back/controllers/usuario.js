const { sql } = require('@vercel/postgres');

async function cadastrarUsuario({ email, senha }) {
  try {
    await sql`
      INSERT INTO usuarios (email, senha)
      VALUES (${email}, ${senha})
    `;
  } catch (error) {
    console.error('Erro ao inserir usuário no banco de dados:', error);
    throw new Error('Erro no banco de dados');
  }
}

async function buscarUsuarioPorEmail(email) {
  try {
    const result = await sql`
      SELECT * FROM usuarios WHERE email = ${email}
    `;

    if (result.rowCount > 0) {
      return { status: 200, data: result.rows[0] };
    } else {
      return { status: 404, data: { error: 'usuário não encontrado.' } };
    }
  } catch (error) {
    console.error('erro ao buscar usuário no banco de dados:', error);
    return { status: 500, data: { error: 'erro ao consultar o banco de dados.' } };
  }
}

module.exports = {
  cadastrarUsuario,
  buscarUsuarioPorEmail,
};

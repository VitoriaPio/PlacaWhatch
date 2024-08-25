const { sql } = require('@vercel/postgres');
async function relatorio (cidade){
    try {
        const registros = await sql `SELECT * FROM placas WHERE cidade = ${cidade}`;
    if (registros.length === 0) {
        return {
          status: 404,
          data: {
            error: 'nenhum registo dessa cidade',
          },
        };
      }
    return {
      status: 200,
      data: result,
    };
} catch (error) {
    console.error('Database error:', error);
    return {
      status: 500,
      data: {
        error: 'Ocorreu um erro ao consultar os registros.',
      },
    };
  }

}

module.exports = {
    relatorio,
  };
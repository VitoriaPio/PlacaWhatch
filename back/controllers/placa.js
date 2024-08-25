const { sql } = require('@vercel/postgres');
async function cadastrarPlaca({ numero_placa, cidade, data, hora }) {
  try {
    await sql`
      INSERT INTO placa (numero_placa, cidade, data, hora)
      VALUES (${numero_placa}, ${cidade}, ${data}, ${hora})
    `;
  } catch (error) {
    console.error('Error inserting data into database:', error);
    throw new Error('Database error');
  }
}

async function relatorio(cidade) {
    try {
      const result = await sql`SELECT * FROM placa WHERE cidade = ${cidade}`;
      
      if (result.rowCount === 0) {

        return {
          status: 404,
          data: {
            error: 'Nenhum registro encontrado para a cidade especificada.',
          },
        };
      }
  
      return {
        status: 200,
        data: result.rows,
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
  

async function busca(placa) {
    try {
      const result = await sql`
        SELECT * FROM placas WHERE numero_placa = ${placa}
      `;
  
      if (result.length > 0) {
        return { status: 200, data: result[0] };
      } else {
        return { status: 404, data: { error: 'nenhum registro encontrado.' } };
      }
    } catch (error) {
      console.error('Database error:', error);
      return { status: 500, data: { error: 'erro ao consultar placa.' } };
    }
  }
module.exports = {
    cadastrarPlaca,
    relatorio,
    busca,
  };
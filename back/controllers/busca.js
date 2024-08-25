const { sql } = require('@vercel/postgres');

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
    busca,
};
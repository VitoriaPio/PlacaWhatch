const express = require('express');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const axios = require('axios');
const formData = require('form-data');
require('dotenv').config();

const { cadastrarPlaca, relatorio, busca } = require('../controllers/placa');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const api = 'https://api.ocr.space/parse/image';
const key = process.env.OCR_API_KEY;

function extrairPlaca(texto) {
  const regexAntigo = /[A-Z]{3}[^A-Z0-9\n]*[0-9]{4}/;
  const regexAtual = /[A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}/;

  const matchAntigo = texto.match(regexAntigo);
  const matchAtual = texto.match(regexAtual);

  if (matchAntigo) {
    return matchAntigo[0].replace(/\s/g, '').replace(/[^A-Z0-9]/g, '-');
  } else if (matchAtual) {
    return matchAtual[0].replace(/\s/g, '');
  }  
  return null;
}

router.post('/cadastro', upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file || req.file.mimetype !== 'image/png') {
        return res
          .status(400)
          .json({ error: 'somente png.' });
      }

      const currentDate = new Date();
      const dataHora = new Date(currentDate.getTime() - 3 * 60 * 60 * 1000);
      
      const dataAtual = dataHora.toISOString().split('T')[0];
      const horaAtual = dataHora.toISOString().split('T')[1].split('.')[0];

      console.log(horaAtual);
      console.log(dataAtual);
      let dados;

      const form = new formData();
      form.append('file', req.file.buffer, {
        filename: 'image.png',
        contentType: 'image/png',
      });
      form.append('detectOrientation', 'true');
      form.append('scale', 'true');
      form.append('OCREngine', '1');
      form.append('filetype', 'png');

      let options = {
        headers: {
          apikey: key,
          ...form.getHeaders(),
        },
      };

      const response = await axios.post(api, form, options);
      if (
        !response ||
        !response.data ||
        !response.data.ParsedResults ||
        !response.data.ParsedResults[0]
      ) {
        return res.status(400).json({ error: 'imagem invalida' });
      }

      const numero = extrairPlaca(
        response.data.ParsedResults[0].ParsedText
      );
      const cidade = req.body.cidade;
      if (!numero) {
        return res
          .status(400)
          .json({ error: 'numero da placa nao detectado' });
      }

      try {
        await cadastrarPlaca({
          numero_placa: numero,
          cidade,
          data: dataAtual,
          hora: horaAtual,
        });
      } catch (error) {
        console.error('Error during database operation:', error);
        return res.status(500).json({ error: 'Erro ao salvar dados.' });
      }

    res.status(200).json(dados);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
);

router.get('/consulta/:placa', async (req, res) => {
  try {
    let placa = req.params.placa;
    resultado = await busca(placa);
    console.log(resultado);
}catch (error){
  console.log(error);
}
});

router.get('/relatorio/cidade/:cidade', async (req, res) => {
  try {
    const cidade = req.params.cidade;
    const { status, data: registros } = await relatorio(cidade);

    if (status === 404) {
      return res.status(404).json(registros);
    }

    console.log(registros);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=relatorio_${cidade}.pdf`
    );
    doc.pipe(res);

    doc
      .fontSize(18)
      .text(`Relatório de Placas - Cidade: ${cidade}`, { align: 'center' });
    doc.moveDown();

    registros.forEach((registro) => {
      doc.text(`Número da Placa: ${registro.numero_placa}`);
      doc.text(`Cidade: ${registro.cidade}`);
      doc.text(`Data: ${new Date(registro.data).toISOString().split('T')[0]}`); // Format the date
      doc.text(`Hora: ${registro.hora}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao gerar o relatório.' });
  }
});


module.exports = router;

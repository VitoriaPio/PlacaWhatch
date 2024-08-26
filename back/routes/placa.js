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

      // Data response
      // console.log('API RESPONSE',response.data)

      const numero = extrairPlaca(
        response.data.ParsedResults[0].ParsedText
      );

      console.log({numero, parsedText: response.data.ParsedResults[0].ParsedText})

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
        console.error('erro no banco de dados', error);
        return res.status(500).json({ error: 'erro ao salvar dados.' });
      }

    res.status(200).json({ message: 'placa registrada com sucesso!' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.get('/consulta/:placa', async (req, res) => {
  const { placa } = req.params;

  try {
    const { status, data } = await busca(placa);

    if (status === 200) {
      return res.json({
        message: `placa ${placa} encontrada no banco`,
        data: data
      });
    } else if (status === 404) {
      return res.status(404).json(data);
    } else {
      return res.status(500).json(data);
    }
  } catch (error) {
    console.error('Error in route handler:', error);
    return res.status(500).json({ error: 'erro ao consultar placa.' });
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
    res.setHeader('Content-Disposition',`attachment; filename=${cidade}.pdf`);
    doc.pipe(res);

    doc
      .fontSize(18)
      .text(`relatório - ${cidade}`, { align: 'center' });
    doc.moveDown();

    registros.forEach((registro) => {
      doc.text(`nº da placa: ${registro.numero_placa}`);
      doc.text(`cidade: ${registro.cidade}`);
      doc.text(`data: ${new Date(registro.data).toISOString().split('T')[0]}`);
      doc.text(`hora: ${registro.hora}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'erro ao gerar relatório.' });
  }
});


module.exports = router;

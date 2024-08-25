const express = require('express');
const multer = require('multer');
const axios = require('axios');

require('dotenv').config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const api = 'https://api.ocr.space/parse/image';
const key = process.env.API;

router.post('/cadastro', upload.single('image'), async (req, res) => {
    if (!req.file || !req.body.cidade) {
      return res.status(400).json({ error: 'Imagem e cidade são obrigatórios.' });
    }

    const response = await axios.post(api, req.file.buffer, {
      headers: { key: key, 'Content-Type': 'application/octet-stream' },
    });

    const numero = response.data?.ParsedResults?.[0]?.ParsedText?.trim();
    if (!numero) {
      return res.status(400).json({ error: 'Não foi possível detectar o número da placa.' });
    }

    const dataHora = new Date().toISOString();

    console.log(dataHora);

});

module.exports = router;

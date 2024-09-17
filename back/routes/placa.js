const express = require("express");
const multer = require("multer");
const PDFDocument = require("pdfkit");
const FormData = require("form-data");
const axios = require("axios");
require("dotenv").config();

const optiic = new (require("optiic"))({
  apiKey: "3ZvKkV9Lwj7krvMcNZC7aFtdPUatBWQ8zgdG74YaBVgs",
});

const { relatorio, busca } = require("../controllers/placa");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const API_URL = "https://api.veryfi.com/api/v8/partner/documents";
const CLIENT_ID = "vrf8zaOiiybueNGYOtSwXgaTi2EUhIpPZtHaLjr";
const AUTHORIZATION = "apikey victorgb.dev:327781f1fa37dc74ce9bd92fd356da9e";

router.post("/cadastrar", upload.single("image"), async (req, res) => {
  if (!req.file || req.file.mimetype !== "image/png") {
    return res.status(400).json({ message: "Somente PNG" });
  }
  const form = new FormData();
  form.append("file", req.file.buffer);

  console.log(form);

  const config = {
    method: "post",
    url: API_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      "CLIENT-ID": CLIENT_ID,
      AUTHORIZATION: AUTHORIZATION,
      ...form.getHeaders(),
    },
    data: req.file.buffer,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json({ data: response.data });
    })
    .catch((error) => {
      console.error(JSON.stringify(error.response.data));

      return res.status(404).json({
        message: error,
      });
    });
});

router.get("/consulta/:placa", async (req, res) => {
  const { placa } = req.params;

  try {
    const { status, data } = await busca(placa);

    if (status === 200) {
      return res.json({
        message: `placa ${placa} encontrada no banco`,
        data: data,
      });
    } else if (status === 404) {
      return res.status(404).json(data);
    } else {
      return res.status(500).json(data);
    }
  } catch (error) {
    console.error("Error in route handler:", error);
    return res.status(500).json({ error: "erro ao consultar placa." });
  }
});

router.get("/relatorio/cidade/:cidade", async (req, res) => {
  try {
    const cidade = req.params.cidade;
    const { status, data: registros } = await relatorio(cidade);

    if (status === 404) {
      return res.status(404).json(registros);
    }

    console.log(registros);

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${cidade}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text(`relatório - ${cidade}`, { align: "center" });
    doc.moveDown();

    registros.forEach((registro) => {
      doc.text(`nº da placa: ${registro.numero_placa}`);
      doc.text(`cidade: ${registro.cidade}`);
      doc.text(`data: ${new Date(registro.data).toISOString().split("T")[0]}`);
      doc.text(`hora: ${registro.hora}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: "erro ao gerar relatório." });
  }
});

module.exports = router;

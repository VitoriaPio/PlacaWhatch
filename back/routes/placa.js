const express = require("express");
const multer = require("multer");
const PDFDocument = require("pdfkit");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const Optiic = require("optiic");

const { relatorio, busca } = require("../controllers/placa");

const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

const apiURL = "https://api.optiic.dev/process";
const apiKey = "3ZvKkV9Lwj7krvMcNZC7aFtdPUatBWQ8zgdG74YaBVgs";

const optiic = new Optiic({
  apiKey,
});

router.post("/cadastrar", async (req, res) => {
  const imagePath = path.join(__dirname, "./assets/we-love-optiic.png");
  const imageBuffer = fs.readFileSync(imagePath);

  // Create a new FormData instance
  const formData = new FormData();
  formData.append("image", imageBuffer, {
    contentType: "image/png",
    filename: "image.png",
  });

  // AIP Options
  let options = {
    image: formData,
    mode: "ocr",
  };

  try {
    optiic.process(options).then((data) => {
      console.log(data);
      res.json({ data });
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: e,
    });
  }
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

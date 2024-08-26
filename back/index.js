const express = require("express");
const http = require("http");
// const createSocket = require('./sockets/sockets');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const placaRota = require("./routes/placa");

app.get("/", (req, res) => {
  res.json({
    message: "API Placas Watch",
    routes: ["/api/placa"],
  });
});

app.get("/api", (req, res) => {
  res.send("😈");
});

app.use("/api/placa", placaRota);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/consultar/:placa", (req, res) => {
  const placa = req.params.placa ?? "";

  if (placa) {
    res.json({
      message: `Placa ${placa} encontrada`,
    });
  }

  res.status(404).json({
    message: "Placa não encontrada",
  });
});

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require('express');
const http = require('http');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const placaRota = require('./routes/placa');

app.get('/', (req, res) => {
  res.json({
    message: 'API Placas Watch',
    routes: [
      '/api/placa',
    ]
  })
})

app.get('/api', (req, res) => {
  res.send('😈');
});

app.use('/api/placa', placaRota);

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const express = require('express');
const http = require('http');
const createSocket = require('./sockets/sockets');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const placaRota = require('./rotas/placa');

app.get('/', (req, res) => {
  res.json({
    message: 'API Placas Watch',
    routes: [
      '/api/placas',
      // '/api/usuarios',
      // '/api/alerta',
    ]
  })
})

app.get('/api', (req, res) => {
  res.send('😈');
});

app.use('/api/placas', placaRota);
// app.use('/api/usuario', usuarioRota);
// app.use('/api/alerta', alertaRota);

const PORT = 8080;

const server = http.createServer(app);
const io = createSocket(server);
app.set('socketio', io);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
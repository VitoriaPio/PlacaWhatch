const express = require('express');
const http = require('http');
// const createSocket = require('./sockets/sockets');
const cors = require('cors');


const app = express();

app.use(cors());
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/homeVideo', (req, res) => {
    res.sendFile(__dirname + '/videos.html');
});

app.get('/videoTutoral', (req, res) => {
    const range = req.headers.range;
    const videoPath = './gato.mp4';
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, {start, end});
    stream.pipe(res);
});

app.get('/api/consultar/:placa', (req, res) => {
  const placa = req.params.placa ?? ''

  if(placa) {
    res.json({
      message: `Placa ${placa} encontrada`
    })
  }

  res.status(404).json({
    message: 'Placa não encontrada'
  })

})

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
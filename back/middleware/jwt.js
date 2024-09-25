const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function verificarJWT(req, res, next) {
  const token = req.header('x-auth-token');

  console.log(req.headers, token, secretKey)

  if (!token) {
    return res.status(401).json({ error: "Token inexistente" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Falha na autenticação" });
    }
    next();
  });
}

module.exports = verificarJWT;
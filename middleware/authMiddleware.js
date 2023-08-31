const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];


async function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json('Acesso negado. Token não fornecido.');
  }
  
  try {
    const decoded = jwt.verify(authHeader, config.secret);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    // alterar o valor de decoded -> valor fixo
    req.token = decoded;
    next();
  }  catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Sua sessão expirou. Por favor, faça login novamente.' });
    }

    res.status(401).json({ error: 'Sem autorização' });
  }
}

module.exports = authMiddleware;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models');
const User = db.User;

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

async function login(req, res) {
  const { login, password } = req.body;

  try {
    // const user = await db.User.findone({
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { cpf: login },
          { contact: login }
        ]
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Usuario ou senha invalida' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Usuario ou senha invalida' });
    }

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor, contate o suporte', error});
  }
}

/*
async function protected(req, res) {
  try {
    res.json({ message: `Bem-vindo de volta, ${req.user.name}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor, contate o suporte' });
  }
}
*/
module.exports = {
  login,
  //protected,
};
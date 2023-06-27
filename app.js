const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa as rotas
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/titleRoutes.js')

// Configuração do Body Parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/uploads', express.static('uploads'));

// Configuração das rotas
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

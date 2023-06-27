const { User, UserTitle, Title } = require('../models');
const bcrypt = require('bcrypt');

// função para criar um novo usuario
exports.createUser = async (req, res) => {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
    }

    const { name, cpf, birthdate, registration, contact, course, university, password } = req.body;
     
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, cpf, birthdate, registration, contact, course, university, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// função para recuperar todos os usuarios
exports.getAllUsers = async (req, res) => {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(401).json({ message: 'Você não tem permissão para ver os usuários.' });
    }

    const users = await User.findAll({
      include: {
        model: UserTitle,
        as: 'user_titles',
        attributes: ['id'],
        include: {
          model: Title,
          as: 'title',
          attributes: ['name'],
        },
      },
      attributes: {
        exclude: ['password'],
      },
    });    
        
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// função para recuperar um usuario pelo id
exports.getUserById = async (req, res) => {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(401).json({ message: 'Você não tem permissão para ver os usuários.' });
    }

    const user = await User.findByPk(req.params.id, {
      include: {
        model: Title,
        as: 'titles',
        attributes: ['name'],
      },
      attributes: {
        exclude: ['password'],
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// função para atualizar um usuario pelo id
exports.updateUserById = async (req, res) => {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(401).json({ message: 'Você não tem permissão atualizar os usuários.' });
    }
    const user = await User.findByPk(req.params.id);
    if (user) {
      const { name, cpf, birthdate, registration, contact, course, university, password } = req.body;
     
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      await user.update({ name, cpf, birthdate, registration, contact, course, university, password: hashedPassword });
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'usuario não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// função para excluir um usuario pelo id
exports.deleteUserById = async (req, res) => {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(401).json({ message: 'Você não tem permissão para deletar os usuários.' });
    }
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).json({ message: 'usuario excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'usuario não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const { UserTitle, User, Title } = require('../models');

// função para criar um novo titulo
async function createTitle (req, res) {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão para criar novos titulos.' });
    }

    
    const { name } = req.body;
    const title = await Title.create({ name });
    res.status(201).json(title);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// função para pegar um titulo pelo id
async function getTitleById(req, res) {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão para ver os titulos.' });
    }
    
    const { id } = req.params;
    const title = await Title.findByPk(id);
    if (!title) {
      return res.status(404).json({ message: 'Título não encontrado' });
    }
    res.status(200).json(title);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// função para ver todos os titulos
async function getAllTitles(req, res) {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão para ver os titulos.' });
    }

    const titles = await Title.findAll();
    res.status(200).json(titles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// funcao para deletar o titulo por id
async function deleteTitleById(req, res) {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão para deletar os titulos.' });
    }

    const { id } = req.params;
    const title = await Title.findByPk(id);
    if (!title) {
      return res.status(404).json({ message: 'Título não encontrado' });
    }
    await title.destroy();
    res.status(200).json({ message: 'Título removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// função para ver todos os UserTitles
async function getAllUserTitles(req, res) {
  try {
    // Verifica se o usuário logado possui a role "admin"
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão para ver os titulos de usuarios.' });
    }

    const userTitles = await UserTitle.findAll();
    res.status(200).json(userTitles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function addTitleToUser (req, res) {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão de Admin.' });
    }

    const { userId, titleId } = req.params;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    const title = await Title.findByPk(titleId);
    if (!title) {
      return res.status(404).json({ message: 'Título não encontrado' });
    }
    const userTitle = await UserTitle.create({ userId, titleId });
    return res.status(201).json({ userTitle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function removeTitleFromUser(req, res) {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão de Admin.' });
    }
  
    const { userTitleId } = req.params;
    console.log(userTitleId)
    const userTitle = await UserTitle.findByPk(userTitleId);
    if (!userTitle) {
      return res.status(404).json({ message: 'Relação usuário-título não encontrada' });
    }
    
    await userTitle.destroy();
    
    return res.status(204).json({message: "Delete ok"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getUserTitles(req, res) {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão de Admin.' });
    }

    const { userId } = req.params;
    
    const user = await User.findByPk(userId, {
      include: [{
        model: Title,
        as: 'titles'
      }]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    return res.status(200).json({ titles: user.titles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function addTitleToMultipleUsers(req, res) {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Você não tem permissão de Admin.' });
    }
    
    const { titleId, userIds } = req.body;

    const userTitles = await Promise.all(userIds.map(async (userId) => {
      const userTitle = await UserTitle.create({ userId, titleId });
      return userTitle;
    }));
    
    return res.status(201).json({ userTitles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  createTitle,
  getTitleById,
  getAllTitles,
  deleteTitleById,
  // daqui para baixo para add nos users
  addTitleToUser,
  addTitleToMultipleUsers,
  getUserTitles,
  removeTitleFromUser,
  // ver todos os userTitles
  getAllUserTitles
};


const upload = require('../services/multer');
const { User } = require('../models');

exports.uploadPhoto = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    upload.single('photo')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      user.photo = req.file.filename;
      user.save();

      return res.status(200).json({ message: 'Foto de perfil atualizada' });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




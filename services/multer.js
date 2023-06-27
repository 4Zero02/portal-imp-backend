const multer = require('multer');
const path = require('path');

// Define as opções de armazenamento
const storage = multer.diskStorage({
  // Define o destino dos arquivos
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo
  filename: (req, file, cb) => {
    // Pegar o numero do cpf para o nome do arquivo
    const cpf = req.user.dataValues.cpf;
    // Extrai a extensão do arquivo
 
    const ext = path.extname(file.originalname);
    const filename = cpf + ext;

    cb(null, filename);
  },
});

// Define as opções para o multer
const upload = multer({
  storage: storage,
  // Define a validação do tipo de arquivo
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Permitdo apenas os formatos .jpg, .jpeg e .png'));
    }
  },
});

// Exporta a função de upload
module.exports = upload;

const express = require('express');
const router = express.Router();
const { login } = require('../controller/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const uploadController = require('../controller/uploadController.js')

router.post('/login', login);

router.post('/photo', authMiddleware, uploadController.uploadPhoto)

//router.get('/protected', authMiddleware, protected);

module.exports = router;

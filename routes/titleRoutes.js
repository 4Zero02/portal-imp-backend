const express = require('express');
const router = express.Router();
const titleController = require('../controller/titleController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Rotas para o model Title
router.post('/titles', authMiddleware, titleController.createTitle);
router.get('/titles', authMiddleware, titleController.getAllTitles);
router.get('/titles/:id', authMiddleware, titleController.getTitleById);
router.delete('/titles/:id', authMiddleware, titleController.deleteTitleById);

// Rotas para o model UserTitle
router.post('/users/:userId/titles/:titleId', authMiddleware, titleController.addTitleToUser);
router.delete('/userTitles/:userTitleId', authMiddleware, titleController.removeTitleFromUser);
router.get('/users/:userId', authMiddleware, titleController.getUserTitles)
router.get('/userTitles', authMiddleware, titleController.getAllUserTitles)
router.post('/users/titles', authMiddleware, titleController.addTitleToMultipleUsers);

module.exports = router;

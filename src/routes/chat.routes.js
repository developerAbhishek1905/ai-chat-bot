const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const chatController = require('../controller/chat.controller');
const router = express.Router();


router.post('/', authMiddleware, chatController.createChat);
router.get('/history', authMiddleware, chatController.getAllChats);
router.get('/:chatId/messages', authMiddleware, chatController.getChatMessages);


module.exports = router;
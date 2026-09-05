const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST request to send message
router.post('/', chatController.sendMessage);

// GET chat history
router.get('/history', chatController.getChatHistory);

// DELETE chat history
router.delete('/history', chatController.clearHistory);

module.exports = router;

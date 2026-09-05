const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  model: {
    type: String,
    default: 'gpt-3.5-turbo'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: String
});

module.exports = mongoose.model('Chat', chatSchema);

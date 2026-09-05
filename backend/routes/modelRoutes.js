const express = require('express');
const router = express.Router();

const AVAILABLE_MODELS = [
  {
    id: 'gpt-3.5-turbo',
    name: 'ChatGPT (GPT-3.5 Turbo)',
    provider: 'OpenAI',
    description: 'Fast and efficient AI model'
  },
  {
    id: 'gpt-4',
    name: 'ChatGPT (GPT-4)',
    provider: 'OpenAI',
    description: 'Most powerful AI model'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google\'s advanced AI model'
  }
];

// Get available models
router.get('/', (req, res) => {
  res.json({
    success: true,
    models: AVAILABLE_MODELS
  });
});

// Set preferred model
router.post('/select', (req, res) => {
  try {
    const { modelId, userId } = req.body;
    res.json({
      success: true,
      message: `Model ${modelId} selected`,
      userId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Text to Speech
router.post('/tts', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    res.json({
      success: true,
      message: 'TTS endpoint ready',
      text
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Speech to Text
router.post('/stt', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'STT endpoint ready'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

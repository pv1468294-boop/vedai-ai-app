const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Text to Speech using Google Cloud
router.post('/tts', upload.none(), async (req, res) => {
  try {
    const { text, languageCode = 'en-US' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Using Google Cloud Text-to-Speech API
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
      {
        input: { text },
        voice: {
          languageCode,
          ssmlGender: 'NEUTRAL'
        },
        audioConfig: {
          audioEncoding: 'MP3'
        }
      }
    );

    res.json({
      success: true,
      audioContent: response.data.audioContent,
      message: 'Text converted to speech'
    });
  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Speech to Text using Google Cloud
router.post('/stt', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    const audioContent = req.file.buffer.toString('base64');

    // Using Google Cloud Speech-to-Text API
    const response = await axios.post(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
      {
        config: {
          encoding: 'LINEAR16',
          languageCode: 'en-US'
        },
        audio: {
          content: audioContent
        }
      }
    );

    const transcript = response.data.results
      ?.map(result => result.alternatives?.[0]?.transcript)
      .join(' ') || '';

    res.json({
      success: true,
      transcript,
      message: 'Speech converted to text'
    });
  } catch (error) {
    console.error('STT Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

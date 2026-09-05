const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('google-generative-ai');

// OpenAI Configuration
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Google Gemini Configuration
const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = {
  openaiClient,
  googleAI,
  MODELS: {
    OPENAI: 'gpt-3.5-turbo',
    GEMINI: 'gemini-pro'
  }
};

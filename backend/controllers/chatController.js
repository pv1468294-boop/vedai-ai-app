const Chat = require('../models/Chat');
const { openaiClient, googleAI, MODELS } = require('../config/aiModels');

// Send message and get AI response
exports.sendMessage = async (req, res) => {
  try {
    const { message, userId, model = MODELS.OPENAI } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and userId are required' });
    }

    let aiResponse;

    if (model === MODELS.OPENAI) {
      // OpenAI API Call
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500
      });
      aiResponse = completion.choices[0].message.content;
    } else if (model === MODELS.GEMINI) {
      // Google Gemini API Call
      const geminiModel = googleAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await geminiModel.generateContent(message);
      aiResponse = result.response.text();
    }

    // Save to database
    const chat = new Chat({
      userId,
      message,
      response: aiResponse,
      model
    });
    await chat.save();

    res.json({
      success: true,
      message,
      response: aiResponse,
      model
    });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const chats = await Chat.find({ userId }).sort({ timestamp: -1 }).limit(50);
    res.json({
      success: true,
      data: chats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear chat history
exports.clearHistory = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    await Chat.deleteMany({ userId });
    res.json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

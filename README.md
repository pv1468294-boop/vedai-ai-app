# Vedai - AI Assistant App with 3D Avatar

A complete AI assistant application similar to ChatGPT and Gemini, featuring a 3D animated avatar that tracks mouse pointer movements. Available on both web and mobile platforms.

## Features

✨ **Core Features:**
- Complete AI Assistant (ChatGPT/Gemini-like)
- 3D Avatar Animation with Mouse Pointer Tracking
- Multiple AI Models Support (OpenAI, Google Gemini, HuggingFace)
- Voice Features (Text-to-Speech & Speech-to-Text)
- Conversation History & Memory
- Real-time Chat Interface

🌐 **Platforms:**
- Web Application (React + Three.js)
- Mobile Application (React Native)
- Responsive Design

🔊 **Voice Capabilities:**
- Text-to-Speech (TTS)
- Speech-to-Text (STT)
- Natural language interaction

## Project Structure

```
vedai-ai-app/
├── backend/                 # Node.js + Express Server
│   ├── config/             # Configuration files
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── models/             # Database models
│   ├── middleware/         # Express middleware
│   └── package.json
├── web/                    # React Web Application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Pages
│   │   ├── 3d/             # Three.js 3D components
│   │   ├── services/       # API services
│   │   └── App.jsx
│   └── package.json
├── mobile/                 # React Native Mobile App
│   ├── src/
│   ├── app.json
│   └── package.json
└── docs/                   # Documentation
```

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

**Web Frontend:**
- React
- Three.js (3D Graphics)
- Axios (HTTP Client)
- Web Audio API (Voice)

**Mobile Frontend:**
- React Native
- Expo
- React Native Web Audio

**AI Integration:**
- OpenAI API (ChatGPT)
- Google Gemini API
- HuggingFace Models

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/pv1468294-boop/vedai-ai-app.git
cd vedai-ai-app
```

2. **Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
npm start
```

3. **Web Frontend Setup:**
```bash
cd web
npm install
npm start
```

4. **Mobile Frontend Setup:**
```bash
cd mobile
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedai
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
NODE_ENV=development
```

## API Endpoints

### Chat
- `POST /api/chat` - Send message to AI
- `GET /api/chat/history` - Get chat history
- `DELETE /api/chat/history` - Clear chat history

### Voice
- `POST /api/voice/tts` - Text to Speech
- `POST /api/voice/stt` - Speech to Text

### Models
- `GET /api/models` - Get available AI models
- `POST /api/models/select` - Select AI model

## Features in Development

- [ ] Advanced 3D Avatar Animations
- [ ] Multi-language Support
- [ ] Custom Avatar Customization
- [ ] Offline Mode
- [ ] Plugin System
- [ ] User Authentication
- [ ] Conversation Analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For support, email support@vedai.app or open an issue on GitHub.

---

**Created with ❤️ by Vedai Team**
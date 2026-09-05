# Vedai AI Assistant - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB
- API Keys (OpenAI, Google Gemini, Google OAuth, Facebook)

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/pv1468294-boop/vedai-ai-app.git
cd vedai-ai-app
```

2. **Create .env file** (copy from .env.example)
```bash
cp .env.example .env
```

3. **Fill in your API keys**
```env
# Backend
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vedai
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
JWT_SECRET=your_jwt_secret
GOOGLE_CLOUD_API_KEY=your_google_cloud_key
```

## 📦 Installation

### Backend
```bash
cd backend
npm install
npm run dev
```

### Web Frontend
```bash
cd web
npm install
npm start
```

### Mobile App
```bash
cd mobile
npm install
npm start
```

## 🐳 Docker Deployment

### Using Docker Compose
```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Points
- **Web App**: http://localhost
- **API**: http://localhost:5000
- **MongoDB**: mongodb://admin:password@localhost:27017

## 🔐 Authentication

### Email/Password
- Register at `/auth/register`
- Login at `/auth/login`

### OAuth (Google & Facebook)
- Login endpoints: `/auth/google`, `/auth/facebook`
- Tokens stored securely in AsyncStorage (mobile) / localStorage (web)

## 🎤 Voice Features

### Text-to-Speech (TTS)
```bash
POST /api/voice/tts
Body: { "text": "Hello world" }
```

### Speech-to-Text (STT)
```bash
POST /api/voice/stt
Content-Type: multipart/form-data
File: audio.wav
```

## 💬 Chat API

### Send Message
```bash
POST /api/chat
Body: {
  "message": "Hello",
  "userId": "user123",
  "model": "gpt-3.5-turbo"
}
```

### Get Chat History
```bash
GET /api/chat/history?userId=user123
```

### Clear History
```bash
DELETE /api/chat/history
Body: { "userId": "user123" }
```

## 🤖 AI Models Supported

- ✅ **GPT-3.5 Turbo** (OpenAI) - Fast & Efficient
- ✅ **GPT-4** (OpenAI) - Most Powerful
- ✅ **Gemini Pro** (Google) - Advanced

## 📱 Mobile App Features

- Email/Password Authentication
- Google Sign-In
- Facebook Login
- Real-time Chat
- Text-to-Speech
- Speech-to-Text
- Chat History
- Model Selection

## 🌐 Web App Features

- All mobile features
- 3D Avatar with mouse tracking
- Real-time animations
- Beautiful dark theme
- Responsive design

## 🏗️ Project Structure

```
vedai-ai-app/
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── mobile/
│   ├── src/screens/
│   ├── App.js
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify credentials

### API Key Errors
- Verify all API keys are valid
- Check key permissions
- Regenerate if needed

### OAuth Login Fails
- Verify OAuth client IDs/secrets
- Add redirect URIs in OAuth provider settings
- Check API key quotas

## 📚 API Documentation

Full API documentation is available at `/api/docs` (when running)

## 🤝 Contributing

Contributions welcome! Please follow the coding standards and submit PRs.

## 📄 License

MIT License - See LICENSE file

## 📞 Support

For issues and questions:
- GitHub Issues: https://github.com/pv1468294-boop/vedai-ai-app/issues
- Email: support@vedai.app

---

**Built with ❤️ by Vedai Team**

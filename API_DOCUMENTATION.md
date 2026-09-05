# Vedai API Documentation

## Authentication Endpoints

### Register User
```
POST /api/auth/register

Request:
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "user123",
    "email": "user@example.com"
  }
}
```

### Login User
```
POST /api/auth/login

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token",
  "user": {...}
}
```

### Google OAuth
```
POST /api/auth/google

Request:
{
  "idToken": "google_id_token"
}

Response:
{
  "success": true,
  "token": "jwt_token",
  "user": {...}
}
```

### Facebook OAuth
```
POST /api/auth/facebook

Request:
{
  "accessToken": "facebook_access_token"
}

Response:
{
  "success": true,
  "token": "jwt_token",
  "user": {...}
}
```

## Chat Endpoints

### Send Message
```
POST /api/chat

Request:
{
  "message": "Hello, how are you?",
  "userId": "user123",
  "model": "gpt-3.5-turbo"
}

Response:
{
  "success": true,
  "message": "Hello, how are you?",
  "response": "I'm doing great! How can I help?",
  "model": "gpt-3.5-turbo"
}
```

### Get Chat History
```
GET /api/chat/history?userId=user123

Response:
{
  "success": true,
  "data": [
    {
      "_id": "msg_id",
      "userId": "user123",
      "message": "Hello",
      "response": "Hi there!",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Clear Chat History
```
DELETE /api/chat/history

Request:
{
  "userId": "user123"
}

Response:
{
  "success": true,
  "message": "Chat history cleared"
}
```

## Voice Endpoints

### Text-to-Speech
```
POST /api/voice/tts

Request:
{
  "text": "Hello world",
  "languageCode": "en-US"
}

Response:
{
  "success": true,
  "audioContent": "base64_encoded_audio",
  "message": "Text converted to speech"
}
```

### Speech-to-Text
```
POST /api/voice/stt
Content-Type: multipart/form-data

Request:
- audio: audio_file.wav

Response:
{
  "success": true,
  "transcript": "Hello world",
  "message": "Speech converted to text"
}
```

## Models Endpoints

### Get Available Models
```
GET /api/models

Response:
{
  "success": true,
  "models": [
    {
      "id": "gpt-3.5-turbo",
      "name": "ChatGPT (GPT-3.5 Turbo)",
      "provider": "OpenAI",
      "description": "Fast and efficient AI model"
    },
    {
      "id": "gpt-4",
      "name": "ChatGPT (GPT-4)",
      "provider": "OpenAI",
      "description": "Most powerful AI model"
    },
    {
      "id": "gemini-pro",
      "name": "Gemini Pro",
      "provider": "Google",
      "description": "Google's advanced AI model"
    }
  ]
}
```

### Select Model
```
POST /api/models/select

Request:
{
  "modelId": "gpt-4",
  "userId": "user123"
}

Response:
{
  "success": true,
  "message": "Model gpt-4 selected",
  "userId": "user123"
}
```

## Avatar Endpoints

### Get Avatar Models
```
GET /api/avatar/models

Response:
{
  "success": true,
  "avatars": [
    {
      "id": "avatar_1",
      "name": "Default Avatar",
      "description": "3D humanoid avatar",
      "modelPath": "/models/avatar_1.glb"
    }
  ]
}
```

### Update Avatar
```
POST /api/avatar/update

Request:
{
  "userId": "user123",
  "avatarId": "avatar_1"
}

Response:
{
  "success": true,
  "message": "Avatar updated",
  "userId": "user123",
  "avatarId": "avatar_1"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication failed"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per hour per IP
- Special limits for voice features

## Webhook Events

Subscribe to events via Socket.IO:

```javascript
socket.on('message:received', (data) => {
  console.log('New message:', data);
});

socket.on('user:connected', (data) => {
  console.log('User connected:', data);
});
```

# Get Google OAuth Credentials

## Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
   - Application type: Web Application
   - Authorized JavaScript origins: http://localhost:3000, your-domain.com
   - Authorized redirect URIs: http://localhost:5000/auth/callback
5. Copy Client ID and Client Secret

## Facebook App Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs
5. Copy App ID and App Secret

## OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up/Login
3. Go to API keys section
4. Create new API key
5. Copy the key (only shown once)

## Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

## Environment Variables Template

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/vedai
MONGO_USER=admin
MONGO_PASSWORD=password

# AI APIs
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...

# OAuth
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...

# Security
JWT_SECRET=your_super_secret_jwt_key

# Google Cloud (for Voice)
GOOGLE_CLOUD_API_KEY=...

# Frontend URLs
WEB_URL=http://localhost:3000
MOBILE_URL=http://localhost:8081

# Optional: Error Tracking
SENTRY_DSN=https://...
```

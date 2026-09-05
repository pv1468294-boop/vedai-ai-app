# Vedai AI Assistant - Deployment Guide

## 🚀 Production Deployment

### Deployment Platforms

#### 1. Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create vedai-ai-app

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set GEMINI_API_KEY=your_key
# ... add all other keys

# Deploy
git push heroku main
```

#### 2. AWS/EC2
```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Clone and run
git clone https://github.com/pv1468294-boop/vedai-ai-app.git
cd vedai-ai-app
sudo docker-compose up -d
```

#### 3. DigitalOcean
```bash
# Using Docker Compose on App Platform
# Push to GitHub
# Connect repository in DigitalOcean
# Deploy via App Platform
```

#### 4. Google Cloud Run
```bash
# Build and push image
docker build -t gcr.io/your-project/vedai-backend -f backend/Dockerfile .
gcloud docker -- push gcr.io/your-project/vedai-backend

# Deploy
gcloud run deploy vedai-backend --image gcr.io/your-project/vedai-backend
```

### Database Setup

#### MongoDB Atlas (Cloud)
```bash
# 1. Create account at mongodb.com/cloud
# 2. Create cluster
# 3. Get connection string
# 4. Set MONGODB_URI in .env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/vedai?retryWrites=true&w=majority
```

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use platform secrets management
   - Rotate keys regularly

2. **API Keys**
   - Use restricted API keys
   - Set usage quotas
   - Monitor for unusual activity

3. **Database**
   - Enable authentication
   - Use IP whitelisting
   - Enable SSL/TLS
   - Regular backups

4. **JWT**
   - Use strong secret
   - Set expiration times
   - Implement refresh tokens

## 📊 Monitoring & Logging

### Application Monitoring
```bash
# Docker logs
docker-compose logs -f backend

# System metrics
docker stats
```

### Error Tracking (Sentry)
```bash
# Install Sentry
npm install @sentry/node

# Configure in backend/server.js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

## ⚙️ Performance Optimization

1. **Caching**
   - Implement Redis for caching
   - Cache AI responses
   - Cache user sessions

2. **Database Optimization**
   - Index frequently queried fields
   - Use connection pooling
   - Archive old data

3. **API Optimization**
   - Rate limiting
   - Request compression
   - CDN for static assets

## 📈 Scaling

### Horizontal Scaling
```bash
# Load balancer (Nginx)
# Multiple backend instances
# Database replication
```

### Vertical Scaling
```bash
# Upgrade server resources
# Increase memory limits
# Optimize code
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        run: |
          git push https://heroku:${{ secrets.HEROKU_API_KEY }}@git.heroku.com/vedai-ai-app.git main
```

## 📞 Support

For deployment issues, contact: support@vedai.app

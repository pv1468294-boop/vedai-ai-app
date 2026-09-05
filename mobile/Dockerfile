FROM node:18-alpine

WORKDIR /app

# Install expo-cli globally
RUN npm install -g expo-cli eas-cli

COPY mobile/package*.json ./
RUN npm ci

COPY mobile/ .

EXPOSE 19000 19001 19002

CMD ["expo", "start", "--tunnel"]

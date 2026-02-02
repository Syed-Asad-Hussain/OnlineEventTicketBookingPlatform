FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY backend ./backend
COPY frontend ./frontend

# Create uploads directory
RUN mkdir -p backend/uploads

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start server
CMD ["node", "backend/server.js"]

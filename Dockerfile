# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the application
RUN echo "=== Starting build ===" && \
    npm run build || (echo "❌ Build failed!" && exit 1) && \
    echo "=== Build completed successfully ===" && \
    echo "=== Checking build output ===" && \
    ls -la /app/ && \
    echo "=== Checking if dist exists ===" && \
    (test -d /app/dist && echo "✅ dist directory exists" || (echo "❌ dist directory NOT found" && exit 1)) && \
    echo "=== Contents of dist ===" && \
    ls -la /app/dist/ && \
    echo "=== Looking for index.html ===" && \
    (test -f /app/dist/index.html && echo "✅ Found dist/index.html") || \
    (echo "⚠️ index.html not found. Searching..." && \
     find /app/dist -name "index.html" | head -5 && \
     echo "First few files found:" && \
     find /app/dist -type f | head -10)

# Production stage with nginx
FROM nginx:alpine AS production

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verify files are copied
RUN echo "=== Verifying copied files ===" && \
    echo "=== Current directory ===" && \
    pwd && \
    echo "=== Contents of /usr/share/nginx/html ===" && \
    ls -la /usr/share/nginx/html/ && \
    echo "=== Checking for index.html ===" && \
    (test -f /usr/share/nginx/html/index.html && echo "✅ Found index.html") || \
    (echo "⚠️ index.html not found. Contents:" && \
     find /usr/share/nginx/html -type f 2>/dev/null | head -20 || echo "No files found") && \
    echo "=== Checking nginx config ===" && \
    (test -f /etc/nginx/conf.d/default.conf && echo "✅ Nginx config found") || \
    echo "⚠️ Nginx config not found"

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


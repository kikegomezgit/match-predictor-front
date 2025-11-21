// In production, use relative path to proxy through Vercel (avoids CORS)
// In development, use direct backend URL or environment variable
// Use Vite's built-in PROD flag (automatically true when built for production)
const isProduction = import.meta.env.PROD;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isProduction ? '/api' : 'http://localhost:3000');

// Debug logging (remove in production if needed)
  console.log('API Config:', {
    PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE,
    ENVIRONMENT: import.meta.env.ENVIRONMENT,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    API_BASE_URL,
  });


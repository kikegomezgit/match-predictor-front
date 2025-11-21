// In production, use relative path to proxy through Vercel (avoids CORS)
// In development, use direct backend URL or environment variable
const isProduction = import.meta.env.ENVIRONMENT === 'production';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isProduction ? '/api' : 'http://localhost:3000');


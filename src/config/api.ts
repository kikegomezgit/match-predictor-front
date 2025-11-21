// In production, use relative path to proxy through Vercel (avoids CORS)
// In development, use direct backend URL or environment variable
// Use Vite's built-in PROD flag (automatically true when built for production)
const isProduction = import.meta.env.PROD;

// Check if we're on Vercel production (window.location.hostname includes vercel.app)
const isVercelProduction = typeof window !== 'undefined' && 
  (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com'));

// Force /api in production OR if on Vercel (even if PROD flag isn't set correctly)
const shouldUseProxy = isProduction || isVercelProduction;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (shouldUseProxy ? '/api' : 'http://localhost:3000');

// Always log to debug (helps identify the issue)
console.log('[API Config]', {
  PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
  isVercelProduction,
  shouldUseProxy,
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_BASE_URL,
});


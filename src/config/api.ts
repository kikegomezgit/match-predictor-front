// In production, use relative path to proxy through Vercel (avoids CORS)
// In development, use direct backend URL or environment variable

// Function to get API base URL (called at runtime)
function getApiBaseUrl(): string {
  // FIRST: Runtime check - are we on Vercel? (highest priority)
  // This overrides everything, including VITE_API_BASE_URL
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isVercel = hostname.includes('vercel.app') || hostname.includes('vercel.com');
    
    if (isVercel) {
      // ALWAYS use /api proxy when on Vercel (ignores VITE_API_BASE_URL)
      return '/api';
    }
  }

  // SECOND: Check if explicit env var is set (for local dev overrides)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // THIRD: Build-time check - production build
  if (import.meta.env.PROD) {
    return '/api';
  }

  // DEFAULT: localhost for development
  return 'http://localhost:3000';
}

// Export the API base URL (evaluated when module loads, but function checks runtime)
// Note: This will be evaluated once, but getApiBaseUrl() checks window at that time
export const API_BASE_URL = getApiBaseUrl();


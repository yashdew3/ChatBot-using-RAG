import axios from 'axios';

// API CLIENT - Auto-detects environment (local/production)
const getBaseURL = () => {
  // Check if we have a production environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Check if we're in production based on hostname
  if (window.location.hostname.includes('onrender.com')) {
    return 'https://chatbot-rag-backend.onrender.com';
  }
  
  // Default to local development
  return 'http://localhost:8000';
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout for document processing
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    const environment = config.baseURL?.includes('localhost') ? 'LOCAL' : 'PRODUCTION';
    console.log(`🚀 ${environment} API Request:`, config.method?.toUpperCase(), config.url);
    console.log(`🌐 Base URL: ${config.baseURL}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.message);
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('🔥 Local backend not running! Start with:');
      console.error('   & "E:\\chatbot\\chatbot-mvp\\Chatbot - Copy\\backend\\start_supabase.bat"');
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout - Document processing took too long');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
import axios from 'axios';

// LOCAL DEVELOPMENT API CLIENT - For Admin Document Upload
// This connects to your local Supabase backend for document management
const apiClient = axios.create({
  // Local backend for admin operations
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout for document processing
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 LOCAL API Request:', config.method?.toUpperCase(), config.url);
    console.log('🏠 Using LOCAL backend for admin operations');
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
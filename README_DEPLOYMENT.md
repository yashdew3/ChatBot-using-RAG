# 🚀 ChatBot using RAG - Complete Deployment Guide

## 📋 **Project Overview**
- **Repository**: `ChatBot-using-RAG` by yashdew3
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: FastAPI + Supabase + Google Gemini AI
- **Storage**: MongoDB + Supabase Vector Database
- **AI**: RAG (Retrieval Augmented Generation) with document chunking

## 🛠 **Pre-Deployment Setup**

### 1. **Environment Variables Required**
Create these environment variables in Render:

**Backend Environment Variables:**
```
GOOGLE_API_KEY=your_google_gemini_api_key
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=https://kfekhrbilvrobunqwgzd.supabase.co
PORT=8000
```

**Frontend Environment Variables:**
```
VITE_API_BASE_URL=https://chatbot-rag-backend.onrender.com
```

### 2. **API Keys Setup**
- **Google Gemini API**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Supabase**: Get from your [Supabase Dashboard](https://supabase.com/dashboard)

⚠️ **SECURITY**: Never commit .env files to GitHub! Environment variables are now properly excluded.

## 🚀 **Complete Deployment Process**

### **Step 1: GitHub Repository Setup**

1. **Initialize Git** (if not already done):
```bash
cd "E:\chatbot\chatbot-mvp\Chatbot - Copy - Copy"
git init
git add .
git commit -m "Initial commit: ChatBot using RAG"
```

2. **Connect to GitHub**:
```bash
git remote add origin https://github.com/yashdew3/ChatBot-using-RAG.git
git branch -M main
git push -u origin main
```

### **Step 2: Backend Deployment on Render**

1. **Go to** [Render Dashboard](https://render.com/dashboard)
2. **Create New > Web Service**
3. **Connect Repository**: `yashdew3/ChatBot-using-RAG`
4. **Configuration**:

```yaml
Name: chatbot-rag-backend
Runtime: Python 3
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main_supabase:app --host 0.0.0.0 --port $PORT
```

5. **Environment Variables**:
   - Add all backend environment variables listed above
   - Set `PORT=8000`

6. **Deploy**: Click "Create Web Service"

### **Step 3: Frontend Deployment on Render**

1. **Create New > Static Site**
2. **Connect Repository**: `yashdew3/ChatBot-using-RAG`
3. **Configuration**:

```yaml
Name: chatbot-rag-frontend
Branch: main
Root Directory: /
Build Command: npm ci && npm run build
Publish Directory: dist
Auto-Deploy: Yes
```

4. **Environment Variables**:
   - `VITE_API_BASE_URL=https://chatbot-rag-backend.onrender.com`

5. **Deploy**: Click "Create Static Site"

### **Step 4: Update CORS Configuration**

After deployment, update the backend CORS settings:

1. **Edit** `backend/main_supabase.py`
2. **Update FRONTEND_URLS**:
```python
FRONTEND_URLS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://chatbot-rag-frontend.onrender.com",  # Your actual frontend URL
    "https://*.onrender.com"
]
```

3. **Commit and Push**:
```bash
git add .
git commit -m "Update: CORS configuration for production"
git push origin main
```

## 🔧 **Project Structure for Render**

```
ChatBot-using-RAG/
├── backend/                 # Backend directory
│   ├── main_supabase.py    # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── runtime.txt         # Python version
│   └── ...
├── src/                    # Frontend source
├── public/                 # Static assets
├── package.json           # Frontend dependencies
├── vite.config.ts         # Vite configuration
├── index.html             # Entry point
└── README_DEPLOYMENT.md   # This file
```

## 🌐 **Expected URLs**

After successful deployment:

- **Backend API**: `https://chatbot-rag-backend-1ima.onrender.com`
- **Frontend App**: `https://chatbot-rag-frontend.onrender.com` (update with your actual URL)
- **API Documentation**: `https://chatbot-rag-backend-1ima.onrender.com/docs`

## ✅ **Testing Deployment**

### 1. **Backend Health Check**
Visit: `https://chatbot-rag-backend-1ima.onrender.com/health`

### 2. **Frontend Access**
Visit: `https://chatbot-rag-frontend.onrender.com`

### 3. **Full Workflow Test**
1. Open frontend URL
2. Go to Admin Dashboard
3. Upload a PDF document
4. Go to Chat and ask questions about the document

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors**: Update FRONTEND_URLS in backend
2. **API Connection Failed**: Check VITE_API_BASE_URL
3. **Build Failures**: Check logs in Render dashboard
4. **Environment Variables**: Ensure all required variables are set

### **Logs Access:**
- **Backend**: Render Dashboard > chatbot-rag-backend > Logs
- **Frontend**: Render Dashboard > chatbot-rag-frontend > Logs

## 🎯 **Features**

- ✅ **RAG-powered Chatbot**: Answers based on uploaded documents
- ✅ **Document Upload**: PDF processing and chunking
- ✅ **Vector Search**: Supabase vector database integration
- ✅ **Admin Dashboard**: Knowledge base management
- ✅ **Responsive UI**: Modern design with Tailwind CSS
- ✅ **Real-time Chat**: Interactive chat interface

## 📞 **Support**

If you encounter issues:
1. Check Render deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check CORS configuration

Your RAG-powered chatbot is now ready for production! 🎉
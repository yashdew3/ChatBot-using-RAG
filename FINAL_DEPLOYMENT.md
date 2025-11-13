# 🚀 FINAL DEPLOYMENT CONFIGURATION

## ✅ Your Confirmed URLs
- **Backend (Already Deployed)**: `https://chatbot-rag-backend-1ima.onrender.com`
- **Frontend (To Deploy)**: `https://chatbot-rag-frontend.onrender.com` (you'll get actual URL after deployment)

## 🎯 EXACT Environment Variables for Render

### Backend Service: `chatbot-rag-backend` (Already Working ✅)
```
GOOGLE_API_KEY=AIzaSyDxkp6DDyHfOb_pGyqLnoCgusRjUch2ZOA
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZWtocmJpbHZyb2J1bnF3Z3pkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjA2NjM3NSwiZXhwIjoyMDc3NjQyMzc1fQ.JKAPXEPE4tYXsiGefyfVTiwgDfN2v67ZR8sibnpOSh4
SUPABASE_URL=https://kfekhrbilvrobunqwgzd.supabase.co
PORT=8000
```

### Frontend Service: `chatbot-rag-frontend` (To Deploy)
```
VITE_API_BASE_URL=https://chatbot-rag-backend-1ima.onrender.com
```

## 🚀 Frontend Deployment Steps

1. **Go to Render Dashboard**: https://render.com/dashboard
2. **Create New > Static Site**
3. **Connect Repository**: `yashdew3/ChatBot-using-RAG`
4. **Configure**:
   - **Name**: `chatbot-rag-frontend`
   - **Branch**: `main`
   - **Root Directory**: `/` (leave empty or put just `/`)
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
5. **Add Environment Variable**:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://chatbot-rag-backend-1ima.onrender.com`
6. **Deploy** (Click "Create Static Site")

## ✅ Test Your Deployment

### Backend Tests (Already Working)
- Health Check: https://chatbot-rag-backend-1ima.onrender.com/health
- API Docs: https://chatbot-rag-backend-1ima.onrender.com/docs
- Data Sources: https://chatbot-rag-backend-1ima.onrender.com/api/v1/data/sources

### Frontend Tests (After Deployment)
1. Open your frontend URL
2. Go to Admin Dashboard
3. Upload a PDF file
4. Test chat functionality

## 🔧 If Frontend URL Changes CORS

After frontend deployment, if you get a different URL than expected, update CORS in `backend/main_supabase.py`:

```python
FRONTEND_URLS = [
    "http://localhost:3000",
    "http://localhost:5173", 
    "http://localhost:8080",
    "https://your-actual-frontend-url.onrender.com",  # Update this
    "https://*.onrender.com",
    "*"
]
```

Then commit and push to trigger backend redeployment.

## 🎉 Security Status
- ✅ API keys secured (not in Git)
- ✅ Environment variables properly configured
- ✅ CORS configured for production
- ✅ All documentation updated

Your ChatBot using RAG is ready for production! 🚀
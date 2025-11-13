# 🚀 Deployment Checklist for ChatBot using RAG

## ✅ Pre-Deployment Checklist

### GitHub Setup
- [ ] Repository created: `yashdew3/ChatBot-using-RAG`
- [ ] All files committed and pushed to main branch
- [ ] .gitignore properly configured
- [ ] Environment variables template created

### API Keys & Services
- [ ] Google Gemini API key obtained
- [ ] Supabase project configured
- [ ] Supabase anon key obtained
- [ ] Supabase URL confirmed

## 🎯 Render Deployment Steps

### Backend Deployment (chatbot-rag-backend)
- [ ] Create Web Service on Render
- [ ] Connect GitHub repository: `yashdew3/ChatBot-using-RAG`
- [ ] Configure settings:
  - [ ] Name: `chatbot-rag-backend`
  - [ ] Runtime: Python 3
  - [ ] Branch: main
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `pip install -r requirements.txt`
  - [ ] Start Command: `uvicorn main_supabase:app --host 0.0.0.0 --port $PORT`
- [ ] Add Environment Variables:
  - [ ] `GOOGLE_API_KEY`
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_URL`
  - [ ] `PORT=8000`
- [ ] Deploy and verify: `/health` endpoint works

### Frontend Deployment (chatbot-rag-frontend)  
- [ ] Create Static Site on Render
- [ ] Connect GitHub repository: `yashdew3/ChatBot-using-RAG`
- [ ] Configure settings:
  - [ ] Name: `chatbot-rag-frontend`
  - [ ] Branch: main
  - [ ] Root Directory: `/` (root)
  - [ ] Build Command: `npm ci && npm run build`
  - [ ] Publish Directory: `dist`
- [ ] Add Environment Variables:
  - [ ] `VITE_API_BASE_URL=https://chatbot-rag-backend.onrender.com`
- [ ] Deploy and verify: Frontend loads correctly

## 🔧 Post-Deployment Configuration

### CORS Update
- [ ] Update backend CORS with actual frontend URL
- [ ] Commit and push CORS changes
- [ ] Verify backend redeploys automatically

### Testing
- [ ] Backend health check: `https://chatbot-rag-backend-1ima.onrender.com/health`
- [ ] Frontend access: `https://chatbot-rag-frontend.onrender.com` (update with actual URL)
- [ ] API documentation: `https://chatbot-rag-backend-1ima.onrender.com/docs`
- [ ] End-to-end test:
  - [ ] Access admin dashboard
  - [ ] Upload a PDF document
  - [ ] Ask questions in chat
  - [ ] Verify RAG responses

## 📋 Suggested Service Names

### Backend Service
**Name**: `chatbot-rag-backend`
**URL**: `https://chatbot-rag-backend-1ima.onrender.com`

### Frontend Service  
**Name**: `chatbot-rag-frontend`
**URL**: `https://chatbot-rag-frontend.onrender.com`

## 🚨 Common Issues & Solutions

### Build Failures
- [ ] Check build logs in Render dashboard
- [ ] Verify all dependencies in requirements.txt/package.json
- [ ] Ensure Python version matches runtime.txt

### CORS Errors
- [ ] Verify frontend URL in backend CORS configuration
- [ ] Check environment variables are set correctly
- [ ] Ensure API base URL is correct in frontend

### Environment Variables
- [ ] All required variables set in Render
- [ ] No typos in variable names
- [ ] API keys are valid and active

## 📞 Support Resources
- Render Documentation: https://render.com/docs
- GitHub Repository: https://github.com/yashdew3/ChatBot-using-RAG
- Deployment Guide: README_DEPLOYMENT.md

---
*Last Updated: November 2025*
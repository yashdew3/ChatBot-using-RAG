# 🔧 LOCAL ADMIN SETUP GUIDE

## 🎯 Purpose
This guide helps you run the admin panel locally to upload documents to Supabase, while users interact with the deployed chatbot on Render.

## 🏗️ Architecture
```
LOCAL ADMIN (You) ──► SUPABASE DATABASE ◄── DEPLOYED FRONTEND (Users)
    ↓                      ↑                        ↑
Document Upload      Document Storage         Document Retrieval
Admin Interface      & AI Processing          & Chat Interface
```

## 🚀 Quick Setup

### 1. Switch to Local Admin Mode
```bash
# Switch to admin version (includes admin routes)
copy src\App.local.tsx src\App.tsx

# Switch to local API client (connects to localhost:8000)
copy src\services\api.local.ts src\services\api.ts
```

### 2. Start Local Backend
```bash
# Start the Supabase backend locally
& "E:\chatbot\chatbot-mvp\Chatbot - Copy\backend\start_supabase.bat"
```

### 3. Start Frontend
```bash
# Start the development server
npm run dev
```

### 4. Access Admin Panel
- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Backend API**: http://localhost:8000

## 📤 Upload Documents

1. **Go to Admin Panel**: http://localhost:5173/admin/knowledge-base
2. **Upload PDF files**: Documents will be stored in Supabase
3. **Verify Upload**: Check Supabase dashboard for new documents

## ✅ Verify Setup

### Test Local Backend:
Visit: http://localhost:8000/test

**Expected Response:**
```json
{
  "status": "success",
  "supabase_configured": true,
  "gemini_configured": true,
  "storage_mode": "supabase"
}
```

### Test Document Upload:
1. Upload a PDF in admin panel
2. Check for success message
3. Documents appear in Supabase `documents` table

### Test User Experience:
Visit deployed frontend: https://ai-chatbot-frontend-97tm.onrender.com
- Ask questions about uploaded documents
- Should get AI responses based on uploaded content

## 🔄 Switch Back to Production Mode

When you're done with admin tasks:

```bash
# Switch back to production version (no admin routes)
copy src\App.production.tsx src\App.tsx

# Switch back to production API client (connects to Render backend)
copy src\services\api.production.ts src\services\api.ts
```

## 📊 Data Flow

1. **You (Admin)**: Upload documents via localhost admin panel
2. **Supabase**: Stores documents and chunks persistently
3. **Users**: Chat via deployed frontend at Render
4. **AI Responses**: Generated from documents you uploaded

**Perfect separation: You manage content locally, users chat on the deployed site!**

## 🛠️ Troubleshooting

**❌ Backend not starting:**
- Check environment variables in backend/.env
- Ensure Supabase credentials are correct

**❌ Admin panel not loading:**
- Verify you're using App.local.tsx
- Check console for routing errors

**❌ Document upload failing:**
- Check backend logs for errors
- Verify Supabase connection and permissions

**❌ Users not getting responses:**
- Check if documents were successfully uploaded to Supabase
- Verify deployed backend is connecting to same Supabase project
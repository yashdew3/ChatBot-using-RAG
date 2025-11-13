@echo off
echo ================================================
echo    ChatBot using RAG - Deployment Setup
echo ================================================
echo.

echo [1/4] Checking Git status...
git status

echo.
echo [2/4] Adding all files to Git...
git add .

echo.
echo [3/4] Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Deploy: ChatBot using RAG with updated configuration

git commit -m "%commit_message%"

echo.
echo [4/4] Pushing to GitHub...
git push origin main

echo.
echo ================================================
echo   Deployment files prepared and pushed!
echo ================================================
echo.
echo Next steps:
echo 1. Go to https://render.com/dashboard
echo 2. Create Backend Web Service with these settings:
echo    - Name: chatbot-rag-backend
echo    - Repository: yashdew3/ChatBot-using-RAG
echo    - Root Directory: backend
echo    - Build Command: pip install -r requirements.txt
echo    - Start Command: uvicorn main_supabase:app --host 0.0.0.0 --port $PORT
echo.
echo 3. Create Frontend Static Site with these settings:
echo    - Name: chatbot-rag-frontend
echo    - Repository: yashdew3/ChatBot-using-RAG
echo    - Build Command: npm ci ^&^& npm run build
echo    - Publish Directory: dist
echo.
echo 4. Add Environment Variables:
echo    Backend: GOOGLE_API_KEY, SUPABASE_ANON_KEY, SUPABASE_URL, PORT=8000
echo    Frontend: VITE_API_BASE_URL=https://chatbot-rag-backend-1ima.onrender.com
echo.
pause
@echo off
echo 🔧 Switching to LOCAL ADMIN MODE...
echo.

REM Switch to admin version with all routes
copy "src\App.local.tsx" "src\App.tsx" >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Could not find App.local.tsx
    pause
    exit
)

REM Switch to local API client  
copy "src\services\api.local.ts" "src\services\api.ts" >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Could not find api.local.ts
    pause
    exit
)

echo ✅ Switched to LOCAL ADMIN mode
echo.
echo 📁 Files updated:
echo    - src/App.tsx (now includes admin routes)
echo    - src/services/api.ts (now connects to localhost:8000)
echo.
echo 🚀 Next steps:
echo    1. Start backend: start_supabase.bat
echo    2. Start frontend: npm run dev
echo    3. Access admin: http://localhost:5173/admin
echo.
pause
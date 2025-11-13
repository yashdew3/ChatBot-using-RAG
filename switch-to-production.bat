@echo off
echo 🚀 Switching to PRODUCTION MODE...
echo.

REM Switch to production version (no admin routes)
copy "src\App.production.tsx" "src\App.tsx" >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Could not find App.production.tsx
    pause
    exit
)

REM Switch to production API client
copy "src\services\api.production.ts" "src\services\api.ts" >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Could not find api.production.ts
    pause
    exit
)

echo ✅ Switched to PRODUCTION mode
echo.
echo 📁 Files updated:
echo    - src/App.tsx (now clean ChatDemo only)
echo    - src/services/api.ts (now connects to Render backend)
echo.
echo 🎯 This version is ready for:
echo    - Building for deployment
echo    - Public user access
echo    - No admin routes exposed
echo.
pause
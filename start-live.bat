@echo off
echo ========================================================
echo  Starting Anu Constructions Frontend (Connected to Live Render)
echo ========================================================
echo.
echo Target Backend: https://anu-constructions.onrender.com
echo.
start "Frontend (Live Render Mode)" cmd /k "cd frontend && npm run dev:live"
echo Frontend launched targeting live Render backend!
echo ========================================================
pause

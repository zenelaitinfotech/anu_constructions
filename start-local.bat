@echo off
echo ========================================================
echo  Starting Anu Constructions (Local Backend + Frontend)
echo ========================================================
echo.
echo Starting Spring Boot Backend on http://localhost:8080...
start "Backend (Spring Boot)" cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo Starting Vite React Frontend...
start "Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers launched in separate terminal windows.
echo Frontend: http://localhost:5173 (or next free port)
echo Backend API: http://localhost:8080/api
echo ========================================================
pause

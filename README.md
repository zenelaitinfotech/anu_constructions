# Anu Building Constructions

A full-stack enterprise web portal for **Anu Building Constructions**.

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Recharts
- **Backend**: Java 17, Spring Boot 3.2.5, Spring Security, Spring Data JPA (PostgreSQL / H2)
- **Live Deployment**: Render ([https://anu-constructions.onrender.com](https://anu-constructions.onrender.com))

---

## Quick Start (Local Run)

### Option 1: 1-Click Launch (Windows)
Double-click `start-local.bat` in the project root. This opens both:
1. Spring Boot Backend on `http://localhost:8080`
2. Vite Frontend on `http://localhost:5173` (or `http://localhost:5174`)

---

### Option 2: Run From Terminal

#### 1. Backend (Spring Boot)
```bash
cd backend
./mvnw.cmd spring-boot:run
```
- API Base URL: `http://localhost:8080/api`
- Uses in-memory H2 database automatically if no PostgreSQL is configured.
- Seed data for projects, services, insights, leadership, and ESG are loaded automatically.

#### 2. Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
- Frontend will open on `http://localhost:5173` (or `http://localhost:5174`).
- Automatically communicates with `http://localhost:8080`.

---

## Running with Live Render Backend

If you want to run the frontend locally without running the Java backend locally, or if you want to test against live production data:

### Option 1: 1-Click Launch
Double-click `start-live.bat` in the project root.

### Option 2: Command Line
```bash
cd frontend
npm run dev:live
```
This launches the frontend with `VITE_API_URL=https://anu-constructions.onrender.com`.

---

## Live Render Deployment

When building or deploying the frontend for production on Render:
```bash
cd frontend
npm run build
```
The application dynamically detects if it is hosted on a live domain and routes all API traffic to `https://anu-constructions.onrender.com` automatically.

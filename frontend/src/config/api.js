// Central API configuration
// Auto-detects local vs live Render deployment, supports manual override & fallback
const getApiBase = () => {
  // 1. Manual override via localStorage (can be toggled in browser console or dev)
  if (typeof window !== "undefined") {
    const override = localStorage.getItem("VITE_API_URL");
    if (override) return override;
  }

  // 2. Running in browser: check hostname
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
    
    // If running on a live/deployed domain (Render, Vercel, Netlify, custom domain),
    // NEVER point to localhost:8080 even if VITE_API_URL was baked during build
    if (!isLocalhost) {
      const envUrl = import.meta.env.VITE_API_URL;
      if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
        return envUrl;
      }
      return "https://anu-constructions.onrender.com";
    }
  }

  // 3. Running locally: use VITE_API_URL if set, otherwise default to local backend
  return import.meta.env.VITE_API_URL || "http://localhost:8080";
};

const API_BASE = getApiBase();

export const getImageUrl = (url) => {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }
  if (trimmed.startsWith("/uploads/")) {
    return `${API_BASE}${trimmed}`;
  }
  if (trimmed.startsWith("uploads/")) {
    return `${API_BASE}/${trimmed}`;
  }
  return trimmed;
};

export default API_BASE;


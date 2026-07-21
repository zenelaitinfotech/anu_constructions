// Central API configuration
// Auto-detects local vs production backend deployment
const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8080" : "https://anu-constructions.onrender.com");

export default API_BASE;

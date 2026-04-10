import axios from "axios";

// In production builds, set VITE_API_URL on the host (e.g. Vercel) to your API, e.g.
// https://your-service.onrender.com/api — never localhost; the browser would call the user's own machine.
const baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "");

if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.error(
    "[Agri Tracker] VITE_API_URL is not set. In Vercel: Settings → Environment Variables → " +
      "VITE_API_URL = https://<your-api-host>/api, then redeploy."
  );
}

const api = axios.create({
  baseURL: baseURL || "/api",
  withCredentials: true, // sends httpOnly cookie on cross-origin requests when CORS + cookie SameSite allow it
});

export default api;

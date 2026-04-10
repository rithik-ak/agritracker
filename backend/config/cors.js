/**
 * FRONTEND_URL: comma-separated origins, no trailing slashes, e.g.
 *   https://myapp.vercel.app,https://myapp-git-main-user.vercel.app
 * ALLOW_VERCEL_PREVIEWS=true: also allow any https://*.vercel.app (less strict; use only if you accept that tradeoff).
 */
function parseAllowedOrigins() {
  const raw = process.env.FRONTEND_URL || "http://localhost:5173";
  return raw
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

function isVercelPreviewOrigin(origin) {
  if (process.env.ALLOW_VERCEL_PREVIEWS !== "true") return false;
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "https:") return false;
    return hostname === "vercel.app" || hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function isOriginAllowed(origin) {
  if (!origin) return true;
  const list = parseAllowedOrigins();
  if (list.includes(origin)) return true;
  if (isVercelPreviewOrigin(origin)) return true;
  return false;
}

/** Options for `cors` package and Socket.IO (same shape). */
const dynamicCors = {
  origin(origin, callback) {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    callback(null, false);
  },
  credentials: true,
};

module.exports = { dynamicCors, isOriginAllowed, parseAllowedOrigins };

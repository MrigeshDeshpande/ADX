import { jwtVerify } from "jose";
import { randomUUID } from "node:crypto";

const secretKey = process.env.JWT_SECRET || "skillyards_secret_key_change_me_in_prod";
const encodedKey = new TextEncoder().encode(secretKey);

// ── RATE LIMITER (Systemic Resilience - Sliding Window) ──
// We use a global variable to persist state across hot-reloads in dev mode.
const rateTracker = global.rateTracker || new Map();
if (process.env.NODE_ENV !== "production") global.rateTracker = rateTracker;

const MAX_RATE_KEYS = 5000;
const WINDOW_MS = 15000; 
const BURST_LIMIT = 3;

/**
 * Checks if a request is within the rate limit (Sliding Window).
 */
export function checkRateLimit(key) {
  const now = Date.now();
  const entry = rateTracker.get(key);

  // Auto-Cleanup logic if map gets too large
  if (rateTracker.size > MAX_RATE_KEYS) {
    const cutoff = now - WINDOW_MS;
    for (const [k, v] of rateTracker) {
      if (v.timestamp < cutoff) rateTracker.delete(k);
    }
  }

  if (entry && (now - entry.timestamp) < WINDOW_MS) {
    if (entry.count >= BURST_LIMIT) {
      return { 
        limited: true, 
        retryAfterMs: WINDOW_MS - (now - entry.timestamp) 
      };
    }
    entry.count++;
    return { limited: false };
  }

  // New window or expired
  rateTracker.set(key, { count: 1, timestamp: now });
  return { limited: false };
}

/**
 * Decrypts and validates a JWT token.
 */
export async function decrypt(token, requestId = "unknown") {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    const logData = {
      event: "AUTH_DECRYPT_FAILURE",
      requestId,
      error: error.code || error.message,
      timestamp: new Date().toISOString(),
    };
    
    if (error.code === 'ERR_JWT_EXPIRED') {
      console.warn("[AUTH] Token expired", logData);
    } else {
      console.error("[AUTH] Verification failed", logData);
    }
    
    return null;
  }
}

/**
 * Standardized Context Generator.
 * Extracts requestId, adds timings, and returns session.
 */
export async function getRequestContext(req) {
  const startTime = Date.now();
  const requestId = req.headers.get("x-request-id") || randomUUID();
  
  const ctx = {
    requestId,
    startTime,
    session: null,
    log: (msg, data = {}) => {
      console.log(`[${requestId}] ${msg}`, { 
        ...data, 
        latencyMs: Date.now() - startTime,
        timestamp: new Date().toISOString() 
      });
    },
    warn: (msg, data = {}) => {
      console.warn(`[${requestId}] ${msg}`, { 
        ...data, 
        latencyMs: Date.now() - startTime,
        timestamp: new Date().toISOString() 
      });
    },
    error: (msg, data = {}) => {
      console.error(`[${requestId}] ${msg}`, { 
        ...data, 
        latencyMs: Date.now() - startTime,
        timestamp: new Date().toISOString() 
      });
    }
  };

  const cookie = req.cookies?.get?.("session")?.value;
  if (cookie) {
    ctx.session = await decrypt(cookie, requestId);
  }

  return ctx;
}

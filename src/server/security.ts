/**
 * Security utilities for the user-facing site.
 * Covers: rate limiting, IP blocking, input sanitization, bot detection.
 */

// ── Sliding window rate limiter ──
const windows = new Map<string, number[]>();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const LIMITS: Record<string, RateLimitConfig> = {
  commission: { maxRequests: 3, windowMs: 10 * 60_000 }, // 3 submissions per 10 min
  api: { maxRequests: 30, windowMs: 60_000 }, // 30 reads per minute
};

export function checkRateLimit(
  ip: string,
  endpoint: string = "api",
): { allowed: boolean; remaining: number } {
  const config = LIMITS[endpoint] ?? LIMITS.api;
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const cutoff = now - config.windowMs;

  let timestamps = windows.get(key) ?? [];
  timestamps = timestamps.filter((t) => t > cutoff);

  if (timestamps.length >= config.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  windows.set(key, timestamps);
  return { allowed: true, remaining: config.maxRequests - timestamps.length };
}

// ── IP blocking for repeat offenders ──
const blockedIps = new Set<string>();
const strikes = new Map<string, { count: number; first: number }>();

const MAX_STRIKES = 15;
const BLOCK_DURATION = 60 * 60_000; // 1 hour

export function recordStrike(ip: string): boolean {
  const now = Date.now();
  const entry = strikes.get(ip);

  if (!entry || now - entry.first > BLOCK_DURATION) {
    strikes.set(ip, { count: 1, first: now });
    return false;
  }

  entry.count += 1;
  if (entry.count >= MAX_STRIKES) {
    blockedIps.add(ip);
    setTimeout(() => {
      blockedIps.delete(ip);
      strikes.delete(ip);
    }, BLOCK_DURATION);
    return true;
  }
  return false;
}

export function isIpBlocked(ip: string): boolean {
  return blockedIps.has(ip);
}

// ── Input sanitization (XSS prevention) ──
export function sanitizeString(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/data:\s*text\/html/gi, "")
    .replace(/expression\s*\(/gi, "")
    .replace(/url\s*\(/gi, "")
    .trim();
}

// ── SQL injection pattern detection (defense in depth) ──
const SQL_PATTERNS = [
  /(\b(union|select|insert|update|delete|drop|alter|create|exec|execute)\b.*\b(from|into|table|database|where)\b)/i,
  /(--|;|\/\*|\*\/|xp_|sp_)/i,
  /(\b(or|and)\b\s+\d+\s*=\s*\d+)/i,
  /(char\s*\(|concat\s*\(|0x[0-9a-f]+)/i,
];

export function hasSqlInjection(input: string): boolean {
  return SQL_PATTERNS.some((p) => p.test(input));
}

// ── Bot / spam detection ──
const SPAM_PATTERNS = [
  /\b(viagra|casino|lottery|crypto.*invest|click here|buy now|free money)\b/i,
  /(http[s]?:\/\/){3,}/i, // multiple URLs = likely spam
  /(.)\1{10,}/i, // repeated chars
];

export function isSpam(text: string): boolean {
  return SPAM_PATTERNS.some((p) => p.test(text));
}

// ── Cleanup stale entries ──
setInterval(
  () => {
    const now = Date.now();
    for (const [key, timestamps] of windows) {
      const filtered = timestamps.filter((t) => t > now - 120_000);
      if (filtered.length === 0) windows.delete(key);
      else windows.set(key, filtered);
    }
  },
  5 * 60_000,
);

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

const entries = new Map<string, RateLimitEntry>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = entries.get(key);

  if (!entry || entry.expiresAt <= now) {
    entries.set(key, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

const crypto = require("crypto");

function getSecret() {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_TOKEN_SECRET must contain at least 32 characters.");
  }
  return secret;
}

function ttlSeconds() {
  const value = process.env.AUTH_TOKEN_TTL || "7d";
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) throw new Error("AUTH_TOKEN_TTL must look like 30m, 12h, or 7d.");
  const unitSeconds = { s: 1, m: 60, h: 3600, d: 86400 };
  return Number(match[1]) * unitSeconds[match[2]];
}

function signToken(userId, role) {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({ sub: String(userId), role, iat: now, exp: now + ttlSeconds() })).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function verifyToken(token) {
  const [payload, signature, extra] = String(token).split(".");
  if (!payload || !signature || extra) throw new Error("Invalid token");
  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest();
  let actual;
  try { actual = Buffer.from(signature, "base64url"); } catch { throw new Error("Invalid token"); }
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) throw new Error("Invalid token");
  const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (!claims.sub || !["user", "admin"].includes(claims.role) || !Number.isInteger(claims.exp) || claims.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error("Expired or invalid token");
  }
  return claims;
}

module.exports = { signToken, verifyToken };

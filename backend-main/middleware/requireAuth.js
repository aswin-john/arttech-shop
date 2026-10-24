const { verifyToken } = require("../service/authToken");

function requireAuth(req, res, next) {
  const authorization = req.get("Authorization") || "";
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  if (!match) {
    return res.status(401).json({ success: false, message: "Sign in to continue." });
  }

  try {
    const claims = verifyToken(match[1]);
    req.auth = { userId: claims.sub, role: claims.role };
    return next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: "Your session is invalid or expired. Please sign in again." });
  }
}

module.exports = requireAuth;

const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token; // ✅ get token from cookie

  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = verifyToken(token);
    req.user = verified; // ⬅️ attach decoded payload to request
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

module.exports = authMiddleware;

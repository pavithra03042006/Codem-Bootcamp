function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  console.log("Admin Access Attempt:", token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access"
    });
  }

  if (token !== "admin123") {
    return res.status(403).json({
      message: "Invalid token"
    });
  }

  next();
}

module.exports = authMiddleware;
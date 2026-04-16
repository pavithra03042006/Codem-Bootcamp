function auth(req, res, next) {
  const token = req.headers.authorization;

  console.log("Auth check:", token);

  if (!token || token !== "admin123") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access"
    });
  }

  next();
}

module.exports = auth;
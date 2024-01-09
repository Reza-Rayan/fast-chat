const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ status: "failure", message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ status: "failure", message: "Invalid token" });
  }
};

exports.generateAccessToken = (userId) => {
  const expiration = 24*60*60


  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn:expiration,
  });
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d", // Refresh token expires in 7 days
  });
};

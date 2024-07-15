const { isTokenValid } = require("../utils/token");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authentication token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = isTokenValid(token);

    const { userId, role } = decodedToken.user;

    // Set req.user with the extracted user information
    req.user = { userId, role };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid authentication token" });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};

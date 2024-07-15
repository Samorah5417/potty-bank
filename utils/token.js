const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired");
    } else if (error.name === "JsonWebTokenError") {
      console.log("Invalid token");
    } else {
      console.log("JWT verification error:", error.message);
    }
    throw error;
  }
};

const createToken = (user) => {
  return createJWT({ payload: user });
};

// const attachCookiesToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });
//   const threeDays = 1000 * 60 * 60 * 24 * 3;

//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + threeDays),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });
// };

module.exports = {
  createJWT,
  isTokenValid,
//   attachCookiesToResponse,
  createToken,
};

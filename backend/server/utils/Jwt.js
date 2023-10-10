import jwt from "jsonwebtoken"; // Import the JSON Web Token (JWT) module
import { ERRORS, STATUS, STATUS_CODE } from "../../contants/index.js";
// Middleware function to verify JWT tokens
const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Get the token from the request headers
  if (!token) {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS.ERROR,
      message: ERRORS.UNAUTHORIZED.INVALID_JWT,
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    // If the token is valid, store the decoded payload for later use
    req.user = decoded;
    next();
  });
};

export default VerifyToken;

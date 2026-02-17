import jwt from "jsonwebtoken";
import { cleanEnvValue } from "../utils/env.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const secretKey = cleanEnvValue(process.env.SECRET_KEY);
    const decoded = jwt.verify(token, secretKey);

    if (!decoded?.userId) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;

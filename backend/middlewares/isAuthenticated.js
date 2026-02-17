import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // We store login token in cookie, so every protected request checks it first.
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded?.userId) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach current user id so controllers can apply owner/role checks.
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

import { User } from "../models/user.model.js";

const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.id).select("role");

      if (!user) {
        return res.status(401).json({
          message: "User not found",
          success: false,
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: "You are not allowed to access this resource",
          success: false,
        });
      }

      req.userRole = user.role;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Unable to verify user role",
        success: false,
      });
    }
  };
};

export default requireRole;

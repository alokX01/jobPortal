import mongoose from "mongoose";

const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const value = req.params[paramName];

    // Fast fail for broken/malicious ids before DB query.
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        message: `Invalid ${paramName}`,
        success: false,
      });
    }

    next();
  };
};

export default validateObjectId;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import requireRole from "../middlewares/requireRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Company management is recruiter-only.
router.route("/register").post(isAuthenticated, requireRole("recruiter"), registerCompany);
router.route("/get").get(isAuthenticated, requireRole("recruiter"), getCompany);
router
  .route("/get/:id")
  .get(isAuthenticated, requireRole("recruiter"), validateObjectId("id"), getCompanyById);
router
  .route("/update/:id")
  .put(
    isAuthenticated,
    requireRole("recruiter"),
    validateObjectId("id"),
    singleUpload,
    updateCompany
  );

export default router;

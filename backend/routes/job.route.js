import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import requireRole from "../middlewares/requireRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Public routes: user should be able to browse jobs without login.
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(validateObjectId("id"), getJobById);

// Recruiter-only routes.
router.route("/post").post(isAuthenticated, requireRole("recruiter"), postJob);
router.route("/getadminjobs").get(isAuthenticated, requireRole("recruiter"), getAdminJobs);
router
  .route("/update/:id")
  .put(isAuthenticated, requireRole("recruiter"), validateObjectId("id"), updateJob);

export default router;

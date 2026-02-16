import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import requireRole from "../middlewares/requireRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJob
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, requireRole("recruiter"), postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, requireRole("recruiter"), getAdminJobs);
router.route("/get/:id").get(isAuthenticated, validateObjectId("id"), getJobById);

// ⭐ NEW FIXED UPDATE ROUTE
router.route("/update/:id").put(isAuthenticated, requireRole("recruiter"), validateObjectId("id"), updateJob);

export default router;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import requireRole from "../middlewares/requireRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// Student actions
router
  .route("/apply/:id")
  .post(isAuthenticated, requireRole("student"), validateObjectId("id"), applyJob);
router.route("/get").get(isAuthenticated, requireRole("student"), getAppliedJobs);

// Recruiter actions
router
  .route("/:id/applicants")
  .get(isAuthenticated, requireRole("recruiter"), validateObjectId("id"), getApplicants);
router
  .route("/status/:id/update")
  .post(isAuthenticated, requireRole("recruiter"), validateObjectId("id"), updateStatus);

export default router;

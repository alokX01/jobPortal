import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import mongoose from "mongoose";
import {
  pickAllowedFields,
  splitCommaSeparated,
  toTrimmedString,
} from "../utils/request.js";

const escapeRegex = (text = "") => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const postJob = async (req, res) => {
  try {
    // Keep only fields we expect from client payload.
    const rawPayload = pickAllowedFields(req.body, [
      "title",
      "description",
      "requirements",
      "salary",
      "location",
      "jobType",
      "experience",
      "position",
      "companyId",
    ]);

    const payload = {
      title: toTrimmedString(rawPayload.title),
      description: toTrimmedString(rawPayload.description),
      requirements: splitCommaSeparated(rawPayload.requirements),
      salary: Number(rawPayload.salary),
      location: toTrimmedString(rawPayload.location),
      jobType: toTrimmedString(rawPayload.jobType),
      experienceLevel: Number(rawPayload.experience),
      position: Number(rawPayload.position),
      companyId: rawPayload.companyId,
    };

    if (
      !payload.title ||
      !payload.description ||
      payload.requirements.length === 0 ||
      Number.isNaN(payload.salary) ||
      !payload.location ||
      !payload.jobType ||
      Number.isNaN(payload.experienceLevel) ||
      Number.isNaN(payload.position) ||
      !payload.companyId
    ) {
      return res.status(400).json({
        message: "Please provide all required fields with valid values.",
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(payload.companyId)) {
      return res.status(400).json({
        message: "Invalid company id.",
        success: false,
      });
    }

    // Recruiter can post only under their own company.
    const company = await Company.findOne({
      _id: payload.companyId,
      userId: req.id,
    });

    if (!company) {
      return res.status(403).json({
        message: "You can only post jobs for your own company.",
        success: false,
      });
    }

    const job = await Job.create({
      title: payload.title,
      description: payload.description,
      requirements: payload.requirements,
      salary: payload.salary,
      location: payload.location,
      jobType: payload.jobType,
      experienceLevel: payload.experienceLevel,
      position: payload.position,
      company: payload.companyId,
      created_by: req.id,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = toTrimmedString(req.query.keyword || "");
    const safeKeyword = escapeRegex(keyword);

    const query = {
      $or: [
        { title: { $regex: safeKeyword, $options: "i" } },
        { description: { $regex: safeKeyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate({ path: "applications" })
      .populate({ path: "company" });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ created_by: req.id })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    if (existingJob.created_by.toString() !== req.id) {
      return res.status(403).json({
        message: "You can only update your own jobs.",
        success: false,
      });
    }

    const safeBody = pickAllowedFields(req.body, [
      "title",
      "description",
      "requirements",
      "salary",
      "location",
      "jobType",
      "experience",
      "position",
      "companyId",
    ]);

    const updates = {};

    if (safeBody.title !== undefined) updates.title = toTrimmedString(safeBody.title);
    if (safeBody.description !== undefined) updates.description = toTrimmedString(safeBody.description);
    if (safeBody.location !== undefined) updates.location = toTrimmedString(safeBody.location);
    if (safeBody.jobType !== undefined) updates.jobType = toTrimmedString(safeBody.jobType);
    if (safeBody.requirements !== undefined) updates.requirements = splitCommaSeparated(safeBody.requirements);
    if (safeBody.salary !== undefined) updates.salary = Number(safeBody.salary);
    if (safeBody.experience !== undefined) updates.experienceLevel = Number(safeBody.experience);
    if (safeBody.position !== undefined) updates.position = Number(safeBody.position);

    if (safeBody.companyId !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(safeBody.companyId)) {
        return res.status(400).json({
          message: "Invalid company id.",
          success: false,
        });
      }

      const company = await Company.findOne({
        _id: safeBody.companyId,
        userId: req.id,
      });

      if (!company) {
        return res.status(403).json({
          message: "You can only assign jobs to your own company.",
          success: false,
        });
      }
      updates.company = safeBody.companyId;
    }

    if (
      (updates.salary !== undefined && Number.isNaN(updates.salary)) ||
      (updates.experienceLevel !== undefined && Number.isNaN(updates.experienceLevel)) ||
      (updates.position !== undefined && Number.isNaN(updates.position))
    ) {
      return res.status(400).json({
        message: "Salary, experience and position must be numeric.",
        success: false,
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

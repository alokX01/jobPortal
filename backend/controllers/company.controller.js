import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { pickAllowedFields, toTrimmedString } from "../utils/request.js";

export const registerCompany = async (req, res) => {
  try {
    const companyName = toTrimmedString(req.body.companyName);

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You cannot register the same company twice.",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Return only if current recruiter owns this company.
    const company = await Company.findOne({ _id: companyId, userId: req.id });
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    // Keep updates limited to known fields only.
    const safeBody = pickAllowedFields(req.body, [
      "name",
      "description",
      "website",
      "location",
    ]);

    const updateData = {
      name: toTrimmedString(safeBody.name),
      description: toTrimmedString(safeBody.description),
      website: toTrimmedString(safeBody.website),
      location: toTrimmedString(safeBody.location),
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findOneAndUpdate(
      { _id: req.params.id, userId: req.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

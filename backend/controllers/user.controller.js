import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { cleanEnvValue, isProduction } from "../utils/env.js";

const getCookieOptions = () => ({
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: isProduction(),
  sameSite: isProduction() ? "none" : "lax",
});

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const allowedRoles = new Set(["student", "recruiter"]);

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    if (!allowedRoles.has(role)) {
      return res.status(400).json({ message: "Invalid role selected.", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    let profilePhotoUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloud = await cloudinary.uploader.upload(fileUri.content, {
        folder: "job-portal/profilePhotos",
      });
      profilePhotoUrl = cloud.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res.status(201).json({ message: "Account created successfully.", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password.", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect email or password.", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with this role.",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      cleanEnvValue(process.env.SECRET_KEY),
      { expiresIn: "1d" }
    );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, getCookieOptions())
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { ...getCookieOptions(), maxAge: 0 })
      .json({ message: "Logged out successfully.", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    let cloudResponse = null;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: req.file.mimetype === "application/pdf" ? "raw" : "image",
        folder:
          req.file.mimetype === "application/pdf"
            ? "job-portal/resumes"
            : "job-portal/profilePhotos",
        public_id: `${Date.now()}_${req.file.originalname.replace(/\s/g, "_")}`,
      });
    }

    if (fullname) user.fullname = fullname;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use.", success: false });
      }
      user.email = email;
    }

    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

    if (cloudResponse) {
      if (req.file.mimetype === "application/pdf") {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = req.file.originalname;
      } else {
        user.profile.profilePhoto = cloudResponse.secure_url;
      }
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update profile", success: false });
  }
};

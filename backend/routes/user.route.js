import express from "express";
import {
  login,
  register,
  updateProfile,
  logout,
} from "../controllers/user.controller.js";
import isAuthneticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthneticated, singleUpload, updateProfile);

export default router;
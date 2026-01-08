import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();

const _dirname = path.resolve();

// ✅ MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ LOCAL CORS (IMPORTANT)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend port
    credentials: true,
  })
);

// ✅ API ROUTES (Must come BEFORE static files)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ SERVE STATIC FILES (PRODUCTION)
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// ✅ SPA FALLBACK - Serve index.html for all non-API routes
app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// ✅ DB CONNECT
connectDB();

// ✅ SERVER START
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Backend running at http://localhost:${PORT}`);
});
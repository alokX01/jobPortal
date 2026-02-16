import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Keep env loading stable even when server is started from the `backend` folder.
dotenv.config({ path: path.resolve(projectRoot, ".env") });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-search-pj1x.onrender.com",
  process.env.FRONTEND_URL,
]
  .filter(Boolean)
  .flatMap((origin) => origin.split(","))
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server tools and local requests without origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy blocked this origin"));
    },
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use((error, req, res, next) => {
  if (error?.message?.includes("CORS policy")) {
    return res.status(403).json({
      message: "Request blocked by CORS policy.",
      success: false,
    });
  }

  if (error?.name === "MulterError") {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }

  if (error) {
    return res.status(500).json({
      message: error.message || "Unexpected server error.",
      success: false,
    });
  }

  next();
});

const frontendDistPath = path.join(projectRoot, "frontend", "dist");
const hasFrontendBuild = fs.existsSync(frontendDistPath);

// Keep old all-in-one deployment support, but only if dist actually exists.
if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));
  app.use((req, res) => {
    res.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

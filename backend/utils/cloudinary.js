import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { cleanEnvValue } from "./env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

dotenv.config({ path: path.resolve(projectRoot, ".env") });

cloudinary.config({
  cloud_name: cleanEnvValue(process.env.CLOUD_NAME),
  api_key: cleanEnvValue(process.env.API_KEY),
  api_secret: cleanEnvValue(process.env.API_SECRET),
});

export default cloudinary;

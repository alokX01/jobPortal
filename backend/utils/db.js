import mongoose from "mongoose";
import { cleanEnvValue } from "./env.js";

const connectDB = async () => {
  const mongoUri = cleanEnvValue(process.env.MONGO_URI);

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Add it in your .env file.");
  }

  await mongoose.connect(mongoUri);
  console.log("mongodb connected successfully");
};

export default connectDB;

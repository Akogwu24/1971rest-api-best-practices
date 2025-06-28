import mongoose from "mongoose";

import { MONGODB_URI } from "../utils/constants";

/**
 * Connect to MongoDB using Mongoose
 * @returns {Promise<void>}
 */

export const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const db = await mongoose.connect(MONGODB_URI as string);
    console.log(`MongoDB conneted with ${db.connection.host} 🫕`);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

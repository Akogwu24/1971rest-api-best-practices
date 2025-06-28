import mongoose from "mongoose";
import { app } from "./src/app";
import { PORT } from "@/utils/constants";
import { connectDB } from "@/config/connectDB";

connectDB();

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB ✅");
  app.listen(PORT, () => console.log(`server running on port ${PORT} 🚀`));
});

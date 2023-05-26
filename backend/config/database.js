import mongoose from "mongoose";

export const connectingDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Connection established to Mongodb database 🔥");
};

import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || "");
  } catch (error) {
    console.log("DB接続に失敗しました。")
    console.error("Error connecting to MongoDB:", error);
  }
};
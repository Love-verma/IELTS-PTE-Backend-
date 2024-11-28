import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO DB connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectToDatabase;

import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
import reportRoutes from "./routes/reportRoutes.js";

app.use("/reports", reportRoutes);
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
